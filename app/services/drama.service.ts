
import type { DramaSource } from '@/lib/types/drama-mapping';

interface FetchDramasParams {
  page: number;
  pageSize: number;
  filters?: any[];
  sorting?: any[];
}

export async function fetchDramas({ page, pageSize, filters, sorting }: FetchDramasParams) {
  // During static export, use this URL. In development/production, use API URL
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
  
  const queryParams = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    filter: JSON.stringify(
      (Array.isArray(filters) ? filters : []).reduce((acc, filter) => {
        if (filter.value) acc[filter.id] = filter.value;
        return acc;
      }, {})
    ),
    sort: JSON.stringify(
      (Array.isArray(sorting) ? sorting : []).reduce((acc, sort) => {
        acc[sort.id] = sort.desc ? -1 : 1;
        return acc;
      }, {})
    ),
  });

  const response = await fetch(`${baseUrl}/dramas/bugaboo-inter?${queryParams}`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}