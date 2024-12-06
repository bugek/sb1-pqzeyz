'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { DataTable } from '@/components/data-table/data-table';
import { useDataTable } from '@/hooks/use-data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import type { ColumnDef } from '@/lib/types/data-table';

export default function MigrationPage() {
  const params = useParams();
  const section = params.section as string;
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const columns: ColumnDef<any>[] = [
    {
      id: 'title',
      header: 'Title',
      accessorKey: 'title',
      filterType: 'text',
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
        { label: 'Cancelled', value: 'cancelled' },
      ],
      sortable: true,
      cell: (value) => (
        <Badge variant={value === 'completed' ? 'default' : 'secondary'}>
          {value}
        </Badge>
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
  });

  const fetchPreview = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/preview/${section}`);
      const result = await response.json();
      setData(result.data);
      toast.success('Preview data loaded successfully');
    } catch (error) {
      toast.error('Failed to load preview data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="capitalize">{section} Migration</CardTitle>
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