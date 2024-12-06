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
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  if (req.method === 'GET' && req.query.preview === 'true') {
    const previewData: DramaFormValues = {
      title_en: 'Preview Drama',
      title_th: 'ละครตัวอย่าง',
      synopsis_en: 'Preview synopsis in English',
      synopsis_th: 'เรื่องย่อตัวอย่างภาษาไทย',
      description_en: 'Preview description in English',
      description_th: 'คำอธิบายตัวอย่างภาษาไทย',
      category_en: 'Preview',
      category_th: 'ตัวอย่าง',
      year_en: '2024',
      year_th: '2567',
      total_ep: 10,
      rating: 7.5,
      parental_rating: 'PG',
    };
    return res.status(200).json(previewData);
  } else if (req.method === 'GET') {
    const drama = mockDatabase[id];
    if (!drama) {
      return res.status(404).json({ error: 'Drama not found' });
    }
    return res.status(200).json(drama);
  }

  if (req.method === 'PUT') {
    const updatedDrama = req.body;
    mockDatabase[id] = updatedDrama;
    return res.status(200).json(updatedDrama);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
