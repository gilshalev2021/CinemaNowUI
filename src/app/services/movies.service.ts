import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {throwError, Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {Movie} from '../models/movie';
import {TmdbMovie} from '../models/tmdbMovie';
import {TmdbResults} from '../models/tmdb-results';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private searchMoviesUrl: string = 'https://api.themoviedb.org/3/search/movie';
  private dbMoviesApiUrl: string = 'https://2e924zcf6k.execute-api.us-west-2.amazonaws.com/QA/api/Movies';
  private searchCurrentPlayingMovies: string = 'https://api.themoviedb.org/3/discover/movie';
  private TMDB_API_KEY: string = '88c96d8e1a1c711e1399b712fec7752e';

  localDbMovies: Movie[] = [];
  currentQuery: string;

  constructor(private httpClient: HttpClient, private toastr: ToastrService) {
  }

  saveMovie(tmdbMovie: TmdbMovie) {

    let addedMovie = {
      'id': tmdbMovie.id.toString(),
      'title': tmdbMovie.title,
      'overview': tmdbMovie.overview,
      'posterPath': tmdbMovie.poster_path,
      'backdropPath': tmdbMovie.backdrop_path
    };

    return this.httpClient.post(this.dbMoviesApiUrl, addedMovie)
      .pipe(
        tap((res) => {
          this.toastr.success('The movie: "' + tmdbMovie.title + '" saved successfully to your local data-base!', 'Saved Successfully!');
          return res;
        }),
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse) {
            try {
              this.toastr.info(err.error.text, 'Save Error');
            } catch (e) {
              this.toastr.info('An error occurred', 'Save Error');
            }
          }
          return of(err);
        }));
  }

  getLocalDbMovies() {
    return this.httpClient.get<Movie[]>(this.dbMoviesApiUrl)
      .pipe(
        tap((arrivedData: Movie[]) => {
          this.localDbMovies = arrivedData;
          return arrivedData;
        }),
        catchError(this.handleError)
      );
  }

  getCurrentPlayingMovies() {
    let params = new HttpParams()
      .set('api_key', this.TMDB_API_KEY)
      .set('language', 'en-US')
      .set('sort_by', 'popularity.desc');

    return this.httpClient.get(this.searchCurrentPlayingMovies, {params})
      .pipe(
        catchError(this.handleError)
      );
  }

  searchMovies(query: string = '', page = 1): Observable<TmdbResults> {

    if (!query.trim()) {
      return of({results: [] });
    }

    this.currentQuery = query;

    let params = new HttpParams()
      .set('api_key', this.TMDB_API_KEY)
      .set('page', page.toString())
      .set('query', query);

    return this.httpClient.get<TmdbResults>(this.searchMoviesUrl, {params})
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error: Response | any): Observable<never> {
    let errMsg: string;

    if (!(error instanceof Response)) {
      errMsg = error.message ? error.message : error.toString();
      if (error && error.err) {
        this.toastr.info('Server returned: ', error.error.text);
      }
    } else {
      const body = error.json() || '';
      const err = body || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    }
    console.error(errMsg);
    return throwError(new Error(errMsg));
  }
}
