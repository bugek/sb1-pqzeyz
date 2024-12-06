import { faker } from '@faker-js/faker';

export interface Show {
  title: string;
  releaseYear: number;
  genre: string;
  rating: number;
  duration: number;
  synopsis: string;
  status: 'ongoing' | 'completed' | 'cancelled';
}

export interface Actor {
  name: string;
  birthDate: string;
  nationality: string;
  biography: string;
  awards: number;
  activeYears: number;
  popularShows: string[];
}

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