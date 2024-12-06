import { NextResponse } from 'next/server';
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
    
    return NextResponse.json({
      valid: errors.length === 0,
      errors
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Validation failed' },
      { status: 500 }
    );
  }
}