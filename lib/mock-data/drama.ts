import { faker } from '@faker-js/faker';
import type { Drama } from '../types';

const networks = [
  'Netflix', 'HBO', 'BBC', 'TVN', 'JTBC', 'KBS', 
  'MBC', 'SBS', 'Fuji TV', 'TBS', 'TV Asahi'
];

const languages = ['Korean', 'Japanese', 'Chinese', 'Thai', 'English'];

const genres = [
  'Romance', 'Melodrama', 'Historical', 'Medical', 
  'Crime', 'Thriller', 'Comedy', 'Slice of Life'
];

export function generateMockDramas(count: number = 20): Drama[] {
  return Array.from({ length: count }, (): Drama => {
    const startDate = faker.date.between({ 
      from: '2015-01-01', 
      to: '2024-12-31' 
    });
    
    const status = faker.helpers.arrayElement(['ongoing', 'completed', 'cancelled']);
    const endDate = status === 'ongoing' ? null : faker.date.between({
      from: startDate,
      to: '2024-12-31'
    });

    return {
      title: faker.music.songName(),
      episodes: faker.number.int({ min: 12, max: 24 }),
      network: faker.helpers.arrayElement(networks),
      country: faker.helpers.arrayElement(['South Korea', 'Japan', 'China', 'Thailand']),
      language: faker.helpers.arrayElement(languages),
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate ? endDate.toISOString().split('T')[0] : null,
      rating: Number(faker.number.float({ min: 1, max: 10, precision: 0.1 }).toFixed(1)),
      genre: faker.helpers.arrayElements(genres, { min: 1, max: 3 }),
      cast: Array.from(
        { length: faker.number.int({ min: 3, max: 8 }) },
        () => faker.person.fullName()
      ),
      synopsis: faker.lorem.paragraphs(2),
      status
    };
  });
}