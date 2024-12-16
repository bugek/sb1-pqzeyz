export enum MigrationStatus {
  Pending = 'pending',
  InProgress = 'in_progress',
  Completed = 'completed',
  Failed = 'failed',
  Cancelled = 'cancelled',
  Review = 'review',
}

export function getMigrationStatusLabel(status: MigrationStatus): string {
  switch (status) {
    case MigrationStatus.Pending:
      return 'Pending';
    case MigrationStatus.InProgress:
      return 'In Progress';
    case MigrationStatus.Completed:
      return 'Completed';
    case MigrationStatus.Failed:
      return 'Failed';
    case MigrationStatus.Cancelled:
      return 'Cancelled';
    case MigrationStatus.Review:
      return 'In Review';
    default:
      return 'Unknown';
  }
}

export function getMigrationStatusCounts(data: DramaSource[]): Record<MigrationStatus, number> {
  return data.reduce((counts, drama) => {
    const status = drama.migration_status as MigrationStatus;
    counts[status] = (counts[status] || 0) + 1;
    return counts;
  }, {} as Record<MigrationStatus, number>);
}