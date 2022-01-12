import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { ContentService } from 'src/app/services/content.service';
import { UtilsService } from 'src/app/services/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-carrusel',
  templateUrl: './table-carrusel.component.html',
  styleUrls: ['./table-carrusel.component.scss'],
})
export class TableCarruselComponent implements OnInit {
  @Input() typeConsult: string;
  @ViewChild('table', { static: false }) table: MatTable<any>;
  @ViewChild('templateAddImagenCarousel', { static: false })
  templateAddImagenCarousel: TemplateRef<any>;

  private subscription: Subscription = new Subscription();
  

  constructor(private content: ContentService, private dialog: MatDialog, private utils: UtilsService, private fb: FormBuilder) {}

  displayedColumns: string[] = ['drag', 'image', 'name', 'link', 'business', 'comision', 'active', 'actions'];
  dataSource = [];
  dataAddImagen: FormGroup;
  active: boolean;
  showUndefinedDate = true;
  idCarousel = 0;
  nameFileCert = '';
  nameFileCert2 = '';
  fileImgCat: any = '';
  showErrorCert: boolean;
  activebutton: boolean;
  selected: any;
  visible = false;
  selectedBuss = [];
  datePublication: any = '';
  hourDate: any = '';
  dateFinishPublication: any = '';
  
  undefinedDate = false;
  extension: string;
  size: number;
  selectAllVideosImg = 'Seleccionar todos';

  @ViewChild('templatePublication', { static: false })
  templatePublication: TemplateRef<any>;
  maxDate = new Date();
  hourDateFinish: any = '';
  minHours: any;
  minHoursFinish: any;

  ngOnInit() {
    this.dataAddImagen = this.fb.group({
      nameContent: [null, Validators.required],
      link: [null, Validators.required],
      business: [null, Validators.required],
      comision: [null, Validators.required],
      image: [null, Validators.required],
    });

    this.getCarrusel();
    this.getAllBusiness();
  }

  public getCarrusel() {
    this.subscription = this.content.getOffersbyType({ id: this.typeConsult, admin: true }).subscribe((resp) => {
      const startTime: any = new Date();

      this.dataSource = resp;
      for (let index = 0; index < this.dataSource.length; index++) {
        const date: any = new Date(this.dataSource[index].datestart);
        this.dataSource[index].selected = false;
        if (date - startTime > 0) {
          this.dataSource[index].programmed = true;
        } else {
          this.dataSource[index].programmed = false;
        }
        if (!this.dataSource[index].dateend) {
          this.dataSource[index].undefinedDate = true;
        } else {
          this.dataSource[index].undefinedDate = false;
        }
      }
    });
  }

  public saveCarouselModal() {
    const title = 'Nueva Imagen';
    const idBussiness = 1;
    const edit = 0;
    const template = this.templateAddImagenCarousel;
    this.showUndefinedDate = true;
    this.idCarousel = 0;
    this.dataAddImagen.reset();
    this.nameFileCert = '';
    this.showErrorCert = false;
    this.activebutton = false;
    this.datePublication = null;
    this.hourDate = null;
    this.dateFinishPublication = null;
    this.hourDateFinish = null;
    this.undefinedDate = false;
    this.visible = false;
    this.dialog.open(ModalGenericComponent, {
      width: '450px',
      data: {
        title,
        idBussiness,
        template,
        edit,
      },
    });
  }

  public editCarouselModal(element) {
    this.showUndefinedDate = true;
    const title = 'Editar Imagen';
    const idBussiness = 1;
    const edit = 0;
    const template = this.templateAddImagenCarousel;
    this.dataAddImagen.reset();
    this.showErrorCert = false;
    
    if (element.imageurlweb !== '') {
      const datos = element.imageurlweb.split('/');
      this.nameFileCert = datos[datos.length - 1];
      this.checkButton();
    }
    this.fileImgCat = '';
    this.dataAddImagen.controls.nameContent.setValue(element.description);
    this.dataAddImagen.controls.link.setValue(element.link);
    this.dataAddImagen.controls.image.setValue(null);
    this.dataAddImagen.controls.image.clearValidators();

    this.formateDateHour(element);

    this.dataAddImagen.controls.business.setValue(element.idbusiness);
    if (element.idbusiness === null) {
      this.dataAddImagen.controls.business.setValue(0);
    }
    this.dataAddImagen.controls.comision.setValue(element.infoaditional);
    this.selected = element.business;
    this.idCarousel = element.id;
    this.dialog.open(ModalGenericComponent, {
      width: '450px',
      data: {
        title,
        idBussiness,
        template,
        edit,
      },
    });
  }

  public saveImagenCarousel() {
    let visible = 0;
    if (this.visible) {
      visible = 1;
    } else {
      visible = 0;
    }
    const bussiness = this.dataAddImagen.controls.business.value;
    let buss = '';
    for (let index = 0; index < this.selectedBuss.length; index++) {
      if (this.selectedBuss[index].id.toString() === bussiness.toString()) {
        buss = this.selectedBuss[index].code;
      }
    }
    let idBuss;
    if (this.dataAddImagen.controls.business.value === 0) {
      idBuss = null;
    } else {
      idBuss = this.dataAddImagen.controls.business.value;
    }

    const datePublication = moment(this.datePublication).format('YYYY-MM-DD');
    const dateFinishPublication = moment(this.dateFinishPublication).format('YYYY-MM-DD');
    const hour = this.hourDate ? this.utils.HoraMilitar(this.hourDate) : '';
    const hourEnd = this.hourDateFinish ? this.utils.HoraMilitar(this.hourDateFinish) : '';

    const datestart = !this.visible ? `${datePublication} ${hour}:00` : '';
    const dateend = !this.visible && !this.undefinedDate ? `${dateFinishPublication} ${hourEnd}:00` : '';

    let datos: any = [
      {
        description: this.dataAddImagen.controls.nameContent.value,
        link: this.dataAddImagen.controls.link.value,
        idBusiness: idBuss,
        Business: buss,
        infoAditional: this.dataAddImagen.controls.comision.value,
        active: visible,
        type: this.typeConsult,
        datestart,
        dateend,
      },
    ];

    if (this.idCarousel === 0) {
      datos = [
        {
          ...datos[0],
          imageWeb: this.fileImgCat,
        },
      ];
    } else {
      if (this.fileImgCat !== '') {
        datos = [
          {
            ...datos[0],
            id: this.idCarousel,
            imageWeb: this.fileImgCat,
          },
        ];
      } else {
        datos = [
          {
            ...datos[0],
            id: this.idCarousel,
          },
        ];
      }
    }

    this.subscription = this.content.saveOfertBusiness(datos).subscribe(() => {
      this.dataAddImagen.reset();
      this.dialog.closeAll();
      this.getCarrusel();
    });
  }

  public dropTable(event: CdkDragDrop<any[]>) {
    const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
    this.table.renderRows();
    const datosSourceSend = [];
    for (let i = 0; i < this.dataSource.length; i++) {
      this.dataSource[i].orderby = i + 1;
      datosSourceSend.push({
        id: this.dataSource[i].id,
        orderby: i + 1,
      });
    }
    this.saveOrder(datosSourceSend);
  }

  public saveOrder(datos: any) {
    this.subscription = this.content.saveOrderOfertBusiness(datos).subscribe();
  }

  public formatDate(date) {
    const fDate = moment(date).format('DD/MM/YY');
    const hour = date.split('T');
    const formatHour = this.utils.timeFormat(hour[1]);
    return `${fDate} ${formatHour}`;
  }

  public loadDelete() {
    const index = [];
    this.dataSource.forEach((element, i) => {
      if (element.selected === true) {
        index.push(i);
      }
    });
    if (index.length > 0) {
      this.active = true;
    } else {
      this.active = false;
    }
  }

  public checkButton() {
    if (this.nameFileCert !== '') {
      this.activebutton = true;
    } else {
      this.activebutton = false;
    }
  }

  public formateDateHour(element) {
    let hour;
    if (element.datestart) {
      this.datePublication = moment(element.datestart).format();
      hour = element.datestart.split('T');
      this.hourDate = this.utils.timeFormat(hour[1]);
    }

    if (element.dateend) {
      this.dateFinishPublication = moment(element.dateend).format();
      hour = element.dateend.split('T');
      this.hourDateFinish = this.utils.timeFormat(hour[1]);
    } else {
      this.undefinedDate = true;
    }

    this.visible = element.active;
  }

  public deleteCarousel(element) {
    const title = 'Eliminar imagen';
    const message = '¿Estás seguro de eliminar la imagen seleccionada?';
    const confirmButtonText = 'Eliminar imagen';

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
          this.getCarrusel();
        });
      }
    });
  }

  public onNoClick() {
    this.dataAddImagen.reset();
    this.datePublication = null;
    this.hourDate = null;
    this.dateFinishPublication = null;
    this.hourDateFinish = null;
    this.undefinedDate = false;
    this.dialog.closeAll();
  }

  public uploadFileImage(e) {
    this.extension = 'jpg';
    this.size = 300;
    this.utils.onFileChangeFiles(e, this.extension, this.size, 'file');
    this.utils.fileB64.subscribe((val:any) => {
      this.fileImgCat = val;
    });

    this.utils.nameFile.subscribe(nameFile => {
      this.nameFileCert = nameFile
      this.activebutton = true;
    });
    this.utils.errorFile.subscribe(errorFile => {
      this.showErrorCert = errorFile;
      this.activebutton = false;
    });
    
  }

  public selectAll() {
    if (this.selectAllVideosImg === 'Seleccionar todos') {
      for (let i = 0; i < this.dataSource.length; i++) {
        this.dataSource[i].selected = true;
      }
      if (this.dataSource.length > 0) {
        this.active = true;
        this.selectAllVideosImg = 'Deseleccionar todos';
      }
    } else {
      for (let i = 0; i < this.dataSource.length; i++) {
        this.dataSource[i].selected = false;
      }

      if (this.dataSource.length > 0) {
        this.active = false;
        this.selectAllVideosImg = 'Seleccionar todos';
      }
    }
  }

  public getAllBusiness() {
    this.subscription = this.content.getAllBusiness().subscribe((resp) => {
      this.selectedBuss = resp;

      this.selectedBuss.push({
        code: 'clickam',
        description: 'Clickam',
        id: 0,
        placeholder: 'TIPO DE REPORTE',
        tabtablecommission: 'Clickam',
      });
    });
  }

  public deleteEvery() {
    Swal.fire({
      html: "<h3 class='delete-title-comision'>Eliminar Imagenes</h3> <p class='w-container'>¿Estás seguro de eliminar las imagenes seleccionadas?</p>",
      confirmButtonText: 'Eliminar imagen',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      confirmButtonClass: 'updateokdelete order-last',
      cancelButtonClass: 'updatecancel',
      allowOutsideClick: false,
    }).then((resp: any) => {
      if (resp.dismiss !== 'cancel') {
        const datos = [];
        for (let index = 0; index < this.dataSource.length; index++) {
          if (this.dataSource[index].selected === true) {
            datos.push(this.dataSource[index].id);
          }
        }
        this.subscription = this.content.deleteOfer(datos).subscribe(() => {
          this.getCarrusel();
          this.active = false;
        });
      }
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
