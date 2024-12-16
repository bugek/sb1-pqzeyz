import { NextRequest, NextResponse } from "next/server";
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Set route segment config
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Route for fetching a single drama by ID
export async function GET(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop();
  if (id && ObjectId.isValid(id)) {
    return getDramaById(req, id);
  } else {
    return getDramas(req);
  }
}

async function getDramaById(req: NextRequest, id: string) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const preview = searchParams.get('preview') === 'true';

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection('inter-drama');

    const drama = await collection.findOne({ _id: new ObjectId(id) });

    if (!drama) {
      return NextResponse.json({ error: 'Drama not found' }, { status: 404 });
    }

    if (preview) {
      // Modify drama data for preview if needed
    }

    return NextResponse.json(drama);
  } catch (error) {
    console.error('Error fetching drama data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

async function getDramas(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1') - 1;
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const sortColumn = searchParams.get('sorting[column]');
    const sortDirection = searchParams.get('sorting[direction]');
    const filterParam = searchParams.get('filter');

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection('inter-drama');

    // Build query from filters
    const filter = filterParam ? JSON.parse(filterParam) : {};
    const query = Object.entries(filter).reduce((acc, [key, value]) => {
      if (value) {
        acc[key] = { $regex: String(value), $options: 'i' };
      }
      return acc;
    }, {});

    // Build sort options
    const sort = sortColumn && sortDirection ? { [sortColumn]: sortDirection === 'asc' ? 1 : -1 } : { title: 1 };

    console.log('query', query);
    console.log('sort', sort);

    // Get total count for pagination
    const total = await collection.countDocuments(query);

    // Execute query with pagination
    const dramas = await collection
      .find(query)
      .sort(sort)
      .skip(page * pageSize)
      .limit(pageSize)
      .toArray();

    return NextResponse.json({
      data: dramas,
      total,
      page: page + 1,
      pageSize,
      totalPages: Math.ceil(total / pageSize)
    });
  } catch (error) {
    console.error('Error fetching drama data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop();
  if (!id || !ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const data = await req.json();
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection('inter-drama');

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Drama not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Drama updated successfully' });
  } catch (error) {
    console.error('Error updating drama data:', error);
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}
