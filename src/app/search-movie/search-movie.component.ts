import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {switchMap, tap, debounceTime, distinctUntilChanged, catchError} from 'rxjs/operators';
import {Subscription, Subject, of} from 'rxjs';
import {Movie} from '../models/movie';
import {MoviesService} from '../services/movies.service';
import {TmdbMovie} from '../models/tmdbMovie';
import {TmdbResults} from '../models/tmdb-results';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.css']
})
export class SearchMovieComponent implements OnInit {

  searchQuery$ = new Subject<string>();
  private searchSubscription: Subscription;
  busy = false;
  pageIndex = 0;
  displayedColumns: string[] = ['Title', 'Overview', 'ReleaseDate', 'Popularity', 'Poster', 'actions'];
  dataSource: TmdbMovie[] = [];
  searchError: string;

  constructor(public moviesService: MoviesService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.searchSubscription = this.searchQuery$.pipe(
      debounceTime(700),
      distinctUntilChanged(),
      tap(() => {
        this.busy = true;
        this.searchError = undefined;
      }),
      switchMap((text: string) => this.moviesService.searchMovies(text, 1).pipe(
        catchError(error => {
          this.searchError = error.toString();
          return of({results: []} as TmdbResults);
        })
      )),
      tap(() => this.busy = false),
    ).subscribe((movies: TmdbResults) => {
        this.dataSource = movies.results;
        this.pageIndex = movies.page;
      },
      error => this.searchError = error.toString()
    );

    this.showCurrentPlayingMovies();
  }

  get searchText(): string {
    return this.moviesService.currentQuery;
  }
  set searchText(value: string) {
    this.moviesService.currentQuery = value;
  }

  showCurrentPlayingMovies() {
    this.moviesService.getCurrentPlayingMovies()
      .subscribe((movies: any) => {
        this.dataSource = movies.results;
      });
  }

  ngOnDestroy() {
    this.searchSubscription?.unsubscribe();
    this.searchSubscription = undefined;
  }

  saveMovie(movie: Movie) {
    this.moviesService.saveMovie(movie).subscribe();
  }

  search(searchText: string) {
    this.pageIndex = 0;
    this.searchText = searchText;
    this.searchQuery$.next(searchText);
  }

  bringMoreResults() {
    this.pageIndex++;
    this.moviesService.searchMovies(this.searchText, this.pageIndex)
      .subscribe((movies: any) => {
        this.dataSource = movies.results;
        this.pageIndex = movies.page;
      });
  }
}
