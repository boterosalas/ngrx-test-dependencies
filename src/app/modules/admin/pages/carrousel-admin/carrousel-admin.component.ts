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
  displayedColumns2: string[] = ['drag', 'image', 'nameContent', 'link', 'bussiness', 'comision', 'actions'];
  dataAddImagen: FormGroup;
  dataAddImagenOfertas: FormGroup;
  selectAllVideosImg: string = "Seleccionar todos";
  selectAllVideosImgOfer: string = "Seleccionar todos";
  active: boolean;
  active2: boolean;
  idCarousel: number = 0;
  idOfertas: number = 0;
  selected: any;
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
  @ViewChild('table', { static: false }) table: MatTable<PeriodicElement>;
  @ViewChild('table2', { static: false }) table2: MatTable<PeriodicElement2>;
  @ViewChild("templateAddImagenCarousel", { static: false }) templateAddImagenCarousel: TemplateRef<any>;
  @ViewChild("templateAddImagenOfertas", { static: false }) templateAddImagenOfertas: TemplateRef<any>;
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

  ngOnInit() {

    this.getOffers();
    this.getAllBusiness();
  }
  public getOffers() {
    this.content.getOffersbyType({ id: "CARROUSEL", admin: true }).subscribe((resp) => {
      console.log(resp)
      this.dataSource = resp;
      for (let index = 0; index < this.dataSource.length; index++) {
        this.dataSource[index].selected = false;
      }

    })
    this.content.getOffersbyType({ id: "OFERTA", admin: true }).subscribe((resp) => {

      this.dataSourceOfer = resp;
      for (let index = 0; index < this.dataSourceOfer.length; index++) {
        this.dataSourceOfer[index].selected = false;
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

  hourChange(horu, type) {
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

  dropTable(event: CdkDragDrop<PeriodicElement[]>) {
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
    //this.saveOrder(datosSourceSend)
  }
  dropTable2(event: CdkDragDrop<PeriodicElement[]>) {
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
  saveOrder(datos: any) {
    this.content.saveOrderOfertBusiness(datos).subscribe(resp => {
      //console.log(resp)
    })
  }
  private getExtension(nameFile: string, getSize: number) {
    let splitExt = nameFile.split(".");
    let getExt = splitExt[splitExt.length - 1].toLocaleLowerCase();
    this.validFormat = false;
    if (getExt === "jpg") {
      this.validFormat = true;
    }
    if (getSize / 1000 > 300) {
      this.validFormat = false;
    }
  }
  public onFileChangeFiles(event, param: string) {
    let nameFile = event.target.files[0].name;
    let reader = new FileReader();
    let sizeFile = event.target.files[0].size;
    let fileList: FileList = event.target.files;
    this.getExtension(fileList[0].name, fileList[0].size);
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      let fileBlob = new Blob([file]);
      let file2 = new File([fileBlob], nameFile);
      reader.readAsDataURL(file2);
      reader.onload = () => {
        this.getExtension(nameFile, sizeFile);
        if (this.validFormat === true) {
          this.fileImgCat = reader.result;
          this.fileImgCat = this.fileImgCat.split(",")[1]
          this.nameFileCert = nameFile;
          this.showErrorCert = false;
          this.activeButtonOfer = true;
          if (this.nameFileCert2 != "") {
            this.activebutton = true;
          } else {
            this.activebutton = false;
          }

        } else {
          this.showErrorCert = true;
          this.nameFileCert = nameFile;
          this.activebutton = false;
          this.activeButtonOfer = false;
        }
      };
    }
  }
  public onFileChangeFilesSecond(event, param: string) {
    let nameFile = event.target.files[0].name;
    let reader = new FileReader();
    let sizeFile = event.target.files[0].size;
    let fileList: FileList = event.target.files;
    this.getExtension(fileList[0].name, fileList[0].size);
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      let fileBlob = new Blob([file]);
      let file2 = new File([fileBlob], nameFile);
      reader.readAsDataURL(file2);
      reader.onload = () => {
        this.getExtension(nameFile, sizeFile);
        if (this.validFormat === true) {
          this.fileImgCat2 = reader.result;
          this.fileImgCat2 = this.fileImgCat2.split(",")[1]
          this.nameFileCert2 = nameFile;
          this.showErrorCert2 = false;
          if (this.nameFileCert != "") {
            this.activebutton = true;
          } else {
            this.activebutton = false;
          }
        } else {
          this.showErrorCert2 = true;
          this.nameFileCert2 = nameFile;
          this.activebutton = false;
        }
      };
    }
  }
  checkButton() {
    if (this.nameFileCert != "" && this.nameFileCert2 != "") {
      this.activebutton = true;
      this.activeButtonOfer = true;
    } else {
      this.activebutton = false;
      this.activeButtonOfer = false;
    }
  }
  editCarouselModal(element) {
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
    }
    
    this.visible = element.active

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

  activate(element) {
    let datos = [{ id: element.id, active: element.active }]
    this.content.saveActiveBanner(datos).subscribe((resp) => {

    })
  }
  editOfertasModal(element) {
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
    //this.idSaveTip = element.id;
    //this.dataEditTip.controls.title.setValue(element.title);
    //this.dataEditTip.controls.description.setValue(element.description);
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
  saveCarouselModal() {
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
  saveOfertasModal() {
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
  deleteComisionCarousel(element) {
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
  deleteComisionOferta(element) {
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
  saveImagenCarousel() {
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
  saveImagenOfertas() {
    let bussiness = this.dataAddImagenOfertas.controls.business.value;
    let datos;
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
    if (this.idOfertas === 0) {
      datos = [{
        description: this.dataAddImagenOfertas.controls.nameContent.value,
        link: this.dataAddImagenOfertas.controls.link.value,
        idBusiness: idBuss,
        Business: buss,
        infoAditional: this.dataAddImagenOfertas.controls.comision.value,
        active: 1,
        type: "OFERTA",
        imageWeb: this.fileImgCat,
        imageMobile: this.fileImgCat
      }]
    } else {
      if (this.fileImgCat != "") {
        datos = [{
          id: this.idOfertas,
          description: this.dataAddImagenOfertas.controls.nameContent.value,
          link: this.dataAddImagenOfertas.controls.link.value,
          idBusiness: idBuss,
          Business: buss,
          infoAditional: this.dataAddImagenOfertas.controls.comision.value,
          active: 1,
          type: "OFERTA",
          imageWeb: this.fileImgCat,
          imageMobile: this.fileImgCat
        }]
      } else {
        datos = [{
          id: this.idOfertas,
          description: this.dataAddImagenOfertas.controls.nameContent.value,
          link: this.dataAddImagenOfertas.controls.link.value,
          idBusiness: idBuss,
          Business: buss,
          infoAditional: this.dataAddImagenOfertas.controls.comision.value,
          active: 1,
          type: "OFERTA",

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
  selectAllOfertas() {
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
  deleteEveryOfertas() {
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
  deleteEvery() {
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
  onNoClick() {
    this.dataAddImagenOfertas.reset();
    this.dataAddImagen.reset();
    this.datePublication = null
    this.hourDate = null
    this.dateFinishPublication = null
    this.hourDateFinish = null
    this.dialog.closeAll();
  }

  public timeFormat(time) {
    let hour = time.split(':')[0];
    let minute = time.split(':')[1];

    if (hour >= 12) {
      if (hour == 12) {
        let h = hour
        let m = minute + ' PM'
        return h + ":" + m
      } else {
        let h = hour - 12
        let m = minute + ' PM'
        return h + ":" + m
      }

    } else {
      let h = parseInt(hour)
      return h + ':' + minute + ' AM'
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

  // checkInput(elemento) {
  //   this.disabledButtonEr = false;
  //   if (elemento === 'Cambio') {
  //     this.contadorDates += 1
  //   }
  //   if (this.dateForm.controls.contenido.value != "") {
  //     if (this.contadorDates > 1) {
  //       this.disabledButtonPu = false;
  //     } else {
  //       this.disabledButtonPu = true;
  //     }
  //   }
  //   if (this.nameFileCert === "") {
  //     this.disabledButtonPu = true;
  //     this.disabledButtonEr = true;
  //   }
  // }

  // checkAllDates() {
  //   if (this.dataAddImagen.controls.visible.value === true) {
  //     this.disabledButtonPu = false;
  //   } else {
  //     this.disabledButtonPu = true;
  //   }

  //   if (this.nameFileCert === "") {
  //     this.disabledButtonPu = true;
  //   }
  // }

}

