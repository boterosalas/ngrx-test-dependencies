import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { DialogNoveltySatisfactionComponent } from 'src/app/modules/anonymous/components/dialog-novelty-satisfaction/dialog-novelty-satisfaction.component';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-datail-news',
  templateUrl: './datail-news.component.html',
  styleUrls: ['./datail-news.component.scss'],
})
export class DatailNewsComponent implements OnInit, OnDestroy {
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
      titulo: 'Pendiente de documentación',
      state: 0,
    },
    {
      titulo: 'En gestión',
      state: 0,
    },
    {
      titulo: 'Solución parcial',
      state: 0,
    },
    {
      titulo: 'Solucionado',
      state: 0,
    },
  ];
  $subcriptionParams: Subscription = new Subscription();
  $subcriptionNovelty: Subscription = new Subscription();
  $subscriptionSaveNote: Subscription = new Subscription();
  $subscriptionGetNovelties: Subscription = new Subscription();
  $subscriptionGetMoreNovelties: Subscription = new Subscription();

  listNovelties = [];
  listMoreNovelties = [];

  constructor(
    private snackBar: MatSnackBar,
    private routeParams: ActivatedRoute,
    private fb: FormBuilder,
    private user: UserService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.$subcriptionParams = this.routeParams.params.subscribe((params) => {
      if (params && params['id']) {
        this.getNoveltyById(params.id, params.userId);
      }
    });
  }

  public getNoveltyById(id: string, userId: string) {
    this.$subcriptionNovelty = this.user.getNoveltyById(id, userId).subscribe((novelty) => {
      if (novelty['objectResponse']) {
        this.currentNovelty = novelty['objectResponse'];
        this.getMoreNovelties(this.currentNovelty.userid);
        this.changeSelecteds(this.currentNovelty.statusnovelty);
        this.initForm();
        this.getNovelties();
      }
    });
  }

  public getMoreNovelties(id): void {
    this.$subscriptionGetMoreNovelties = this.user.getNoveltiesById(id).subscribe((novelties) => {
      if (novelties['objectResponse']) {
        this.listMoreNovelties = novelties['objectResponse'];
      }
    });
  }

  goToNovelty(id): void {
    this.router.navigateByUrl(`novedad/${id}`);
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
    if (this.currentNovelty.urlImage !== '') {
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
        this.getNoveltyById(this.currentNovelty.id, this. currentNovelty.userid);
        this.active = true;
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
        this.selecteds[3].state = 2;
        this.selecteds[4].state = 2;
        break;

      case 'Pendiente de documentación':
        this.selecteds[0].state = 2;
        this.selecteds[1].state = 1;
        this.selecteds[2].state = 0;
        this.selecteds[3].state = 0;
        this.selecteds[4].state = 0;
        break;

      case 'En gestión':
        this.selecteds[0].state = 2;
        this.selecteds[1].state = 2;
        this.selecteds[2].state = 1;
        this.selecteds[3].state = 0;
        this.selecteds[4].state = 0;
        break;

      case 'Pendiente':
        this.selecteds[0].state = 1;
        this.selecteds[1].state = 0;
        this.selecteds[2].state = 0;
        this.selecteds[3].state = 0;
        this.selecteds[4].state = 0;
        break;

      case 'Solución parcial':
        this.selecteds[0].state = 2;
        this.selecteds[1].state = 2;
        this.selecteds[2].state = 2;
        this.selecteds[3].state = 1;
        this.selecteds[4].state = 0;
        break;

      default:
        break;
    }
  }

  public updateNovelty(data: any) {
    this.$subscriptionSaveNote = this.user.saveNewNovelty(data).subscribe((resp: any) => {
      if (resp.state === 'Success') {
        this.getNoveltyById(this.currentNovelty.id, this.currentNovelty.userid);
        this.snackBar.open(resp.userMessage, 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }

  public getNovelties() {
    this.$subscriptionGetNovelties = this.user.getNewNovelties(this.currentNovelty.id).subscribe((resp) => {
      if (resp['objectResponse']) {
        this.listNovelties = [...resp['objectResponse'].news, ...resp['objectResponse'].changesstatus]
          .sort((a, b) => {
            return moment(a.datemessage).valueOf() - moment(b.datemessage).valueOf();
          })
          .map((novelty) => {
            return {
              type: novelty.typenewnovelty ? 0 : 1,
              state: novelty.statusnovelty,
              text: novelty.message,
              adminName: novelty.nameadmin,
              date: moment(novelty.datemessage),
            };
          });
      }
    });
  }

  viewComment() {
    this.dialog.open(DialogNoveltySatisfactionComponent, {
      data: {
        notEdit: true,
        comment: this.currentNovelty.comment,
        qualification: this.currentNovelty.qualification,
      },
    });
  }

  ngOnDestroy() {
    this.$subscriptionGetNovelties.unsubscribe();
    this.$subcriptionParams.unsubscribe();
    this.$subcriptionNovelty.unsubscribe();
    this.$subscriptionSaveNote.unsubscribe();
    this.$subscriptionGetMoreNovelties.unsubscribe();
  }
}
