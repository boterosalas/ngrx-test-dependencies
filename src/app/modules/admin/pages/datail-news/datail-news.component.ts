import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-datail-news',
  templateUrl: './datail-news.component.html',
  styleUrls: ['./datail-news.component.scss'],
})
export class DatailNewsComponent implements OnInit {
  dateForm: FormGroup;
  @ViewChild('templateImage', { static: false })
  templateVideo: TemplateRef<any>;
  image: string;
  active = true;
  currentNovelty: any;
  selecteds = [
    {
      titulo: 'Pendiente',
      state: 0,
    },
    {
      titulo: 'En revisión',
      state: 0,
    },
    {
      titulo: 'Solucionado',
      state: 0,
    },
  ];
  subcriptionParams: Subscription;
  subcriptionNovelty: Subscription;

  constructor(
    private snackBar: MatSnackBar,
    private routeParams: ActivatedRoute,
    private fb: FormBuilder,
    private user: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.subcriptionParams = this.routeParams.params.subscribe((params) => {
      if (params && params['id']) {
        this.getNoveltyById(params.id);
      }
    });
  }

  public getNoveltyById(id: string) {
    this.subcriptionNovelty = this.user.getNoveltyById(id).subscribe((novelty) => {
      if (novelty['objectResponse']) {
        this.currentNovelty = novelty['objectResponse'];
        this.changeSelecteds(this.currentNovelty.statusnovelty);
        this.initForm();
      }
    });
  }

  public initForm() {
    this.dateForm = this.fb.group({
      status: [this.currentNovelty.statusnovelty ? this.currentNovelty.statusnovelty : ''],
      responsenovelty: ['', Validators.maxLength(500)],
    });
    if (this.currentNovelty.documenturl === '') {
      this.image = '';
    } else {
      const datos = this.currentNovelty.documenturl.split('/');
      this.image = datos[datos.length - 1];
    }
  }

  public viewerImage() {
    const splitExt = this.image.split('.');
    const getExt = splitExt[splitExt.length - 1].toLocaleLowerCase();
    if (getExt === 'jpg' || getExt === 'png') {
      if (this.currentNovelty.urlImage === '') {
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
    if (this.currentNovelty.urlImage === '') {
      console.log('No hay nada');
    } else {
      const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      if (iOS) {
        window.location.assign(this.currentNovelty.documenturl);
      } else {
        window.open(this.currentNovelty.documenturl, '_blank');
      }
    }
  }
  public saveChanges() {
    const datos = {
      id: this.currentNovelty.id,
      status: this.dateForm.controls.status.value,
      responsenovelty: this.dateForm.controls.responsenovelty.value,
    };
    this.user.setStatus(datos).subscribe((resp: any) => {
      if (resp.state === 'Success') {
        this.getNoveltyById(this.currentNovelty.id);
        this.snackBar.open(resp.userMessage, 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }
  public onChangeSelected(element: any) {
    const data = element;
    if (data === this.currentNovelty.statusnovelty) {
      this.active = true;
    } else {
      this.active = false;
    }

    this.changeSelecteds(data);
  }

  public changeSelecteds(state: string) {
    switch (state) {
      case 'Solucionado':
        this.selecteds[0].state = 2;
        this.selecteds[1].state = 2;
        this.selecteds[2].state = 2;
        break;

      case 'En revisión':
        this.selecteds[0].state = 2;
        this.selecteds[1].state = 1;
        this.selecteds[2].state = 0;
        break;

      case 'Pendiente':
        this.selecteds[0].state = 1;
        this.selecteds[1].state = 0;
        this.selecteds[2].state = 0;
        break;

      default:
        break;
    }
  }
}
