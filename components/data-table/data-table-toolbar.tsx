'use client';

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ColumnDef, FilterState } from '@/lib/types/data-table';

interface DataTableToolbarProps<T> {
  columns: ColumnDef<T>[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export function DataTableToolbar<T>({
  columns,
  filters,
  onFiltersChange,
}: DataTableToolbarProps<T>) {
  const filterableColumns = columns.filter(column => column.filterType);

  const handleFilterChange = (columnId: string, value: string) => {
    onFiltersChange({
      ...filters,
      [columnId]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex flex-wrap gap-2">
        {filterableColumns.map(column => {
          const value = filters[column.id] as string || '';

          if (column.filterType === 'select' && column.filterOptions) {
            return (
              <div key={column.id} className="flex items-center gap-2">
                <Select
                  value={value}
                  onValueChange={(value) => handleFilterChange(column.id, value)}
                >
                  <SelectTrigger className="h-8 w-[150px]">
                    <SelectValue placeholder={`${column.header}...`} />
                  </SelectTrigger>
                  <SelectContent>
                    {column.filterOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            );
          }

          return (
            <div key={column.id} className="flex items-center gap-2">
              <Input
                placeholder={`Filter ${column.header.toLowerCase()}...`}
                value={value}
                onChange={(e) => handleFilterChange(column.id, e.target.value)}
                className="h-8 w-[150px]"
              />
            </div>
          );
        })}
        {Object.keys(filters).length > 0 && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}