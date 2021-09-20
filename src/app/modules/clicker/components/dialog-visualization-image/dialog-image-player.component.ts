import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContentService } from 'src/app/services/content.service';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-dialog-image-player',
  templateUrl: './dialog-image-player.component.html',
  styleUrls: ['./dialog-image-player.component.scss'],
})
export class DialogImagePlayerComponent implements OnInit {
  constructor(
    private content: ContentService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private utils: UtilsService
  ) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  public downloadFile() {
    const datos = [this.data.datosDownload];
    this.content.downloadF(datos).subscribe((resp) => {
      this.utils.download(resp, 'image/jpg');
    });
  }
}
