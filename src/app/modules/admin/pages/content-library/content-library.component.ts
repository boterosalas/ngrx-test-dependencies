import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { ContentService } from 'src/app/services/content.service';
import Swal from 'sweetalert2';
import { DialogVideoPlayerComponent } from '../../components/dialog-video-player/dialog-video-player.component';

@Component({
  selector: 'app-content-library',
  templateUrl: './content-library.component.html',
  styleUrls: ['./content-library.component.scss'],
})
export class ContentLibraryComponent implements OnInit, OnDestroy {
  id: string;
  @ViewChild('templateImage', { static: false })
  templateVideo: TemplateRef<any>;
  @ViewChild('templateVideo', { static: false })
  templateVideoP: TemplateRef<any>;
  @ViewChild('templateDeleteContent', { static: false })
  templateDelete: TemplateRef<any>;
  @ViewChild('inputFile', { static: false }) myInputVariable: ElementRef;
  title: string;
  active: boolean;
  image: string;
  fileToUpload: File = null;
  data: any;
  dataReal = [];
  validFormat: boolean;
  dataVideo: any;
  dataRealVideo = [];
  nameFileCont: any;
  deleteVideoImg = [];
  fileCont: any;
  selectAllVideosImg = 'Seleccionar todos';
  videosDispo = true;
  imagenDispo = true;
  url: string;
  business = [];
  private subscription: Subscription = new Subscription();
  constructor(private dialog: MatDialog, private content: ContentService, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getAllBusiness();
  }


  public getVideosImages(id: string) {
    this.id = id;
    this.dataRealVideo = [];
    this.dataReal = [];
    this.subscription = this.content.getVideosImage(id).subscribe((resp: any) => {
      if (resp.state === 'Success') {
        resp.objectResponse.forEach((element) => {
          if (element.filename.includes('mp4')) {
            element.dataR = false;
            this.dataRealVideo.push(element);
          } else {
            element.dataR = false;
            this.dataReal.push(element);
          }
        });
        if (this.dataRealVideo.length > 0) {
          this.videosDispo = true;
        } else {
          this.videosDispo = false;
        }
        if (this.dataReal.length > 0) {
          this.imagenDispo = true;
        } else {
          this.imagenDispo = false;
        }
      }
    });
  }

  public selectAll() {
    if (this.selectAllVideosImg === 'Seleccionar todos') {
      for (let i = 0; i < this.dataReal.length; i++) {
        this.dataReal[i].dataR = true;
      }
      for (let j = 0; j < this.dataRealVideo.length; j++) {
        this.dataRealVideo[j].dataR = true;
      }
      if (this.dataReal.length > 0 || this.dataRealVideo.length > 0) {
        this.active = true;
        this.selectAllVideosImg = 'Deseleccionar todos';
      }
    } else {
      for (let i = 0; i < this.dataReal.length; i++) {
        this.dataReal[i].dataR = false;
      }
      for (let j = 0; j < this.dataRealVideo.length; j++) {
        this.dataRealVideo[j].dataR = false;
      }
      if (this.dataReal.length > 0 || this.dataRealVideo.length > 0) {
        this.active = false;
        this.selectAllVideosImg = 'Seleccionar todos';
      }
    }
  }

  public viewerPhoto(element: any) {
    const title = '';
    const template = this.templateVideo;
    const id = 'video-modal';
    this.url = element.url;
    this.dialog.open(ModalGenericComponent, {
      panelClass: 'image-clickacademy',
      maxWidth: '600px',
      data: {
        id,
        title,
        template,
      },
      backdropClass: 'backdropBackground',
    });
  }

  public deleteEvery() {
    const id = '';
    const title = '';
    const template = this.templateDelete;
    this.dialog.open(ModalGenericComponent, {
      maxWidth: '600px',
      data: {
        id,
        title,
        template,
      },
    });
  }

  public loadDelete() {
    const index = [];

    this.dataReal.forEach((content, i) => {
      if (content.dataR === true) {
        index.push(i);
      }
    });
    this.dataRealVideo.forEach((elem, i) => {
      if (elem.dataR === true) {
        index.push(i);
      }
    });
    if (index.length > 0) {
      this.active = true;
    } else {
      this.active = false;
    }
  }

  public viewerVideo(element: any) {
    const title = '';
    const template = this.templateVideoP;
    const id = 'video-modal';
    this.url = element.url;
    const urlVideo = element.url;
    this.dialog.open(DialogVideoPlayerComponent, {
      panelClass: 'image-clickacademy',
      maxWidth: '600px',
      data: {
        id,
        title,
        template,
        urlVideo,
      },
      backdropClass: 'backdropBackground',
    });
  }

  public getExtension(nameFile: string, getSize: number) {
    const splitExt = nameFile.split('.');
    const getExt = splitExt[splitExt.length - 1].toLocaleLowerCase();
    this.validFormat = false;
    if (getExt === 'jpg' || getExt === 'jpeg' || getExt === 'mp4') {
      this.validFormat = true;
    } else {
      Swal.fire({
        text: 'El formato a cargar no es permitido, recuerda que deben ser videos en formato .mp4 o imágenes en .jpg',
        type: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonClass: 'accept-login-alert-error',
      });
    }
    if (getSize / 1000 > 7000 && (getExt === 'jpg' || getExt === 'jpeg')) {
      this.validFormat = false;
      Swal.fire({
        text: 'No pudimos cargar el contenido, ten en cuenta que cada imagen no puede superar el tamaño de 7mb.',
        type: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonClass: 'accept-login-alert-error',
      });
    } else if (getSize / 1000 > 75000 && getExt === 'mp4') {
      this.validFormat = false;
      Swal.fire({
        text: 'No pudimos cargar el contenido, ten en cuenta que cada video no puede superar el tamaño de 70mb.',
        type: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonClass: 'accept-login-alert-error',
      });
    }
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  handleFileInput(event) {
    const fileList: FileList = event.target.files;
    const formData: FormData = new FormData();
    for (let index = 0; index < fileList.length; index++) {
      this.fileToUpload = fileList[index];
      formData.append('files', this.fileToUpload, this.fileToUpload.name.replace(' ', '_'));
    }

    formData.append('idBusiness', this.id);
    this.getExtension(this.fileToUpload.name, this.fileToUpload.size);
    if (this.validFormat === true) {
      this.subscription = this.content.setContentImgVi(formData).subscribe((resp: any) => {
        if (resp.state === 'Success') {
          this.openSnackBar(resp.userMessage, 'Cerrar');
          this.myInputVariable.nativeElement.value = '';
          this.getVideosImages(this.id);
        }

      });
    }
  }

  public onFileChangeFilesCont(event) {
    const nameFile = event.target.files[0].name;
    const reader = new FileReader();
    const sizeFile = event.target.files[0].size;
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      const fileBlob = new Blob([file]);
      const file2 = new File([fileBlob], nameFile);
      reader.readAsDataURL(file2);
      reader.onload = () => {
        this.getExtension(nameFile, sizeFile);
        if (this.validFormat === true) {
          this.fileCont = reader.result;
          this.fileCont = this.fileCont.split(',')[1];
          this.nameFileCont = nameFile;
          this.saveFormat();
        } else {
          console.log('Error en la carga');
        }
      };
    }
  }

  public saveFormat() {
    const datos = {
      idBusiness: this.id,
      url: this.nameFileCont,
      content: this.fileCont,
    };
    this.subscription = this.content.setContentImgVi(datos).subscribe(save => {
      this.getVideosImages(this.id);
    });
  }

  public deleteVideos() {
    this.deleteVideoImg = [];
    for (let i = 0; i < this.dataReal.length; i++) {
      if (this.dataReal[i].dataR === true) {
        this.deleteVideoImg.push(this.dataReal[i].id);
      }
    }
    for (let i = 0; i < this.dataRealVideo.length; i++) {
      if (this.dataRealVideo[i].dataR === true) {
        this.deleteVideoImg.push(this.dataRealVideo[i].id);
      }
    }
    this.subscription = this.content.deleteContent(this.deleteVideoImg).subscribe((resp) => {
      this.getVideosImages(this.id);
      this.active = false;
      this.dialog.closeAll();
      this.selectAllVideosImg = 'Seleccionar todos';
    });
  }

  public cancelDelete() {
    this.dialog.closeAll();
  }

  public getAllBusiness() {
    this.subscription = this.content.getBusiness().subscribe((resp) => {
      this.business = resp;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
