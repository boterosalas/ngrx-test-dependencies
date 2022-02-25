import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { DialogNoveltySatisfactionComponent } from 'src/app/modules/anonymous/components/dialog-novelty-satisfaction/dialog-novelty-satisfaction.component';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { ContentService } from 'src/app/services/content.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import Swal from 'sweetalert2';

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
  id:string;
  userId: string;
  configurarEditor = this.utils.configurarEditor;
  namePDF = '';
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

  labels = [
    {
      titulo: 'Rechazo',
      state: 'Rechazo',
    },
    {
      titulo: 'Pago',
      state: 'Pago',
    },
    {
      titulo: 'Otro',
      state: 'Otro',
    },
    {
      titulo: 'No confirmada',
      state: 'No confirmada',
    },

  ];

  $subcriptionParams: Subscription = new Subscription();
  $subcriptionNovelty: Subscription = new Subscription();
  $subscriptionSaveNote: Subscription = new Subscription();
  $subscriptionGetNovelties: Subscription = new Subscription();
  $subscriptionGetMoreNovelties: Subscription = new Subscription();
  businesses$: Subscription = new Subscription();

  selectedBusiness = {};
  businesses = [];
  listNovelties = [];
  listMoreNovelties = [];

  constructor(
    private snackBar: MatSnackBar,
    private routeParams: ActivatedRoute,
    private fb: FormBuilder,
    private user: UserService,
    private dialog: MatDialog,
    private router: Router,
    private content: ContentService,
    private utils: UtilsService
  ) {}

  ngOnInit() {
    this.$subcriptionParams = this.routeParams.params.subscribe((params) => {
      this.id = params.id;
      this.userId = params.userId;
      if (params && params['id']) {
        this.getNoveltyById(params.id, params.userId);
      }
    });
    this.configurarEditor.width = 'auto';
    this.configurarEditor.height = '113px';
  }

  findBusinessInSelect(businesses){
    this.businesses = businesses;
    this.selectedBusiness = this.businesses.find(business => {
      return business.description === this.currentNovelty.businessdescription
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
        this.businesses$ = this.content.getAllBusiness().subscribe(this.findBusinessInSelect.bind(this));
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

  goToNovelty(item): void {
    this.router.navigateByUrl(`novedad/${item.id}/${item.userId}`);
  }

  public initForm() {
    this.dateForm = this.fb.group({
      status: [this.currentNovelty.statusnovelty ? this.currentNovelty.statusnovelty : ''],
      label: [this.currentNovelty.label ? this.currentNovelty.label : ''],
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

  public saveLabel(value:string) {
    const data = {
      id: this.id,
      label:  value
    }
    this.user.saveLabels(data).subscribe();
  }

  public saveBusiness(e) {
    const data = {
      id: this.id,
      idBusiness: e.value.id,
    }
    this.user.saveBusinessNovelty(data).subscribe();
  }

  onFileChange(event) {
    const [file] = event.target.files;
    const reader = new FileReader();
    
    reader.onload = () => {
      const getExt = file.name.split('.')[1];
      if (getExt === 'pdf') {
        if(file.size<5000000){
          const bl = reader.result.toString();
          const data = {
            id: this.currentNovelty.id,
            responseDocument: bl.split(',')[1],
          };
          this.user.saveDocumentNovelty(data).subscribe( (resp: any) => {
            this.snackBar.open(resp.userMessage, 'Cerrar', {
              duration: 3000,
            })
          });
        }else {
          Swal.fire({
            title: 'Error en la Carga',
            text: 'El límite de tamaño del archivo es de 5 Megas',
            type: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonClass: 'upload-error',
          });
        }
      } else {
        Swal.fire({
          title: 'Error en la Carga',
          text: 'El archivo no es de tipo PDF',
          type: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonClass: 'upload-error',
        });
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }
  ngOnDestroy() {
    this.$subscriptionGetNovelties.unsubscribe();
    this.$subcriptionParams.unsubscribe();
    this.$subcriptionNovelty.unsubscribe();
    this.$subscriptionSaveNote.unsubscribe();
    this.$subscriptionGetMoreNovelties.unsubscribe();
    this.businesses$.unsubscribe();
  }
}
