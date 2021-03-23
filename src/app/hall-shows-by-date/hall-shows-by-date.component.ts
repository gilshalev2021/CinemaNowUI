import {Component, Input, OnInit} from '@angular/core';
import {HallDailyShows} from '../models/hallDailyShows';

@Component({
  selector: 'app-hall-shows-by-date',
  templateUrl: './hall-shows-by-date.component.html',
  styleUrls: ['./hall-shows-by-date.component.css']
})
export class HallShowsByDateComponent implements OnInit {

  dateFilter: string;
  @Input() hallDailyShows: HallDailyShows[];

  constructor() {
    this.dateFilter = new Date().toISOString().slice(0, 10);
  }

  ngOnInit() {}
}
