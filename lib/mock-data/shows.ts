import { faker } from '@faker-js/faker';
import type { Show } from '../types';

export function generateMockShows(count: number = 20): Show[] {
  return Array.from({ length: count }, (): Show => ({
    title: faker.music.songName(),
    releaseYear: faker.number.int({ min: 1990, max: 2024 }),
    genre: faker.helpers.arrayElement(['Drama', 'Comedy', 'Action', 'Thriller', 'Sci-Fi']),
    rating: Number(faker.number.float({ min: 1, max: 10, precision: 0.1 }).toFixed(1)),
    duration: faker.number.int({ min: 20, max: 180 }),
    synopsis: faker.lorem.paragraph(),
    status: faker.helpers.arrayElement(['ongoing', 'completed', 'cancelled'])
  }));
}