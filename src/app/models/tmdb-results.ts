import {TmdbMovie} from './tmdbMovie';

export interface TmdbResults {
  results: TmdbMovie[];
  total_results?: number;
  page?: number;
}
