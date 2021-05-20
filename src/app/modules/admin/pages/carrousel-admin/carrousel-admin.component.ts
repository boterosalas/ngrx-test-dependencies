import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatTable } from '@angular/material';
import * as moment from "moment";
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { ContentService } from 'src/app/services/content.service';
import Swal from 'sweetalert2';
export interface PeriodicElement {
  drag: any;
  bussiness: any;
  activated: any;
}
export interface PeriodicElement2 {
  drag: any;
  bussiness: any;
  activated: any;
}
@Component({
  selector: 'app-carrousel-admin',
  templateUrl: './carrousel-admin.component.html',
  styleUrls: ['./carrousel-admin.component.scss']
})
export class CarrouselAdminComponent implements OnInit {
  displayedColumns: string[] = ['drag', 'imagenWeb', 'imagenMobile', 'nameContent', 'link', 'bussiness', 'comision', 'active', 'actions'];
  displayedColumns2: string[] = ['drag', 'image', 'nameContent', 'link', 'bussiness', 'comision', 'active', 'actions'];
  dataAddImagen: FormGroup;
  dataAddImagenOfertas: FormGroup;
  selectAllVideosImg: string = "Seleccionar todos";
  selectAllVideosImgOfer: string = "Seleccionar todos";
  active: boolean;
  active2: boolean;
  idCarousel: number = 0;
  idOfertas: number = 0;
  selected: any;
  @ViewChild('table', { static: false }) table: MatTable<PeriodicElement>;
  @ViewChild('table2', { static: false }) table2: MatTable<PeriodicElement2>;
  @ViewChild("templateAddImagenCarousel", { static: false }) templateAddImagenCarousel: TemplateRef<any>;
  @ViewChild("templateAddImagenOfertas", { static: false }) templateAddImagenOfertas: TemplateRef<any>;
  @ViewChild("templatePublication", { static: false }) templatePublication: TemplateRef<any>;
  
  fileImgCat: any = "";
  nameFileCert: string = '';
  showErrorCert: boolean;
  selectedBuss = []
  fileImgCat2: any = "";
  nameFileCert2: string = '';
  showErrorCert2: boolean;
  activebutton: boolean;
  validFormat: boolean;
  business: any;
  dataSourceOfer = [];
  activeButtonOfer: boolean;
  maxDate = new Date();
  minHours: any;
  minHoursFinish: any;
  disabledButtonEr: boolean = true;
  disabledButtonPu: boolean = true;
  contadorDates: number = 0;
  dateForm: FormGroup;
  datePublication: any = "";
  hourDate: any = "";
  dateFinishPublication: any = "";
  hourDateFinish: any = "";
  visible: boolean = false;
  undefinedDate: boolean = false;

  dataSource = [];

  constructor(
    private dialog: MatDialog,
    private content: ContentService,
    private fb: FormBuilder,
  ) {
    this.dataAddImagen = this.fb.group({
      nameContent: [null, Validators.required],
      link: [null, Validators.required],
      business: [null, Validators.required],
      comision: [null, Validators.required],
      image: [null],
      image2: [null]
    });
    this.dataAddImagenOfertas = this.fb.group({
      nameContent: [null, Validators.required],
      link: [null, Validators.required],
      business: [null, Validators.required],
      comision: [null, Validators.required],
      image: [null],
    });
  }

  ngOnInit() {
    this.getOffers();
    this.getAllBusiness();
  }
  public getOffers() {
    this.content.getOffersbyType({ id: "CARROUSEL", admin: true }).subscribe((resp) => {
      const startTime: any = new Date()
      
      this.dataSource = resp;
      for (let index = 0; index < this.dataSource.length; index++) {
        let date: any = new Date(this.dataSource[index].datestart)
        this.dataSource[index].selected = false;
        this.dataSource[index].programmed = date - startTime > 0 ? true : false
      }
    })
    this.content.getOffersbyType({ id: "OFERTA", admin: true }).subscribe((resp) => {
      const startTime: any = new Date()
      this.dataSourceOfer = resp;
      for (let index = 0; index < this.dataSourceOfer.length; index++) {
        let date: any = new Date(this.dataSourceOfer[index].datestart)
        this.dataSourceOfer[index].selected = false;
        this.dataSourceOfer[index].programmed = date - startTime > 0 ? true : false
      }
    })
  }
  public getAllBusiness() {
    this.content.getAllBusiness().subscribe(resp => {
      this.selectedBuss = resp;

      this.selectedBuss.push({
        code: "clickam",
        description: "Clickam",
        id: 0,
        placeholder: "TIPO DE REPORTE",
        tabtablecommission: "Clickam"
      })

    })

  }

  public hourChange(horu, type) {
    let data = new Date();
    let dataH = moment(data).format("YYYY-MM-DD");
    let dataOp = moment(horu.value).format("YYYY-MM-DD");
    switch (type) {
      case "publicationDate":
        this.minHours = dataH === dataOp ? moment(data).format("hh:mm A") : "12:00 AM";
        break;
      case "finishDate":
        this.minHoursFinish = dataH === dataOp ? moment(data).format("hh:mm A") : "12:00 AM";
        break;
      default:
        break;
    }
  }

  public dropTable(event: CdkDragDrop<PeriodicElement[]>) {
    const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
    this.table.renderRows();
    let datosSourceSend = []
    for (let i = 0; i < this.dataSource.length; i++) {
      this.dataSource[i].orderby = i + 1
      datosSourceSend.push({
        id: this.dataSource[i].id,
        orderby: i + 1
      })
    }
    this.saveOrder(datosSourceSend)
  }
  public dropTable2(event: CdkDragDrop<PeriodicElement[]>) {
    const prevIndex = this.dataSourceOfer.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSourceOfer, prevIndex, event.currentIndex);
    this.table2.renderRows();
    let datosSourceSend = []
    for (let i = 0; i < this.dataSourceOfer.length; i++) {
      this.dataSourceOfer[i].orderby = i + 1
      datosSourceSend.push({
        id: this.dataSourceOfer[i].id,
        orderby: i + 1
      })
    }
    this.saveOrder(datosSourceSend)
  }
  public saveOrder(datos: any) {
    this.content.saveOrderOfertBusiness(datos).subscribe(resp => {
      //console.log(resp)
    })
  }
  private getExtension(nameFile: string, getSize: number) {
    let splitExtFile = nameFile.split(".");
    let getExtFile = splitExtFile[splitExtFile.length - 1].toLocaleLowerCase();
    this.validFormat = false;
    if ("jpg" === getExtFile) {
      this.validFormat = true;
    }
    if (300 < (getSize / 1000)) {
      this.validFormat = false;
    }
  }
  public onFileChangeFiles(event, param: string) {
    const target = event.target
    const files = target.files[0]
    let nameFileCarrousel = files.name;
    let readerCarrousel = new FileReader();
    let sizeFileCarrousel = files.size;
    let fileList: FileList = target.files;
    this.getExtension(fileList[0].name, fileList[0].size);
    if (target.files && target.files.length) {
      const [Tfiles] = target.files;
      let fileBlobCarrousel = new Blob([Tfiles]);
      let newFile = new File([fileBlobCarrousel], nameFileCarrousel);
      readerCarrousel.readAsDataURL(newFile);
      readerCarrousel.onload = () => {
        this.getExtension(nameFileCarrousel, sizeFileCarrousel);
        if (this.validFormat === true) {
          this.fileImgCat = readerCarrousel.result;
          this.fileImgCat = this.fileImgCat.split(",")[1]
          this.nameFileCert = nameFileCarrousel;
          this.showErrorCert = false;
          this.activeButtonOfer = true;
          if (this.nameFileCert2 != "") {
            this.activebutton = true;
          } else {
            this.activebutton = false;
          }

        } else {
          this.showErrorCert = true;
          this.nameFileCert = nameFileCarrousel;
          this.activebutton = false;
          this.activeButtonOfer = false;
        }
      };
    }
  }
  public onFileChangeFilesSecond(event, param: string) {
    const target = event.target
    const files2 = target.files[0]
    let nameFileCarrousel2 = files2.name;
    let newReader = new FileReader();
    let sizeFile = target.files[0].size;
    let fileList: FileList = target.files;
    this.getExtension(fileList[0].name, sizeFile);
    if (target.files && target.files.length) {
      const [Tfiles2] = target.files;
      let fileBlob = new Blob([Tfiles2]);
      let newFile2 = new File([fileBlob], nameFileCarrousel2);
      newReader.readAsDataURL(newFile2);
      newReader.onload = () => {
        if (this.validFormat === true) {
          this.fileImgCat2 = newReader.result;
          this.fileImgCat2 = this.fileImgCat2.split(",")[1]
          this.nameFileCert2 = nameFileCarrousel2;
          this.showErrorCert2 = false;
          if (this.nameFileCert != "") {
            this.activebutton = true;
          } else {
            this.activebutton = false;
          }
        } else {
          this.showErrorCert2 = true;
          this.nameFileCert2 = nameFileCarrousel2;
          this.activebutton = false;
        }
      };
    }
  }
  public checkButton() {
    if (this.nameFileCert != "" && this.nameFileCert2 != "") {
      this.activebutton = true;
      this.activeButtonOfer = true;
    } else {
      this.activebutton = false;
      this.activeButtonOfer = false;
    }
  }
  public editCarouselModal(element) {
    const title = "Editar Imagen";
    const idBussiness = 1;
    const edit = 0;
    const template = this.templateAddImagenCarousel;
    this.dataAddImagen.reset();
    this.showErrorCert = false;
    if (element.imageurlweb != "") {
      let datos = element.imageurlweb.split("/")
      this.nameFileCert = datos[datos.length - 1]
      let datos2 = element.imageurlmobile.split("/")
      this.nameFileCert2 = datos2[datos2.length - 1]
      this.checkButton();
    }
    this.fileImgCat = "";
    this.fileImgCat2 = "";
    this.dataAddImagen.controls.nameContent.setValue(element.description)
    this.dataAddImagen.controls.link.setValue(element.link);

    this.formateDateHour(element)

    this.dataAddImagen.controls.business.setValue(element.idbusiness)
    if (element.idbusiness === null) {
      this.dataAddImagen.controls.business.setValue(0)
    }
    this.dataAddImagen.controls.comision.setValue(element.infoaditional)
    this.selected = element.business;
    this.idCarousel = element.id;
    let dialogRef1 = this.dialog.open(ModalGenericComponent, {
      width: "450px",
      data: {
        title,
        idBussiness,
        template,
        edit
      },
    });

  }

  private formateDateHour(element) {
    let hour
    if (element.datestart) {
      this.datePublication = moment(element.datestart).format();
      hour = element.datestart.split("T");
      this.hourDate = this.timeFormat(hour[1]);
    }

    if (element.dateend) {
      this.dateFinishPublication = moment(element.dateend).format();
      hour = element.dateend.split("T");
      this.hourDateFinish = this.timeFormat(hour[1]);
    } else {
      this.undefinedDate = true
    }
    
    this.visible = element.active
  }

  public activate(element) {
    let datos = [{ id: element.id, active: element.active }]
    this.content.saveActiveBanner(datos).subscribe((resp) => {

    })
  }
  public editOfertasModal(element) {
    const title = "Editar Imagen";
    const idBussiness = 1;
    const edit = 0;
    const template = this.templateAddImagenOfertas;
    this.showErrorCert = false;
    if (element.imageurlweb != "") {
      let datos = element.imageurlweb.split("/")
      this.nameFileCert = datos[datos.length - 1]
      let datos2 = element.imageurlmobile.split("/")
      this.nameFileCert2 = datos2[datos2.length - 1]
      this.checkButton();
    }

    this.fileImgCat = "";
    this.fileImgCat2 = "";
    //this.nameFileCert2 = ""
    this.dataAddImagenOfertas.reset();
    this.dataAddImagenOfertas.controls.nameContent.setValue(element.description)
    this.dataAddImagenOfertas.controls.link.setValue(element.link)
    this.dataAddImagenOfertas.controls.business.setValue(element.idbusiness);
    if (element.idbusiness === null) {
      this.dataAddImagen.controls.business.setValue(0)
    }
    this.dataAddImagenOfertas.controls.comision.setValue(element.infoaditional)
    this.idOfertas = element.id;
    
    this.formateDateHour(element)

    let dialogRef1 = this.dialog.open(ModalGenericComponent, {
      width: "450px",
      data: {
        title,
        idBussiness,
        template,
        edit
      },
    });
  }
  public saveCarouselModal() {
    const title = "Nueva Imagen";
    const idBussiness = 1;
    const edit = 0;
    const template = this.templateAddImagenCarousel;
    this.idCarousel = 0;
    this.dataAddImagen.reset();
    this.nameFileCert2 = "";
    this.nameFileCert = "";
    this.showErrorCert = false;
    this.activebutton = false;
    let dialogRef1 = this.dialog.open(ModalGenericComponent, {
      width: "450px",
      data: {
        title,
        idBussiness,
        template,
        edit
      },
    });

  }
  public saveOfertasModal() {
    const title = "Nueva Imagen";
    const idBussiness = 1;
    const edit = 0;
    const template = this.templateAddImagenOfertas;
    this.dataAddImagenOfertas.reset();
    this.idOfertas = 0;
    this.showErrorCert = false;
    this.nameFileCert2 = "";
    this.nameFileCert = "";
    this.activeButtonOfer = false;
    let dialogRef1 = this.dialog.open(ModalGenericComponent, {
      width: "450px",
      data: {
        title,
        idBussiness,
        template,
        edit
      },
    });

  }
  public deleteComisionCarousel(element) {
    Swal.fire({
      html: "<h3 class='delete-title-comision'>Eliminar Imagen</h3> <p class='w-container'>¿Estás seguro de eliminar la imagen seleccionada?</p>",
      confirmButtonText: "Eliminar imagen",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonClass: "updateokdelete order-last",
      cancelButtonClass: "updatecancel",
      allowOutsideClick: false
    }).then((resp: any) => {
      if (resp.dismiss !== 'cancel') {
        this.content.deleteOfer([element.id]).subscribe((resp) => {
          this.getOffers();
        })
      }
    })
  }
  public deleteComisionOferta(element) {
    Swal.fire({
      html: "<h3 class='delete-title-comision'>Eliminar Imagen</h3> <p class='w-container'>¿Estás seguro de eliminar la imagen seleccionada?</p>",
      confirmButtonText: "Eliminar imagen",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonClass: "updateokdelete order-last",
      cancelButtonClass: "updatecancel",
      allowOutsideClick: false
    }).then((resp: any) => {
      if (resp.dismiss !== 'cancel') {
        this.content.deleteOfer([element.id]).subscribe((resp) => {
          this.getOffers();
        })
      }
    })
  }
  public saveImagenCarousel() {
    let visible = 0;
    if (this.visible) {
      visible = 1;
    } else {
      visible = 0;
    }
    let bussiness = this.dataAddImagen.controls.business.value;
    let buss = ""
    for (let index = 0; index < this.selectedBuss.length; index++) {
      if (this.selectedBuss[index].id.toString() === bussiness.toString()) {
        buss = this.selectedBuss[index].code
      }
    }
    let idBuss;
    if (this.dataAddImagen.controls.business.value === 0) {
      idBuss = null;
    } else {
      idBuss = this.dataAddImagen.controls.business.value;
    }

    let datePublication = moment(this.datePublication).format("YYYY-MM-DD");
    let dateFinishPublication = moment(this.dateFinishPublication).format("YYYY-MM-DD");
    let hour = this.hourDate ? this.militaryHrFormat(this.hourDate) : "";
    let hourEnd = this.hourDateFinish ? this.militaryHrFormat(this.hourDateFinish) : "";

    const datestart = !this.visible ? `${datePublication} ${hour}:00` : ""
    const dateend = !this.visible && !this.undefinedDate ? `${dateFinishPublication} ${hourEnd}:00` : ""

    let datos: any = [{
      description: this.dataAddImagen.controls.nameContent.value,
      link: this.dataAddImagen.controls.link.value,
      idBusiness: idBuss,
      Business: buss,
      infoAditional: this.dataAddImagen.controls.comision.value,
      active: visible,
      type: "CARROUSEL",
      datestart,
      dateend
    }]

    if (this.idCarousel === 0) {
      datos = [{
        ...datos[0],
        imageWeb: this.fileImgCat,
        imageMobile: this.fileImgCat2
      }]
    } else {
      if (this.fileImgCat != "" && this.fileImgCat2 != "") {
        datos = [{
          ...datos[0],
          id: this.idCarousel,
          imageWeb: this.fileImgCat,
          imageMobile: this.fileImgCat2
        }]
      } else if (this.fileImgCat2 != "") {
        datos = [{
          ...datos[0],
          id: this.idCarousel,
          imageMobile: this.fileImgCat2
        }]
      } else if (this.fileImgCat != "") {
        datos = [{
          ...datos[0],
          id: this.idCarousel,
          imageWeb: this.fileImgCat,
          imageMobile: this.fileImgCat2,
        }]
      } else {
        datos = [{
          ...datos[0],
          id: this.idCarousel
        }]
      }
    }

    this.content.saveOfertBusiness(datos).subscribe((resp) => {
      this.dataAddImagen.reset()
      this.dialog.closeAll()
      this.getOffers();
    })
  }
  public saveImagenOfertas() {
    let visible = 0;
    if (this.visible) {
      visible = 1;
    } else {
      visible = 0;
    }
    let bussiness = this.dataAddImagenOfertas.controls.business.value;
    let buss = ""
    for (let index = 0; index < this.selectedBuss.length; index++) {
      if (this.selectedBuss[index].id.toString() === bussiness.toString()) {
        buss = this.selectedBuss[index].code
      }
    }
    let idBuss;
    if (this.dataAddImagenOfertas.controls.business.value === 0) {
      idBuss = null;
    } else {
      idBuss = this.dataAddImagenOfertas.controls.business.value;
    }

    let datePublication = moment(this.datePublication).format("YYYY-MM-DD");
    let dateFinishPublication = moment(this.dateFinishPublication).format("YYYY-MM-DD");
    let hour = this.hourDate ? this.militaryHrFormat(this.hourDate) : "";
    let hourEnd = this.hourDateFinish ? this.militaryHrFormat(this.hourDateFinish) : "";

    const datestart = !this.visible ? `${datePublication} ${hour}:00` : ""
    const dateend = !this.visible && !this.undefinedDate ? `${dateFinishPublication} ${hourEnd}:00` : ""

    let datos: any = [{
      description: this.dataAddImagenOfertas.controls.nameContent.value,
      link: this.dataAddImagenOfertas.controls.link.value,
      idBusiness: idBuss,
      Business: buss,
      infoAditional: this.dataAddImagenOfertas.controls.comision.value,
      active: visible,
      type: "OFERTA",
      datestart,
      dateend
    }]

    if (this.idOfertas === 0) {
      datos = [{
        ...datos[0],
        imageWeb: this.fileImgCat,
        imageMobile: this.fileImgCat
      }]
    } else {
      if (this.fileImgCat != "") {
        datos = [{
          ...datos[0],
          id: this.idOfertas,
          imageWeb: this.fileImgCat,
          imageMobile: this.fileImgCat
        }]
      } else {
        datos = [{
          ...datos[0],
          id: this.idOfertas
        }]
      }

    }

    this.content.saveOfertBusiness(datos).subscribe((resp) => {
      this.dataAddImagenOfertas.reset()
      this.dialog.closeAll()
      this.getOffers();
    })

  }
  public selectAll() {
    if (this.selectAllVideosImg === "Seleccionar todos") {
      for (let i = 0; i < this.dataSource.length; i++) {
        this.dataSource[i].selected = true;
      }
      if (this.dataSource.length > 0) {
        this.active = true;
        this.selectAllVideosImg = "Deseleccionar todos";
      }
    } else {
      for (let i = 0; i < this.dataSource.length; i++) {
        this.dataSource[i].selected = false;
      }

      if (this.dataSource.length > 0) {
        this.active = false;
        this.selectAllVideosImg = "Seleccionar todos";
      }
    }
  }
  public loadDelete() {
    let index = []
    this.dataSource.forEach((content, i) => {
      if (content.selected === true) {
        index.push(i);
      }
    });
    if (index.length > 0) {
      this.active = true;
    } else {
      this.active = false;
    }
  }
  public loadDelete2() {
    let index = []
    this.dataSourceOfer.forEach((content, i) => {
      if (content.selected === true) {
        index.push(i);
      }
    });
    if (index.length > 0) {
      this.active2 = true;
    } else {
      this.active2 = false;
    }
  }
  public selectAllOfertas() {
    if (this.selectAllVideosImgOfer === "Seleccionar todos") {
      for (let i = 0; i < this.dataSourceOfer.length; i++) {
        this.dataSourceOfer[i].selected = true;
      }
      if (this.dataSourceOfer.length > 0) {
        this.active2 = true;
        this.selectAllVideosImgOfer = "Deseleccionar todos";
      }
    } else {
      for (let i = 0; i < this.dataSourceOfer.length; i++) {
        this.dataSourceOfer[i].selected = false;
      }

      if (this.dataSourceOfer.length > 0) {
        this.active2 = false;
        this.selectAllVideosImgOfer = "Seleccionar todos";
      }
    }
  }
  public deleteEveryOfertas() {
    Swal.fire({
      html: "<h3 class='delete-title-comision'>Eliminar Imagenes</h3> <p class='w-container'>¿Estás seguro de eliminar las imagenes seleccionadas?</p>",
      confirmButtonText: "Eliminar imagen",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonClass: "updateokdelete order-last",
      cancelButtonClass: "updatecancel",
      allowOutsideClick: false
    }).then((resp: any) => {
      if (resp.dismiss !== 'cancel') {
        //this.content.deleteOfer([element.id]).subscribe((resp) => {
        let datos = []
        for (let index = 0; index < this.dataSourceOfer.length; index++) {
          if (this.dataSourceOfer[index].selected === true) {
            datos.push(this.dataSourceOfer[index].id);
          }
        }
        this.content.deleteOfer(datos).subscribe((resp) => {
          this.getOffers();
          this.active2 = false;
        })

      }
    })
  }
  public deleteEvery() {
    Swal.fire({
      html: "<h3 class='delete-title-comision'>Eliminar Imagenes</h3> <p class='w-container'>¿Estás seguro de eliminar las imagenes seleccionadas?</p>",
      confirmButtonText: "Eliminar imagen",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonClass: "updateokdelete order-last",
      cancelButtonClass: "updatecancel",
      allowOutsideClick: false
    }).then((resp: any) => {
      if (resp.dismiss !== 'cancel') {
        //this.content.deleteOfer([element.id]).subscribe((resp) => {
        let datos = []
        for (let index = 0; index < this.dataSource.length; index++) {
          if (this.dataSource[index].selected === true) {
            datos.push(this.dataSource[index].id);
          }
        }
        this.content.deleteOfer(datos).subscribe((resp) => {
          this.getOffers();
          this.active = false;
        })

      }
    })
  }
  public onNoClick() {
    this.dataAddImagenOfertas.reset();
    this.dataAddImagen.reset();
    this.datePublication = null
    this.hourDate = null
    this.dateFinishPublication = null
    this.hourDateFinish = null
    this.undefinedDate = false
    this.dialog.closeAll();
  }

  public timeFormat(time) {
    let hour = time.split(':')[0];
    let minute = time.split(':')[1];

    if (hour >= 12) {
      if (hour == 12) {
        let h = hour
        let m = minute + ' P.M.'
        return h + ":" + m
      } else {
        let h = hour - 12
        let m = minute + ' P.M.'
        return h + ":" + m
      }

    } else {
      let h = parseInt(hour)
      return h + ':' + minute + ' A.M.'
    }
  }

  public militaryHrFormat(time) {
    let format = time.toString().split(" ")[1]
    let hour = time.toString().split(" ")[0].split(":")[0]
    if (hour == 12) {
      let hour = time.toString().split(" ")[0]
      return hour
    } else {
      if (format === 'PM') {
        let hour = time.toString().split(" ")[0]
        let h = parseInt(hour.split(":")[0]) + 12
        let m = hour.split(":")[1]
        return h + ":" + m
      } else {
        if (hour < 10) {
          let hour = 0 + time.toString().split(" ")[0]
          return hour
        }
        else {
          let hour = time.toString().split(" ")[0]
          return hour
        }
      }
    }
  }

  public formatDate(date) {
    const fDate = moment(date).format("DD/MM/YY");
    const hour = date.split("T");
    const formatHour = this.timeFormat(hour[1]);
    return `${fDate} ${formatHour}`
  }
}

