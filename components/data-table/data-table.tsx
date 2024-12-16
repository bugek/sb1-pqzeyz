'use client';

import { ArrowDown, ArrowUp } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { DataTableToolbar } from './data-table-toolbar';
import { DataTablePagination } from './data-table-pagination';
import { motion, AnimatePresence } from 'framer-motion';
import type { DataTableProps, SortState, ColumnDef } from '@/lib/types/data-table';

export function DataTable<T>({
  data,
  columns,
  pagination,
  onPaginationChange,
  sorting,
  onSortingChange,
  filters,
  onFiltersChange,
}: DataTableProps<T>) {
  const handleSort = (column: ColumnDef<T>) => {
    if (!column.sortable || !onSortingChange) return;

    const direction = 
      sorting?.column === column.id && sorting.direction === 'asc' 
        ? 'desc' 
        : 'asc';

    onSortingChange({ column: column.id, direction });
  };

  const getSortIcon = (column: ColumnDef<T>) => {
    if (!column.sortable) return null;
    if (sorting?.column !== column.id) return null;
    return sorting.direction === 'asc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />;
  };

  const handlePaginationChange = (newPagination: { pageIndex: number; pageSize: number }) => {
    if (onPaginationChange) {
      onPaginationChange(newPagination);
    }
  };

  return (
    <div className="space-y-4">
      {filters && onFiltersChange && (
        <DataTableToolbar
          columns={columns}
          filters={filters}
          onFiltersChange={onFiltersChange}
        />
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id}>
                  {column.sortable ? (
                    <Button
                      variant="ghost"
                      onClick={() => handleSort(column)}
                      className="h-8 p-0 font-medium hover:bg-transparent"
                    >
                      <span className="flex items-center">
                        {column.header}
                        <motion.span
                          animate={{ rotate: sorting?.column === column.id ? 0 : 180 }}
                          transition={{ duration: 0.2 }}
                        >
                          {getSortIcon(column)}
                        </motion.span>
                      </span>
                    </Button>
                  ) : (
                    column.header
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {data.map((row, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-muted/50 transition-colors"
                  style={{
                    opacity: 0,
                    animation: 'fadeIn 0.3s ease-in-out forwards',
                    animationDelay: `${index * 0.05}s`
                  }}
                >
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      {column.cell 
                        ? column.cell({ row: row  })
                        : row[column.accessorKey] as string}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>

      <DataTablePagination
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
      />
    </div>
  );
}