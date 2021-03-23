import {Movie} from './movie';

export class Show {
  id: string;
  movie: Movie;
  date: string;
  time: string;
  hall: string;
  movieTitle?: string;
}
