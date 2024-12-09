import { NextRequest, NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';

// export const revalidate = 0; // disable cache
// export const fetchCache = 'force-no-store';
// export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    const searchParams  = req.nextUrl.searchParams;
    // const page = parseInt(searchParams.get('page') || '0');
    // const pageSize = parseInt(searchParams.get('pageSize') || '10');
    // const sortParam = searchParams.get('sort');
    // const filterParam = searchParams.get('filter');

    // const client = await clientPromise;
    // const db = client.db(process.env.MONGODB_DB);
    // const collection = db.collection('inter-drama');

    // // Build query from filters
    // const filter = filterParam ? JSON.parse(filterParam) : {};
    // const query = Object.entries(filter).reduce((acc, [key, value]) => {
    //   if (value) {
    //     acc[key] = { $regex: String(value), $options: 'i' };
    //   }
    //   return acc;
    // }, {});

    // // Build sort options
    // const sort = sortParam ? JSON.parse(sortParam) : { title: 1 };

    // // Get total count for pagination
    // const total = await collection.countDocuments(query);

    // // Execute query with pagination
    // const dramas = await collection
    //   .find(query)
    //   .sort(sort)
    //   .skip(page * pageSize)
    //   .limit(pageSize)
    //   .toArray();

    // return NextResponse.json({
    //   data: dramas,
    //   total,
    //   page,
    //   pageSize,
    //   totalPages: Math.ceil(total / pageSize)
    // });

    return NextResponse.json({});
  } catch (error) {
    console.error('Error fetching drama data:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
