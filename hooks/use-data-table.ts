'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import type { FilterState, SortState, PaginationState } from '@/lib/types/data-table';

interface UseDataTableProps<T> {
  data: T[];
  defaultSort?: SortState;
  defaultPageSize?: number;
}

export function useDataTable<T>({ 
  data = [], // Ensure data is initialized as an empty array if not provided
  defaultSort,
  defaultPageSize = 10
}: UseDataTableProps<T>) {
  const [filters, setFilters] = useState<FilterState>({});
  const [sorting, setSorting] = useState<SortState | undefined>(defaultSort);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: defaultPageSize,
    total: data.length,
  });

  // Apply filters and sorting
  const filteredAndSortedData = useMemo(() => {
    let processed = Array.isArray(data) ? [...data] : []; // Ensure data is an array

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;
      processed = processed.filter(item => {
        const itemValue = (item as any)[key];
        if (typeof value === 'string') {
          return String(itemValue).toLowerCase().includes(value.toLowerCase());
        }
        return false;
      });
    });

    // Apply sorting
    if (sorting) {
      processed.sort((a, b) => {
        const aValue = (a as any)[sorting.column];
        const bValue = (b as any)[sorting.column];
        
        if (sorting.direction === 'asc') {
          return aValue > bValue ? 1 : -1;
        }
        return aValue < bValue ? 1 : -1;
      });
    }

    return processed;
  }, [data, filters, sorting]);

  // Apply pagination
  const processedData = useMemo(() => {
    const start = (pagination.page - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    return filteredAndSortedData.slice(start, end);
  }, [filteredAndSortedData, pagination.page, pagination.pageSize]);

  // Update total count when filtered data changes
  useEffect(() => {
    setPagination(prev => ({
      ...prev,
      total: filteredAndSortedData.length,
      // Reset to first page if current page is out of bounds
      page: Math.min(prev.page, Math.ceil(filteredAndSortedData.length / prev.pageSize) || 1)
    }));
  }, [filteredAndSortedData]);

  const handlePaginationChange = useCallback((newPagination: Partial<PaginationState>) => {
    setPagination(prev => ({
      ...prev,
      ...newPagination,
      // Ensure page is valid
      page: newPagination.page || prev.page,
      // Update page size if provided
      pageSize: newPagination.pageSize || prev.pageSize
    }));
  }, []);

  return {
    processedData,
    filters,
    setFilters,
    sorting,
    setSorting,
    pagination,
    setPagination: handlePaginationChange,
  };
}