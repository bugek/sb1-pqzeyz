'use client';

import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';

interface MigrationTableProps {
  data: any[];
  section: string;
  onProcessed: (index: number, failed: boolean) => void;
  processedItems: Set<number>;
  failedItems: Set<number>;
}

export function MigrationTable({ 
  data, 
  section, 
  onProcessed,
  processedItems,
  failedItems
}: MigrationTableProps) {
  const validateAndUpdate = async (item: any, index: number) => {
    try {
      // Validate
      const validateResponse = await fetch(`/api/validate/${section}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      const validateResult = await validateResponse.json();

      if (!validateResult.valid) {
        toast.error('Validation failed', {
          description: validateResult.errors.join(', '),
        });
        onProcessed(index, true);
        return;
      }

      // Update
      const updateResponse = await fetch(`/api/update/${section}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      const updateResult = await updateResponse.json();

      if (updateResult.success) {
        toast.success('Record updated successfully');
        onProcessed(index, false);
      } else {
        toast.error('Failed to update record');
        onProcessed(index, true);
      }
    } catch (error) {
      toast.error('Operation failed');
      onProcessed(index, true);
    }
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No data available. Click "Load Preview Data" to fetch records.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            {Object.keys(data[0]).map((key) => (
              <TableHead key={key}>{key}</TableHead>
            ))}
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              {Object.values(item).map((value: any, i) => (
                <TableCell key={i}>
                  {typeof value === 'object' ? JSON.stringify(value) : value}
                </TableCell>
              ))}
              <TableCell>
                {processedItems.has(index) ? (
                  failedItems.has(index) ? (
                    <XCircle className="h-4 w-4 text-red-500" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  )
                ) : null}
              </TableCell>
              <TableCell>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => validateAndUpdate(item, index)}
                  disabled={processedItems.has(index)}
                >
                  {processedItems.has(index) ? 'Processed' : 'Validate & Update'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}