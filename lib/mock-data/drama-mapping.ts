import { faker } from '@faker-js/faker';
import type { DramaSource } from '../types/drama-mapping';

// Create a fixed set of IDs for consistency
const DRAMA_IDS = [
  '8c1e0e96-7af7-4c20-a821-ebaac46aefa8',
  '129e0cef-78a7-4ebd-8065-7b50568e1abd',
  '5bf3b9c9-f2bb-4c5e-a43b-dd4851920a17',
  // Add more fixed IDs as needed
];

export function generateMockDramaSources(platform: 'bugaboo_inter' | 'bugaboo_tv', count: number = 20): DramaSource[] {
  return Array.from({ length: count }, (_, index): DramaSource => ({
    id: DRAMA_IDS[index] || faker.string.uuid(),
    title: faker.helpers.arrayElement([
      'Love in the Moonlight',
      'Descendants of the Sun',
      'My Love from the Star',
      'Boys Over Flowers',
      'The Heirs'
    ]),
    originalTitle: faker.lorem.words(3),
    episodes: faker.number.int({ min: 12, max: 24 }),
    status: faker.helpers.arrayElement(['ongoing', 'completed']),
    platform
  }));
}

// Export the drama IDs for use in static params
export const getDramaIds = () => DRAMA_IDS;