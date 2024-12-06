
import { NextApiRequest, NextApiResponse } from 'next';
import { getDramaSources } from '@/lib/data/drama-sources';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const dramas = await getDramaSources('bugaboo-inter');
      return res.status(200).json(dramas);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch drama sources' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
