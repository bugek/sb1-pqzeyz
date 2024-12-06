
import { NextApiRequest, NextApiResponse } from 'next';
import { getDramaSources } from '../../lib/data/drama-sources';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const dramas = await getDramaSources('bugaboo_inter');
    res.status(200).json(dramas);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch drama data' });
  }
}