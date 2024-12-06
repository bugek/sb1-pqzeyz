'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { PaginationState } from '@/lib/types/data-table';

interface DataTablePaginationProps {
  pagination: PaginationState;
  onPaginationChange: (pagination: Partial<PaginationState>) => void;
}

const pageSizeOptions = [10, 20, 30, 40, 50].map(size => ({
  label: `${size} per page`,
  value: size.toString(),
}));

export function DataTablePagination({
  pagination,
  onPaginationChange,
}: DataTablePaginationProps) {
  const totalPages = Math.ceil(pagination.total / pagination.pageSize);

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={pagination.pageSize.toString()}
            onValueChange={(value) => onPaginationChange({ pageSize: Number(value), page: 1 })}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pagination.pageSize.toString()} />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {pagination.page} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPaginationChange({ page: Math.max(1, pagination.page - 1) })}
            disabled={pagination.page <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPaginationChange({ page: Math.min(totalPages, pagination.page + 1) })}
            disabled={pagination.page >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}