import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import * as moment from 'moment';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { ContentService } from 'src/app/services/content.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { DialogOnboardingComponent } from '../../components/dialog-onboarding/dialog-onboarding.component';
import { Subscription } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-tools-admin',
  templateUrl: './tools-admin.component.html',
  styleUrls: ['./tools-admin.component.scss'],
})
export class ToolsAdminComponent implements OnInit, OnDestroy {
  dataAddImagenPopup: FormGroup;
  idPopup = 0;
  selected: any;
  maxDate = moment(new Date());

  @ViewChild('templateAddImagenPopup', { static: false })
  templateAddImagenPopup: TemplateRef<any>;

  @ViewChild('templatePublication', { static: false })
  templatePublication: TemplateRef<any>;

  private subscription: Subscription = new Subscription();

  fileImgCat: any = '';
  nameFileCert = '';
  showErrorCert: boolean;
  selectedBuss = [];
  selectedSection = [];

  selectedColors = [
    { name: 'Rojo', color: '#FF3F4C' },
    { name: 'Amarillo', color: '#FFAF51' },
    { name: 'Morado', color: '#37236A' },
    { name: 'Lila', color: '#8D7EB7' },
  ];

  fileImgCat2: any = '';
  nameFileCert2 = '';
  showErrorCert2: boolean;

  activebutton: boolean;
  activeButtonOfer: boolean;
  minHours: any;
  minHoursFinish: any;
  datePublication: any = '';
  hourDate: any = '';
  dateFinishPublication: any = '';
  hourDateFinish: any = '';
  visible = false;
  undefinedDate = false;
  showUndefinedDate = true;
  dataSourcePopup = [];
  dataPopupActive = [];
  dataPopupProgrammed = [];
  dataPopupRoughCopy = [];
  dataPopupExpire = [];
  onboarding = [];
  extension: string;
  size: number;

  constructor(private dialog: MatDialog, private content: ContentService, private auth: AuthService, private fb: FormBuilder, private utils: UtilsService) {
    this.dataAddImagenPopup = this.fb.group({
      nameContent: [null, Validators.required],
      link: [null],
      seccion: [null, Validators.required],
      image: [null],
      image2: [null],
      textbutton: [null, Validators.required],
      colorbutton: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.getOffers();
    this.getSectionsClicker();
    this.getBoardings();
  }

  public getBoardings() {
    this.subscription = this.content.getBoarding().subscribe((board) => {
      this.onboarding = board;
    });
  }

  public getOffers() {
    this.subscription = this.content.getOffersbyType({ id: 'POPUP', admin: true }).subscribe((resp) => {
      this.dataPopupActive = [];
      this.dataPopupProgrammed = [];
      this.dataPopupRoughCopy = [];
      this.dataPopupExpire = [];

      const startTime: any = new Date();
      this.dataSourcePopup = resp;
      for (let index = 0; index < this.dataSourcePopup.length; index++) {
        const date: any = new Date(this.dataSourcePopup[index].datestart);
        this.dataSourcePopup[index].selected = false;

        if (date - startTime > 0) {
          this.dataSourcePopup[index].programmed = true;
        } else {
          this.dataSourcePopup[index].programmed = false;
        }

        if (!this.dataSourcePopup[index].dateend) {
          this.dataSourcePopup[index].undefinedDate = true;
        } else {
          this.dataSourcePopup[index].undefinedDate = false;
        }

        if (this.dataSourcePopup[index].active) {
          this.dataPopupActive.push(this.dataSourcePopup[index]);
        } else if (this.dataSourcePopup[index].programmed) {
          this.dataPopupProgrammed.push(this.dataSourcePopup[index]);
        } else if (!this.dataSourcePopup[index].datestart || !this.dataSourcePopup[index].dateend) {
          this.dataPopupRoughCopy.push(this.dataSourcePopup[index]);
        } else {
          this.dataPopupExpire.push(this.dataSourcePopup[index]);
        }
      }
    });
  }

  public getSectionsClicker() {
    this.subscription = this.auth.getPermisionByUser('CLICKER').subscribe((resp) => {
      this.selectedSection = resp;
    });
  }

  public hourChange(horu, type) {
    const data = new Date();
    const dataH = moment(data).format('YYYY-MM-DD');
    const dataOp = moment(horu.value).format('YYYY-MM-DD');
    switch (type) {
      case 'publicationDate':
        this.minHours = dataH === dataOp ? moment(data).format('hh:mm A') : '12:00 AM';
        break;
      case 'finishDate':
        this.minHoursFinish = dataH === dataOp ? moment(data).format('hh:mm A') : '12:00 AM';
        break;
    }
  }

  public checkButton() {
    if (this.nameFileCert !== '' && this.nameFileCert2 !== '') {
      this.activebutton = true;
      this.activeButtonOfer = true;
    } else {
      this.activebutton = false;
      this.activeButtonOfer = false;
    }
  }

  public openModalonBoarding() {
    const dialog = this.dialog.open(DialogOnboardingComponent, {
      width: '450px',
    });

    dialog.beforeClosed().subscribe((board) => {
      this.getBoardings();
    });
  }

  public editPopupModal(elementP) {
    this.showUndefinedDate = false;
    const titleP = 'Popup';
    const idBussinessP = 2;
    const editP = 0;
    const templateP = this.templateAddImagenPopup;
    this.dataAddImagenPopup.reset();
    this.showErrorCert = false;
    if (elementP.imageurlweb !== '') {
      const datos = elementP.imageurlweb.split('/');
      this.nameFileCert = datos[datos.length - 1];
      const datos2 = elementP.imageurlmobile.split('/');
      this.nameFileCert2 = datos2[datos2.length - 1];
      this.checkButton();
    }
    this.fileImgCat = '';
    this.fileImgCat2 = '';
    this.dataAddImagenPopup.controls.nameContent.setValue(elementP.description);
    this.dataAddImagenPopup.controls.link.setValue(elementP.link);
    this.dataAddImagenPopup.controls.seccion.setValue(elementP.seccion);
    this.dataAddImagenPopup.controls.textbutton.setValue(elementP.textbutton);
    this.dataAddImagenPopup.controls.colorbutton.setValue(elementP.colorbutton);

    this.formateDateHour(elementP);
    this.undefinedDate = false;

    this.idPopup = elementP.id;
    this.dialog.open(ModalGenericComponent, {
      width: '450px',
      data: {
        title: titleP,
        idBussiness: idBussinessP,
        template: templateP,
        edit: editP,
      },
    });
  }

  public uploadFileImage(e) {
    this.extension = 'jpg';
    this.size = 150;
    this.utils.onFileChangeFiles(e, this.extension, this.size, 'file');

    this.utils.fileB64.subscribe((val:any) => {
      this.fileImgCat = val;
    });

    this.utils.nameFile.subscribe(nameFile => this.nameFileCert = nameFile);
    this.utils.errorFile.subscribe(errorFile => this.showErrorCert = errorFile);
    
  }

  public uploadFileImage2(e) {
    this.extension = 'jpg';
    this.size = 150;
    this.utils.onFileChangeFiles(e, this.extension, this.size, 'file2');

    this.utils.file2B64.subscribe((val:any) => {
      this.fileImgCat2 = val;
    });

    this.utils.nameFile2.subscribe(nameFile => this.nameFileCert2 = nameFile);
    this.utils.errorFile2.subscribe(errorFile => this.showErrorCert2 = errorFile);
    
  }

  public deleteOfer(element, type) {
    let title = '';
    let message = '';
    let confirmButtonText = '';

    if (type === 'popup') {
      title = 'Eliminar popup';
      message = '¿Está seguro que desea eliminar el popup seleccionado?';
      confirmButtonText = 'Eliminar popup';
    } 

    Swal.fire({
      html: `<h3 class='delete-title-comision'>${title}</h3> <p class='w-container'>${message}</p>`,
      confirmButtonText: confirmButtonText,
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      confirmButtonClass: 'updateokdelete order-last',
      cancelButtonClass: 'updatecancel',
      allowOutsideClick: false,
    }).then((resp: any) => {
      if (resp.dismiss !== 'cancel') {
        this.subscription = this.content.deleteOfer([element.id]).subscribe(() => {
          this.getOffers();
        });
      }
    });
  }

  public formateDateHour(element) {
    let hour;
    if (element.datestart) {
      this.datePublication = moment(element.datestart).format();
      hour = element.datestart.split('T');
      this.hourDate = this.timeFormat(hour[1]);
    }

    if (element.dateend) {
      this.dateFinishPublication = moment(element.dateend).format();
      hour = element.dateend.split('T');
      this.hourDateFinish = this.timeFormat(hour[1]);
    } else {
      this.undefinedDate = true;
    }

    this.visible = element.active;
  }

  public activate(element) {
    const datos = [{ id: element.id, active: element.active }];
    this.subscription = this.content.saveActiveBanner(datos).subscribe();
  }

  public savePopupModal() {
    this.showUndefinedDate = false;
    this.undefinedDate = false;
    const titlePopup = 'Popup';
    const idBussiness = 2;
    const editPopup = 0;
    const templatePopup = this.templateAddImagenPopup;
    this.dataAddImagenPopup.reset();
    this.idPopup = 0;
    this.showErrorCert = false;
    this.activeButtonOfer = false;
    this.nameFileCert = '';
    this.nameFileCert2 = '';
    this.dialog.open(ModalGenericComponent, {
      width: '450px',
      data: {
        title: titlePopup,
        template: templatePopup,
        idBussiness,
        edit: editPopup,
      },
    });
  }

  public saveImagenPopup() {
    let visible;
    if (this.dateFinishPublication && this.visible) {
      visible = 1;
    } else {
      visible = 0;
    }

    const datePublication = this.datePublication ? moment(this.datePublication).format('YYYY-MM-DD') : '';
    const dateFinishPublication = this.dateFinishPublication ? moment(this.dateFinishPublication).format('YYYY-MM-DD') : '';
    const hour = this.hourDate ? this.militaryHrFormat(this.hourDate) : '';
    const hourEnd = this.hourDateFinish ? this.militaryHrFormat(this.hourDateFinish) : '';

    const datestart = !this.visible && datePublication ? `${datePublication} ${hour}` : '';
    const dateend =
      !this.visible && !this.undefinedDate && !this.showUndefinedDate && dateFinishPublication ? `${dateFinishPublication} ${hourEnd}` : '';

    let datos: any = [
      {
        link: this.dataAddImagenPopup.controls.link.value || '',
        active: visible,
        description: this.dataAddImagenPopup.controls.nameContent.value,
        dateend,
        datestart,
        type: 'POPUP',
        textButton: this.dataAddImagenPopup.controls.textbutton.value,
        colorButton: this.dataAddImagenPopup.controls.colorbutton.value,
        seccion: this.dataAddImagenPopup.controls.seccion.value,
        Business: 'exito',
        idBusiness: 1,
        infoAditional: '',
      },
    ];

    if (this.idPopup === 0) {
      datos = [
        {
          ...datos[0],
          imageWeb: this.fileImgCat,
          imageMobile: this.fileImgCat2,
        },
      ];
    } else {
      datos = [
        {
          ...datos[0],
          id: this.idPopup,
          imageWeb: this.fileImgCat,
          imageMobile: this.fileImgCat2,
        },
      ];
    }

    this.subscription = this.content.saveOfertBusiness(datos).subscribe(() => {
      this.dataAddImagenPopup.reset();
      this.dialog.closeAll();
      this.getOffers();
    });
  }

  public deleteBoard(id: any) {
    Swal.fire({
      html: "<h3 class='delete-title-comision'>Eliminar contenido</h3> <p class='w-container'>¿Está seguro que desea eliminar el contenido seleccionado?</p>",
      confirmButtonText: 'Eliminar contenido',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      confirmButtonClass: 'updateokdelete order-last',
      cancelButtonClass: 'updatecancel',
      allowOutsideClick: false,
    }).then((resp: any) => {
      if (resp.dismiss !== 'cancel') {
        this.subscription = this.content.deleteBoardings([id]).subscribe(() => {
          this.getBoardings();
        });
      }
    });
  }

  public editBoard(data: any) {
    const edit = this.dialog.open(DialogOnboardingComponent, {
      width: '450px',
      data,
    });
    edit.beforeClosed().subscribe((board) => {
      this.getBoardings();
    });
  }

  public onNoClick() {
    this.datePublication = null;
    this.hourDate = null;
    this.dateFinishPublication = null;
    this.hourDateFinish = null;
    this.undefinedDate = false;
    this.dialog.closeAll();
  }

  public timeFormat(time) {
    const hour = time.split(':')[0];
    const minute = time.split(':')[1];

    if (hour >= 12) {
      if (hour === 12) {
        const h = hour;
        const m = minute + ' PM';
        return h + ':' + m;
      } else {
        const h = hour - 12;
        const m = minute + ' PM';
        return h + ':' + m;
      }
    } else {
      const h = parseInt(hour);
      return h + ':' + minute + ' AM';
    }
  }

  public militaryHrFormat(time) {
    const format = time.toString().split(' ')[1];
    const hour = time.toString().split(' ')[0].split(':')[0];
    if (hour == 12) {
      const hour = time.toString().split(' ')[0];
      return hour;
    } else {
      if (format === 'PM') {
        const hour = time.toString().split(' ')[0];
        const h = parseInt(hour.split(':')[0]) + 12;
        const m = hour.split(':')[1];
        return h + ':' + m;
      } else {
        if (hour < 10) {
          const hour = 0 + time.toString().split(' ')[0];
          return hour;
        } else {
          const hour = time.toString().split(' ')[0];
          return hour;
        }
      }
    }
  }

  public formatDate(date) {
    const fDate = moment(date).format('DD/MM/YY');
    const hour = date.split('T');
    const formatHour = this.timeFormat(hour[1]);
    return `${fDate} ${formatHour}`;
  }

  public getSectionName(url) {
    const section = this.selectedSection.find((x) => x.route === url);
    return section ? section.menu : '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
