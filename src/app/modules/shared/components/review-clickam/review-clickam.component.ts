import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-review-clickam',
  templateUrl: './review-clickam.component.html',
  styleUrls: ['./review-clickam.component.scss']
})
export class ReviewClickamComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<any>,) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  qualify() {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const appStore = "https://apps.apple.com/co/app/clickam/id1495823258";
    const playstore = "https://play.google.com/store/apps/details?id=com.clickam.appcompania";
    if (iOS) {
      window.open(appStore, '_blank');
    } else {
      window.open(playstore, '_blank');
    }
    this.onNoClick();
  }

}
