'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { DataQualityMetrics } from '@/lib/stats';

interface DataQualityCardProps {
  metrics: DataQualityMetrics;
}

export function DataQualityCard({ metrics }: DataQualityCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Data Quality</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-blue-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Completeness</p>
              <p className="text-xl font-bold">{metrics.completeness}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-yellow-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Validity</p>
              <p className="text-xl font-bold">{metrics.validity}%</p>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-3">
          <div>
            <div className="flex justify-between text-sm text-muted-foreground mb-1">
              <span>Completeness</span>
              <span>{metrics.completeness}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
                style={{ width: `${metrics.completeness}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm text-muted-foreground mb-1">
              <span>Validity</span>
              <span>{metrics.validity}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-yellow-500 transition-all duration-300 ease-in-out"
                style={{ width: `${metrics.validity}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}