export type SortDirection = 'asc' | 'desc';

export interface SortState {
  column: string;
  direction: SortDirection;
}

export interface FilterState {
  [key: string]: string | string[];
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  pagination: PaginationState;
  onPaginationChange: (pagination: Partial<PaginationState>) => void;
  sorting?: SortState;
  onSortingChange?: (sorting: SortState) => void;
  filters?: FilterState;
  onFiltersChange?: (filters: FilterState) => void;
}

export interface ColumnDef<T> {
  id: string;
  header: string;
  accessorKey: keyof T;
  filterType?: 'text' | 'select' | 'date' | 'number';
  filterOptions?: { label: string; value: string }[];
  sortable?: boolean;
  cell?: (value: any) => React.ReactNode;
}