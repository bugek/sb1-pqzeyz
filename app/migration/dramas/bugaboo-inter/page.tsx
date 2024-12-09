'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable } from '@/components/data-table/data-table';
import { useDataTable } from '@/hooks/use-data-table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil } from 'lucide-react';
import { toast } from 'sonner';
import type { ColumnDef } from '@/lib/types/data-table';
import type { DramaSource } from '@/lib/types/drama-mapping';

export default function BugabooInterDramasPage() {
  const router = useRouter();
  const [data, setData] = useState<DramaSource[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const columns: ColumnDef<DramaSource>[] = [
    {
      id: 'title',
      header: 'Title',
      accessorKey: 'title',
      filterType: 'text',
      sortable: true,
    },
    {
      id: 'originalTitle',
      header: 'Original Title',
      accessorKey: 'originalTitle',
      filterType: 'text',
      sortable: true,
    },
    {
      id: 'episodes',
      header: 'Episodes',
      accessorKey: 'episodes',
      sortable: true,
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      filterType: 'select',
      filterOptions: [
        { label: 'Ongoing', value: 'ongoing' },
        { label: 'Completed', value: 'completed' },
      ],
      sortable: true,
      cell: (value) => (
        <Badge variant={value === 'completed' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      accessorKey: 'id',
      cell: (value) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push(`/migration/dramas/bugaboo-inter/${value}`)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  const {
    processedData,
    filters,
    setFilters,
    sorting,
    setSorting,
    pagination,
    setPagination,
  } = useDataTable({
    data,
    defaultSort: { column: 'title', direction: 'asc' },
    serverSide: true,
    totalItems,
  });

  const fetchPreview = useCallback(async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: String(pagination.pageIndex),
        pageSize: String(pagination.pageSize),
        filter: JSON.stringify(
          (Array.isArray(filters) ? filters : []).reduce((acc, filter) => {
            if (filter.value) acc[filter.id] = filter.value;
            return acc;
          }, {})
        ),
        sort: JSON.stringify(
          (Array.isArray(sorting) ? sorting : []).reduce((acc, sort) => {
            acc[sort.id] = sort.desc ? -1 : 1;
            return acc;
          }, {})
        ),
      });

      const response = await fetch(`/api/dramas/bugaboo-inter?${queryParams}`);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const { data, total } = await response.json();
      setData(data);
      setTotalItems(total);
      toast.success('Preview data loaded successfully');
    } catch (error) {
      console.error('Error loading preview data:', error);
      toast.error('Failed to load preview data');
    } finally {
      setLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize, filters, sorting]);

  useEffect(() => {
    fetchPreview();
  }, [fetchPreview]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Bugaboo Inter Dramas Migration</CardTitle>
          <CardDescription>
            Manage and migrate drama series data from Bugaboo Inter platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={fetchPreview}
            disabled={loading}
            className="mb-4"
          >
            {loading ? 'Loading...' : 'Load Preview Data'}
          </Button>

          <DataTable
            data={processedData}
            columns={columns}
            pagination={pagination}
            onPaginationChange={setPagination}
            sorting={sorting}
            onSortingChange={setSorting}
            filters={filters}
            onFiltersChange={setFilters}
          />
        </CardContent>
      </Card>
    </div>
  );
}