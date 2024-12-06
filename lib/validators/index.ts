import { validateDrama } from './drama';

export type Section = 'shows' | 'actors' | 'dramas';

export const validators = {
  shows: (data: any) => {
    const errors = [];
    if (!data.title) errors.push('Title is required');
    if (!data.releaseYear) errors.push('Release year is required');
    if (typeof data.releaseYear === 'number' && (data.releaseYear < 1900 || data.releaseYear > new Date().getFullYear())) {
      errors.push('Invalid release year');
    }
    return errors;
  },
  
  actors: (data: any) => {
    const errors = [];
    if (!data.name) errors.push('Name is required');
    if (!data.birthDate) errors.push('Birth date is required');
    try {
      new Date(data.birthDate);
    } catch {
      errors.push('Invalid birth date format');
    }
    return errors;
  },

  dramas: validateDrama
};