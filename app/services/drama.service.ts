import axios from 'axios';
import type { DramaSource } from '@/lib/types/drama-mapping';

export async function fetchDramas(params: any) {
  const response = await axios.get('/api/dramas/bugaboo-inter', { params });
  return response.data;
}

export async function fetchDramaById(id: string, preview: boolean = false) {
  const response = await axios.get(`/api/dramas/bugaboo-inter/${id}`, {
    params: { preview }
  });
  return response.data;
}

export async function updateDrama(id: string, data: DramaSource) {
  const response = await axios.put(`/api/dramas/bugaboo-inter/${id}`, data);
  return response.data;
}

export async function editDramaPage(id: string, data: DramaSource) {
  const response = await axios.patch(`/api/dramas/bugaboo-inter/${id}`, data);
  return response.data;
}