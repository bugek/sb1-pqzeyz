'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpCircle, XCircle } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  total: number;
  processed: number;
  failed: number;
}

export function SummaryCard({ title, total, processed, failed }: SummaryCardProps) {
  const success = processed - failed;
  const successRate = total > 0 ? Math.round((success / total) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <ArrowUpCircle className="h-4 w-4 text-green-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Successful</p>
              <p className="text-xl font-bold">{success}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4 text-red-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Failed</p>
              <p className="text-xl font-bold">{failed}</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm text-muted-foreground mb-1">
            <span>Progress</span>
            <span>{successRate}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300 ease-in-out"
              style={{ width: `${successRate}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}