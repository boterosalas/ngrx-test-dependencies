import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { ContentService } from 'src/app/services/content.service';
@Component({
  selector: 'app-dialog-image-player',
  templateUrl: './dialog-image-player.component.html',
  styleUrls: ['./dialog-image-player.component.scss']
})
export class DialogImagePlayerComponent implements OnInit, OnDestroy {
  constructor(
    private content: ContentService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) { }
  //@Output() getContentBussiness = new EventEmitter;

  ngOnInit() {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnDestroy(): void {

  }
  public downloadFile() {
    let datos = [this.data.datosDownload]
    this.content.downloadF(datos).subscribe((resp) => {
      this.download(resp, "image/jpg")
    });
  }
  public download(data, type) {
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    if (type.includes("zip")) {
      downloadLink.href = url;
      downloadLink.download = "archivo.zip";
      downloadLink.click();
    } else if (type.includes("jpg")) {
      downloadLink.href = url;
      downloadLink.download = "archivo.jpg";
      downloadLink.click();
    } else if (type.includes("mp4")) {
      downloadLink.href = url;
      downloadLink.download = "archivo.mp4";
      downloadLink.click();
    }

  }
}
