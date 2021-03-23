import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ShowsService} from '../services/shows.service';
import {Show} from '../models/show';
import {DeleteShowComponent} from '../delete-show/delete-show.component';
import {MatDialog} from '@angular/material/dialog';
import {EditShowComponent} from '../edit-show/edit-show.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {HallDailyShows} from '../models/hallDailyShows';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['date', 'time', 'movieTitle', 'hall', 'actions'];
  dataSource: MatTableDataSource<Show>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dateFilter: string;
  hallDailyShows: HallDailyShows[];

  constructor(public showsService: ShowsService, public dialog: MatDialog) {
    this.dateFilter = new Date().toISOString().slice(0, 10);
  }

  ngOnInit(): void {
    this.loadShowsByDate();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.initDataSource([]);
  }

  private initDataSource(shows: Show[]): void {
    this.dataSource = new MatTableDataSource(this.showsService.currentShows);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadShowsByDate() {
    this.showsService.getShowsByDate(this.dateFilter)
      .subscribe(() => {
        this.initDataSource(this.showsService.currentShows);
        this.populateHallShows(this.showsService.currentShows);
      });
  }

  populateHallShows(shows: Show[]) {
    this.hallDailyShows = [];

    for (let i = 1; i < 7; i++) {
      let newHallDailyShows: HallDailyShows = new HallDailyShows();
      newHallDailyShows.hall = i.toString();
      newHallDailyShows.shows = [];
      this.hallDailyShows.push(newHallDailyShows);
    }
    shows.forEach(show => {
      if (this.hallDailyShows[(+show.hall-1)]) {
        this.hallDailyShows[(+show.hall-1)].shows.push(show);
      }
    });
    this.hallDailyShows.forEach(hallDailyShows => {
      hallDailyShows.shows.sort(function(a, b) {
        let nameA = a.time.toUpperCase(); // ignore upper and lowercase
        let nameB = b.time.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    });
  }

  editShow(show: Show) {
    const dialogRef = this.dialog.open(EditShowComponent, {data: show});

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadShowsByDate();
      }
    });
  }

  deleteShow(row: Show) {
    const dialogRef = this.dialog.open(DeleteShowComponent, {
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadShowsByDate();
      }
    });
  }

  onDateSelected(event) {
    let date = event.target.value;
    this.dateFilter = date;
    this.loadShowsByDate();
  }
}
