
import { NextApiRequest, NextApiResponse } from 'next';

const mockDatabase: Record<string, DramaFormValues> = {
  '1': {
    title_en: 'Sample Drama',
    title_th: 'ละครตัวอย่าง',
    synopsis_en: 'Sample synopsis in English',
    synopsis_th: 'เรื่องย่อตัวอย่างภาษาไทย',
    description_en: 'Sample description in English',
    description_th: 'คำอธิบายตัวอย่างภาษาไทย',
    category_en: 'Drama',
    category_th: 'ละคร',
    year_en: '2024',
    year_th: '2567',
    total_ep: 16,
    rating: 8.5,
    parental_rating: 'PG-13',
  },
  // Add more mock data as needed
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const dramas = Object.values(mockDatabase);
    return res.status(200).json(dramas);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
