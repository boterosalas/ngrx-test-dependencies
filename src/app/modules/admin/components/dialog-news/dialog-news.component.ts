import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';

@Component({
  selector: 'app-dialog-news',
  templateUrl: './dialog-news.component.html',
  styleUrls: ['./dialog-news.component.scss'],
})
export class DialogNewsComponent implements OnInit {
  dateForm: FormGroup;
  @ViewChild('templateImage', { static: false })
  templateVideo: TemplateRef<any>;
  image: string;
  active = true;
  selecteds = [
    {
      titulo: 'Pendiente',
    },
    {
      titulo: 'En revisión',
    },
    {
      titulo: 'Solucionado',
    },
  ];
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private user: UserService,
    private auth: AuthService
  ) {}
  ngOnInit() {
    this.dateForm = this.fb.group({
      status: [this.data.element.statusnovelty],
      responsenovelty: ['', Validators.maxLength(500)],
    });
    if (this.data.element.documenturl === '') {
      this.image = '';
    } else {
      const datos = this.data.element.documenturl.split('/');
      this.image = datos[datos.length - 1];
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public viewerImage() {
    const splitExt = this.image.split('.');
    const getExt = splitExt[splitExt.length - 1].toLocaleLowerCase();
    if (getExt === 'jpg' || getExt === 'png') {
      if (this.data.element.urlImage === '') {
        console.log('No hay imagenes');
      } else {
        const title = '';
        const template = this.templateVideo;
        const id = 'video-modal';
        this.dialog.open(ModalGenericComponent, {
          panelClass: 'image-clickacademy',

          data: {
            id,
            title,
            template,
          },
          backdropClass: 'backdropBackground',
        });
      }
    } else if (getExt === 'pdf') {
      this.openPDForFile();
    } else {
      this.openPDForFile();
    }
  }
  public openPDForFile() {
    if (this.data.element.urlImage === '') {
      console.log('No hay nada');
    } else {
      const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      if (iOS) {
        window.location.assign(this.data.element.documenturl);
      } else {
        window.open(this.data.element.documenturl, '_blank');
      }
    }
  }
  public saveChanges() {
    const datos = {
      id: this.data.element.id,
      status: this.dateForm.controls.status.value,
      responsenovelty: this.dateForm.controls.responsenovelty.value,
    };
    this.user.setStatus(datos).subscribe((resp: any) => {
      if (resp.state === 'Success') {
        this.dialogRef.close();
      }
    });
  }
  public onChangeSelected(element: any) {
    const data = element;
    if (data === this.data.element.statusnovelty) {
      this.active = true;
    } else {
      this.active = false;
    }
  }
}
