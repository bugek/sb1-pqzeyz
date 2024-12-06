import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Section } from '@/lib/validators';
import { generateMockShows, generateMockActors, generateMockDramas } from '@/lib/mock-data';

export async function GET(
  request: Request,
  { params }: { params: { section: Section } }
) {
  try {
    // For development, return mock data instead of accessing MongoDB
    const mockData = {
      shows: generateMockShows(),
      actors: generateMockActors(),
      dramas: generateMockDramas()
    };

    return NextResponse.json({ 
      data: mockData[params.section] || [] 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}