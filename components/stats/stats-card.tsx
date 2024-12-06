'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface StatsCardProps {
  title: string;
  total: number;
  completed: number;
  failed: number;
  inProgress: number;
}

export function StatsCard({ 
  title, 
  total, 
  completed, 
  failed, 
  inProgress 
}: StatsCardProps) {
  const completedPercentage = total > 0 ? (completed / total) * 100 : 0;
  const failedPercentage = total > 0 ? (failed / total) * 100 : 0;
  const inProgressPercentage = total > 0 ? (inProgress / total) * 100 : 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <span className="text-2xl font-bold">{total}</span>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Completed</span>
              <span className="font-medium">{completed}</span>
            </div>
            <Progress value={completedPercentage} className="bg-muted h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Failed</span>
              <span className="font-medium text-destructive">{failed}</span>
            </div>
            <Progress value={failedPercentage} className="bg-muted h-2" indicatorClassName="bg-destructive" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">In Progress</span>
              <span className="font-medium text-blue-500">{inProgress}</span>
            </div>
            <Progress value={inProgressPercentage} className="bg-muted h-2" indicatorClassName="bg-blue-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}