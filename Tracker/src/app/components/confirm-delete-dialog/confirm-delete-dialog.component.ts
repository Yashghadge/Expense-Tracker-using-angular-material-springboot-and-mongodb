import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.scss']
})
export class ConfirmDeleteDialogComponent implements OnInit {

  constructor(public matDialogRef: MatDialogRef<ConfirmDeleteDialogComponent> ) { }

  ngOnInit(): void {
  }

  onNoClick(){
    this.matDialogRef.close(false) 
  }

  onYesClick(){
    this.matDialogRef.close(true) ;
  }

}
