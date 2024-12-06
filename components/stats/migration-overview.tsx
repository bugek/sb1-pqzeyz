'use client';

import { StatsCard } from './stats-card';

const mockStats = {
  import: {
    total: 1000,
    completed: 750,
    failed: 50,
    inProgress: 200
  },
  validation: {
    total: 750,
    completed: 600,
    failed: 100,
    inProgress: 50
  },
  migration: {
    total: 600,
    completed: 400,
    failed: 75,
    inProgress: 125
  }
};

export function MigrationOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <StatsCard
        title="Data Import Status"
        {...mockStats.import}
      />
      <StatsCard
        title="Data Validation Status"
        {...mockStats.validation}
      />
      <StatsCard
        title="Data Migration Status"
        {...mockStats.migration}
      />
    </div>
  );
}