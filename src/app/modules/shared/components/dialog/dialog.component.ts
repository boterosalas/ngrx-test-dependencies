import { Component, OnInit, Output, EventEmitter, Input, TemplateRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor( public dialogRef: MatBottomSheetRef<any>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.dismiss();
  }

  ngOnInit() {
  }

}
