import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ShowsService} from '../services/shows.service';
import {Show} from '../models/Show';

@Component({
  selector: 'app-delete-show',
  templateUrl: './delete-show.component.html',
  styleUrls: ['./delete-show.component.css']
})
export class DeleteShowComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteShowComponent>,
              @Inject(MAT_DIALOG_DATA) public show: Show,
              public showsService: ShowsService) {
  }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.showsService.deleteShow(this.show)
      .subscribe((res: boolean) => {
      });
  }
}
