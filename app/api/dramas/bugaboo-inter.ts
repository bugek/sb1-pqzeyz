import type { NextApiRequest, NextApiResponse } from 'next';
import { getDramaSources } from '@/lib/data/drama-sources';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const platform = 'bugaboo-inter'; // You can adjust this if needed
      const dramas = await getDramaSources(platform);
      res.status(200).json(dramas);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch drama data' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
