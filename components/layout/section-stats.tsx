'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface SectionStatsProps {
  total: number;
  processed: number;
  failed: number;
  pending: number;
}

export function SectionStats({ 
  total, 
  processed, 
  failed,
  pending
}: SectionStatsProps) {
  const processedPercentage = total > 0 ? (processed / total) * 100 : 0;
  const failedPercentage = total > 0 ? (failed / total) * 100 : 0;
  const pendingPercentage = total > 0 ? (pending / total) * 100 : 0;

  return (
    <CardContent className="pt-4">
      <div className="space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Processed</span>
            <span className="font-medium text-green-500">{processed}</span>
          </div>
          <Progress value={processedPercentage} className="h-1" indicatorClassName="bg-green-500" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Failed</span>
            <span className="font-medium text-destructive">{failed}</span>
          </div>
          <Progress value={failedPercentage} className="h-1" indicatorClassName="bg-destructive" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Pending</span>
            <span className="font-medium text-blue-500">{pending}</span>
          </div>
          <Progress value={pendingPercentage} className="h-1" indicatorClassName="bg-blue-500" />
        </div>
      </div>
    </CardContent>
  );
}