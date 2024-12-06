import type { Drama } from '../types';

export function validateDrama(data: Partial<Drama>): string[] {
  const errors: string[] = [];

  if (!data.title?.trim()) {
    errors.push('Title is required');
  }

  if (!data.episodes || data.episodes < 1) {
    errors.push('Episodes must be a positive number');
  }

  if (!data.network?.trim()) {
    errors.push('Network is required');
  }

  if (!data.startDate) {
    errors.push('Start date is required');
  } else {
    const date = new Date(data.startDate);
    if (isNaN(date.getTime())) {
      errors.push('Invalid start date format');
    }
  }

  if (data.endDate) {
    const endDate = new Date(data.endDate);
    const startDate = new Date(data.startDate || '');
    
    if (isNaN(endDate.getTime())) {
      errors.push('Invalid end date format');
    } else if (startDate && endDate < startDate) {
      errors.push('End date cannot be before start date');
    }
  }

  if (!data.genre || !Array.isArray(data.genre) || data.genre.length === 0) {
    errors.push('At least one genre is required');
  }

  if (!data.cast || !Array.isArray(data.cast) || data.cast.length === 0) {
    errors.push('At least one cast member is required');
  }

  if (!data.synopsis?.trim()) {
    errors.push('Synopsis is required');
  }

  return errors;
}