'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable } from '@/components/data-table/data-table';
import { useDataTable } from '@/hooks/use-data-table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Edit } from 'lucide-react';
import { toast } from 'sonner';
import type { ColumnDef } from '@/lib/types/data-table';
import type { DramaSource } from '@/lib/types/drama-mapping';
import { fetchDramas } from '@/app/services/drama.service';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { editDramaPage } from '@/app/services/drama.service';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MigrationStatus, getMigrationStatusLabel, getMigrationStatusCounts } from '@/lib/types/migration-status';

export default function BugabooInterDramasPage() {
  const router = useRouter();
  const [data, setData] = useState<DramaSource[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<DramaSource | null>(null);
  const [isStatusModalOpen, setStatusModalOpen] = useState(false);
  const [statusData, setStatusData] = useState<DramaSource | null>(null);
  const [statusCounts, setStatusCounts] = useState<Record<MigrationStatus, number>>({});

  const columns: ColumnDef<DramaSource>[] = [
    {
      id: 'title_en',
      header: 'Title EN',
      accessorKey: 'title_en',
      filterType: 'text',
      sortable: true,
    },
    {
      id: 'title_th',
      header: 'Title TH',
      accessorKey: 'title_th',
      filterType: 'text',
      sortable: true,
    },
    {
      id: 'episodes',
      header: 'Episodes',
      accessorKey: 'episodes',
      sortable: true,
      cell: ({ row }) => {
        const episodes = row?.episodes;
        const count = Array.isArray(episodes) ? episodes.length : 0;
        return <span>{count} ep{count !== 1 ? 's' : ''}</span>;
      },
    },
    {
      id: 'migration_status',
      header: 'Migration Status',
      accessorKey: 'migration_status',
      filterType: 'select',
      filterOptions: [
        { label: 'Completed', value: 'completed' },
        { label: 'Pending', value: 'pending' },
        { label: 'Failed', value: 'failed' },
        { label: 'In Review', value: 'in_review' },
      ],
      sortable: true,
      cell: ({ row }) => {
        const status = row.migration_status;
        const variant = status === 'completed' ? 'success' 
          : status === 'failed' ? 'destructive' 
          : status === 'in_review' ? 'in_review'
          : 'secondary';
        
        return (
          <Badge variant={variant}>
            {status || 'pending'}
          </Badge>
        );
      },
    },
    {
      id: 'v_small_image',
      header: 'Vertical Image',
      accessorKey: 'v_small_image',
      cell: ({ row }) => (
        <img src={row.v_small_image} alt="Vertical Image" style={{ width: '50px', height: 'auto' }} />
      ),
    },
    {
      id: 'h_small_image',
      header: 'Horizontal Image',
      accessorKey: 'h_small_image',
      cell: ({ row }) => (
        <img src={row.h_small_image} alt="Horizontal Image" style={{ width: 'auto', height: '50px' }} />
      ),
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      filterType: 'select',
      filterOptions: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
      sortable: true,
      cell: ({ row }) => {
        const status = row.status === 1 ? 'active' : 'inactive';
        const variant = status === 'active' ? 'success' : 'secondary';
        
        return (
          <Badge variant={variant}>
            {status}
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      accessorKey: '_id',
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEditClick(row)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleStatusClick(row)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      )
    }
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
      const { data, total } = await fetchDramas({
        page: pagination.page,
        pageSize: pagination.pageSize,
        filters,
        sorting
      });

      setData(data);
      setTotalItems(total);
      setStatusCounts(getMigrationStatusCounts(data));
      toast.success('Preview data loaded successfully');
    } catch (error) {
      console.error('Error loading preview data:', error);
      toast.error('Failed to load preview data');
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.pageSize, filters, sorting]);

  useEffect(() => {
    fetchPreview();
  }, [fetchPreview]);

  const handleEditClick = (drama: DramaSource) => {
    setEditData(drama);
    setEditModalOpen(true);
  };

  const handleEditSave = async () => {
    if (editData) {
      try {
        await editDramaPage(editData._id, editData);
        toast.success('Drama updated successfully');
        setEditModalOpen(false);
        fetchPreview();
      } catch (error) {
        toast.error('Failed to update drama');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editData) {
      setEditData({ ...editData, [e.target.name]: e.target.value });
    }
  };

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (editData) {
      try {
        const updatedData = JSON.parse(e.target.value);
        setEditData(updatedData);
      } catch (error) {
        console.error('Invalid JSON format:', error);
      }
    }
  };

  const handleStatusClick = (drama: DramaSource) => {
    setStatusData(drama);
    setStatusModalOpen(true);
  };

  const handleStatusSave = async () => {
    if (statusData) {
      try {
        await editDramaPage(statusData._id, { migration_status: statusData.migration_status });
        toast.success('Migration status updated successfully');
        setStatusModalOpen(false);
        fetchPreview();
      } catch (error) {
        toast.error('Failed to update migration status');
      }
    }
  };

  const handleStatusChange = (value: string) => {
    if (statusData) {
      setStatusData({ ...statusData, migration_status: value });
    }
  };

  const handlePaginationChange = (newPagination: Partial<PaginationState>) => {
    setPagination(newPagination);
    // fetchPreview();
  };

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
          <div className="mb-4">
            {Object.entries(statusCounts).map(([status, count]) => (
              <Badge key={status} variant="secondary" className="mr-2">
                {getMigrationStatusLabel(status as MigrationStatus)}: {count}
              </Badge>
            ))}
          </div>
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
            onPaginationChange={handlePaginationChange}
            sorting={sorting}
            onSortingChange={setSorting}
            filters={filters}
            onFiltersChange={setFilters}
          />
        </CardContent>
      </Card>

      <Dialog open={isEditModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Drama</DialogTitle>
            <DialogDescription>
              Modify the details of the selected drama.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              name="jsonData"
              label="JSON Data"
              value={JSON.stringify(editData, null, 2) || ''}
              onChange={handleJsonChange}
              rows={10}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleEditSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isStatusModalOpen} onOpenChange={setStatusModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Migration Status</DialogTitle>
            <DialogDescription>
              Modify the migration status of the selected drama.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Select
              value={statusData?.migration_status || ''}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(MigrationStatus).map((status) => (
                  <SelectItem key={status} value={status}>
                    {getMigrationStatusLabel(status)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button onClick={handleStatusSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}