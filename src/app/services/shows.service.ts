import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {Show} from '../models/show';
import {Movie} from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {

  private dbShowsApiUrl: string = 'https://2e924zcf6k.execute-api.us-west-2.amazonaws.com/QA/api/Shows';

  currentShows: Show[] = [];

  constructor(private httpClient: HttpClient, private toastr: ToastrService) {
  }

  addShow(newShow: Show) {
    return this.httpClient.post(this.dbShowsApiUrl, newShow)
      .pipe(
        tap((res: Show) => {
          this.toastr.success('Show saved successfully!', 'Saved Successfully!');
          return res;
        }),
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse) {
            try {
              this.toastr.error(err.error.text, 'Save Error');
            } catch (e) {
              this.toastr.error('An error occurred', 'Save Error');
            }
          }
          return of(err);
        }));
  }

  getShowsByDate(date: string) {
    let showsByDateUrl = this.dbShowsApiUrl + '/' + date;

    return this.httpClient.get(showsByDateUrl)
      .pipe(
        tap((arrivedData: []) => {
          this.currentShows = [];
          arrivedData.forEach(element => {
            let show = new Show();
            show.id = element['Id'];
            show.hall = element['hall'];
            show.date = element['date'];
            show.time = element['time'];
            show.movie = new Movie();
            show.movie.id = element['movie']['Id'];
            show.movie.title = element['movie']['title'];
            show.movieTitle = element['movie']['title'];
            show.movie.overview = element['movie']['overview'];
            show.movie.posterPath = element['movie']['posterPath'];
            show.movie.backdropPath = element['movie']['backdropPath'];
            this.currentShows.push(show);
          });
          return this.currentShows;
        }),
        catchError(this.handleError)
      );
  }

  deleteShow(show: Show) {
    let deleteShowUrl = this.dbShowsApiUrl + '/' + show.id;

    return this.httpClient.delete(deleteShowUrl)
      .pipe(
        tap((res: boolean) => {
          this.toastr.success('show deleted Successfully!');
          return res;
        }),
        catchError(this.handleError)
      );
  }

  updateShow(show: Show) {

    return this.httpClient.put(this.dbShowsApiUrl, show)
      .pipe(
        tap((res: any) => {
          this.toastr.success('show updated successfully!', 'Updated Successfully!');
          return res;
        }),
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse) {
            try {
              this.toastr.error(err.error.text, 'Save Error');
            } catch (e) {
              this.toastr.error('An error occurred', 'Save Error');
            }
          }
          return of(err);
        }));
  }

  handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;

    if (!(error instanceof Response)) {
      errMsg = error.message ? error.message : error.toString();
    } else {
      const body = error.json() || '';
      const err = body || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    }
    console.error(errMsg);

    return Observable.throw(errMsg);
  }
}
