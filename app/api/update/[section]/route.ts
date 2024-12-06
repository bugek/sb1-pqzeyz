import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { validators, Section } from '@/lib/validators';

export async function POST(
  request: Request,
  { params }: { params: { section: Section } }
) {
  try {
    const data = await request.json();
    const validator = validators[params.section];
    
    if (!validator) {
      return NextResponse.json(
        { error: 'Invalid section' },
        { status: 400 }
      );
    }

    const errors = validator(data);
    if (errors.length > 0) {
      return NextResponse.json({
        error: 'Validation failed',
        errors
      }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('migration');
    const collection = db.collection(params.section);
    
    const result = await collection.insertOne(data);
    
    return NextResponse.json({
      success: true,
      id: result.insertedId
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Update failed' },
      { status: 500 }
    );
  }
}