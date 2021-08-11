import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-dialog-video-player',
  templateUrl: './dialog-video-player.component.html',
  styleUrls: ['./dialog-video-player.component.scss'],
})
export class DialogVideoPlayerComponent implements OnInit, OnDestroy {
  constructor(
    private content: ContentService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}


  ngOnInit() {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnDestroy(): void {}
}
