export interface DramaSource {
  id: string;
  title: string;
  originalTitle: string;
  episodes: number;
  status: string;
  platform: 'bugaboo_inter' | 'bugaboo_tv';
}

export interface DramaMapping {
  sourceId: string;
  targetId: string;
  confidence: number;
  status: 'pending' | 'mapped' | 'rejected';
  matchType: 'auto' | 'manual';
  lastUpdated: string;
}