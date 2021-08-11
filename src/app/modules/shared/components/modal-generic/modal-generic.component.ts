import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-generic',
  templateUrl: './modal-generic.component.html',
  styleUrls: ['./modal-generic.component.scss'],
})
export class ModalGenericComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    setTimeout(() => {
      document.querySelector('.mat-dialog-content').scroll(0, 0);
    }, 400);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
