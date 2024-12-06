'use client';

import { useState, useEffect } from 'react';
import { SummaryCard } from './summary-card';
import { DataQualityCard } from './data-quality-card';
import { calculateDataQuality } from '@/lib/stats';
import type { DataQualityMetrics } from '@/lib/stats';

interface MigrationStats {
  total: number;
  processed: number;
  failed: number;
}

interface MigrationStatsProps {
  data: any[];
  processedItems: Set<number>;
  failedItems: Set<number>;
}

export function MigrationStats({ data, processedItems, failedItems }: MigrationStatsProps) {
  const [stats, setStats] = useState<MigrationStats>({
    total: 0,
    processed: 0,
    failed: 0,
  });
  const [dataQuality, setDataQuality] = useState<DataQualityMetrics>({
    completeness: 0,
    validity: 0,
  });

  useEffect(() => {
    setStats({
      total: data.length,
      processed: processedItems.size,
      failed: failedItems.size,
    });
    setDataQuality(calculateDataQuality(data));
  }, [data, processedItems, failedItems]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
      <SummaryCard
        title="Migration Progress"
        total={stats.total}
        processed={stats.processed}
        failed={stats.failed}
      />
      <DataQualityCard metrics={dataQuality} />
    </div>
  );
}