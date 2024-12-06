export interface Show {
  title: string;
  releaseYear: number;
  genre: string;
  rating: number;
  duration: number;
  synopsis: string;
  status: 'ongoing' | 'completed' | 'cancelled';
}

export interface Actor {
  name: string;
  birthDate: string;
  nationality: string;
  biography: string;
  awards: number;
  activeYears: number;
  popularShows: string[];
}

export interface Drama {
  title: string;
  episodes: number;
  network: string;
  country: string;
  language: string;
  startDate: string;
  endDate: string | null;
  rating: number;
  genre: string[];
  cast: string[];
  synopsis: string;
  status: 'ongoing' | 'completed' | 'cancelled';
}