import { faker } from '@faker-js/faker';
import type { Actor } from '../types';

export function generateMockActors(count: number = 20): Actor[] {
  return Array.from({ length: count }, (): Actor => ({
    name: faker.person.fullName(),
    birthDate: faker.date.between({ 
      from: '1950-01-01', 
      to: '2000-12-31' 
    }).toISOString().split('T')[0],
    nationality: faker.location.country(),
    biography: faker.lorem.paragraphs(2),
    awards: faker.number.int({ min: 0, max: 15 }),
    activeYears: faker.number.int({ min: 1, max: 40 }),
    popularShows: Array.from(
      { length: faker.number.int({ min: 1, max: 5 }) }, 
      () => faker.music.songName()
    )
  }));
}