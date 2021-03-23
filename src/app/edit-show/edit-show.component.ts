import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShowsService } from "../services/shows.service";
import { Show } from "../models/Show";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-show',
  templateUrl: './edit-show.component.html',
  styleUrls: ['./edit-show.component.css']
})
export class EditShowComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditShowComponent>,
              @Inject(MAT_DIALOG_DATA) public show: Show,
              public showsService: ShowsService,
              public dialog: MatDialog) {

  }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  updateShow() {
    this.showsService.updateShow(this.show)
      .subscribe( result => {
        this.dialogRef.close();
      });
  }
}
