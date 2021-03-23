import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Movie} from '../models/movie';
import {AddShowComponent} from '../add-show/add-show.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MoviesService} from '../services/movies.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-create-new-shows',
  templateUrl: './create-new-shows.component.html',
  styleUrls: ['./create-new-shows.component.css']
})
export class CreateNewShowsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['title', 'overview', 'backdropPath', 'actions'];
  dataSource: MatTableDataSource<Movie> = new MatTableDataSource<Movie>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public moviesService: MoviesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.moviesService.getLocalDbMovies()
      .subscribe( () => {
        this.dataSource = new MatTableDataSource(this.moviesService.localDbMovies);
        this.ngAfterViewInit();
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createShow(movie: Movie) {

    const dialogRef = this.dialog.open(AddShowComponent, {
      // height: '700px',
      data: {id: movie.id, title: movie.title, backdropPath: movie.backdropPath, posterPath:movie.posterPath, overview: movie.overview}
    });
  }
}
