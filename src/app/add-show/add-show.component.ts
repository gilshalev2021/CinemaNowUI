import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShowsService } from "../services/shows.service";
import { MatDialog } from '@angular/material/dialog';
import { Show } from '../models/show';
import {Movie} from '../models/movie';

@Component({
  selector: 'app-add-show',
  templateUrl: './add-show.component.html',
  styleUrls: ['./add-show.component.css']
})
export class AddShowComponent implements OnInit {

  show: Show;
  constructor(public dialogRef: MatDialogRef<AddShowComponent>,
              @Inject(MAT_DIALOG_DATA) public movie: Movie,
              public showsService: ShowsService,
              public dialog: MatDialog) {

    this.show = new Show();
    this.show.movie = movie;
    this.show.date = new Date().toISOString().slice(0,10);
   }

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close();
  }

  saveShow() {
    this.showsService.addShow(this.show)
      .subscribe(result => {
        this.dialogRef.close(1);
      });
  }

  addShow() {
    this.showsService.addShow(this.show)
      .subscribe();
  }
}
