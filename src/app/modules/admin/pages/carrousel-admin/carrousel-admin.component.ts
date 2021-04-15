import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatTable } from '@angular/material';
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
      visible: [false],
      image: [null],
      image2: [null],


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
  dataSourceOfer = [{
    id: 1,
    orderby: 1,
    image: "https://live-realidad-aumentada.pantheonsite.io/sites/default/files/2020-10/freidoraoster%201407112_0.jpg",
    nameContent: "Freidora Oster 3%",
    link: "https://www.clickam.com.co/#/url/cdsagfair3",
    bussiness: "Almacenes Éxito",
    comision: "3%",
    selected: false
  }, {
    id: 2,
    orderby: 2,
    image: "https://live-realidad-aumentada.pantheonsite.io/sites/default/files/2020-10/smarttvsamsung%201734612_0.jpg",
    nameContent: "Freidora Oster 3%",
    link: "https://www.clickam.com.co/#/url/cdsagfair3",
    bussiness: "Almacenes Éxito",
    comision: "3%",
    selected: false
  }, {
    id: 3,
    orderby: 3,
    image: "https://live-realidad-aumentada.pantheonsite.io/sites/default/files/2020-10/neverahaceb1%201637150_0.jpg",
    nameContent: "Freidora Oster 3%",
    link: "https://www.clickam.com.co/#/url/cdsagfair3",
    bussiness: "Almacenes Éxito",
    comision: "3%",
    selected: false
  }, {
    id: 4,
    orderby: 4,
    image: "https://live-realidad-aumentada.pantheonsite.io/sites/default/files/2020-09/1revisacomisionesmobile.jpg",
    nameContent: "Freidora Oster 3%",
    link: "https://www.clickam.com.co/#/url/cdsagfair3",
    bussiness: "Almacenes Éxito",
    comision: "3%",
    selected: false
  }]
  dataSource = [{
    id: 1,
    orderby: 1,
    imagenWeb: "https://live-realidad-aumentada.pantheonsite.io/sites/default/files/2021-04/Web-banner-bienvenido-Marketplace.jpg",
    imagenMobile: "https://live-realidad-aumentada.pantheonsite.io/sites/default/files/2021-04/Mobile-banner-bienvenido-Marketplace.jpg",
    nameContent: "Actualización Viajes Éxito",
    link: "https://www.clickam.com.co/#/url/cdsagfair3",
    bussiness: "Viajes Exito",
    comision: "Hasta el 5.3%",
    active: true,
    selected: true,
  },
  {
    id: 2,
    orderby: 2,
    imagenWeb: "https://live-realidad-aumentada.pantheonsite.io/sites/default/files/2021-03/bannerwebpagosmensuales.jpg",
    imagenMobile: "https://live-realidad-aumentada.pantheonsite.io/sites/default/files/2021-03/bannermobilepagosmensuales.jpg",
    nameContent: "Actualización Viajes Éxito",
    link: "https://www.clickam.com.co/#/url/cdsagfair3",
    bussiness: "Viajes Exito",
    comision: "Hasta el 5.3%",
    active: true,
    selected: true,
  },
  {
    id: 3,
    orderby: 3,
    imagenWeb: "https://live-realidad-aumentada.pantheonsite.io/sites/default/files/2021-03/websoatgenerico.jpg",
    imagenMobile: "https://live-realidad-aumentada.pantheonsite.io/sites/default/files/2021-03/mobilesoatgenerico.jpg",
    nameContent: "Actualización Viajes Éxito",
    link: "https://www.clickam.com.co/#/url/cdsagfair3",
    bussiness: "Viajes Exito",
    comision: "Hasta el 5.3%",
    active: true,
    selected: true,
  },
  {
    id: 4,
    orderby: 4,
    imagenWeb: "https://live-realidad-aumentada.pantheonsite.io/sites/default/files/2021-02/bannerwebcomunicadoviajes.jpg",
    imagenMobile: "https://live-realidad-aumentada.pantheonsite.io/sites/default/files/2021-02/bannermobilecomunicadoviajes.jpg",
    nameContent: "Actualización Viajes Éxito",
    link: "https://www.clickam.com.co/#/url/cdsagfair3",
    bussiness: "Viajes Exito",
    comision: "Hasta el 5.3%",
    active: true,
    selected: true,
  }
    ,
  {
    id: 5,
    orderby: 5,
    imagenWeb: "https://live-realidad-aumentada.pantheonsite.io/sites/default/files/2020-08/webbienvenida.jpg",
    imagenMobile: "https://live-realidad-aumentada.pantheonsite.io/sites/default/files/2020-08/mobilebienvenida.jpg",
    nameContent: "Actualización Viajes Éxito",
    link: "https://www.clickam.com.co/#/url/cdsagfair3",
    bussiness: "Viajes Exito",
    comision: "Hasta el 5.3%",
    active: true,
    selected: true,
  }]
  ngOnInit() {

    this.content.getOffersbyType("OFERTA").subscribe((resp) => {
      console.log(resp)
    })
    this.content.getOffersbyType("CARROUSEL").subscribe((resp) => {
      console.log(resp)
    })
    this.getAllBusiness();
  }
  public getAllBusiness() {
    this.content.getAllBusiness().subscribe(resp => {
      this.selectedBuss = resp;
    })

  }

  dropTable(event: CdkDragDrop<PeriodicElement[]>) {
    const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
    this.table.renderRows();
    let datosSourceSend = []
    for (let i = 0; i < this.dataSource.length; i++) {
      this.dataSource[i].orderby = i + 1
      datosSourceSend.push({
        idbusiness: this.dataSource[i].id,
        order: i + 1
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
          if (this.nameFileCert2 != "") {
            this.activebutton = true;
          } else {
            this.activebutton = false;
          }

        } else {
          this.showErrorCert = true;
          this.nameFileCert = nameFile;
          this.activebutton = false;
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
  editCarouselModal(element) {
    const title = "Editar Imagen";
    const idBussiness = 1;
    const edit = 0;
    const template = this.templateAddImagenCarousel;
    this.dataAddImagen.controls.nameContent.setValue(element.nameContent)
    this.dataAddImagen.controls.link.setValue(element.link)
    this.dataAddImagen.controls.business.setValue(element.business)
    this.dataAddImagen.controls.comision.setValue(element.comision)
    this.idCarousel = element.id;

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
  editOfertasModal(element) {
    const title = "Editar Imagen";
    const idBussiness = 1;
    const edit = 0;
    const template = this.templateAddImagenOfertas;
    this.dataAddImagenOfertas.controls.nameContent.setValue(element.nameContent)
    this.dataAddImagenOfertas.controls.link.setValue(element.link)
    this.dataAddImagenOfertas.controls.business.setValue(element.business)
    this.dataAddImagenOfertas.controls.comision.setValue(element.comision)
    this.idCarousel = element.id;

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
  saveOfertasModal() {
    const title = "Nueva Imagen";
    const idBussiness = 1;
    const edit = 0;
    const template = this.templateAddImagenOfertas;
    this.idOfertas = 0;
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

        })
      }
    })
  }
  saveImagenCarousel() {
    let visible = 0;
    if (this.dataAddImagen.controls.visible.value) {
      visible = 1;
    } else {
      visible = 0;
    }
    //let bussiness = this.business;
    let datos;
    if (this.idCarousel === 0) {
      datos = [{
        description: this.dataAddImagen.controls.nameContent.value,
        link: this.dataAddImagen.controls.link.value,
        idBusiness: this.dataAddImagen.controls.business.value,
        //business: bussiness.code,
        infoAditional: this.dataAddImagen.controls.comision.value,
        active: visible,
        imageWeb: this.fileImgCat,
        imageMobile: this.fileImgCat2,
        //CARROUSEL
        type: "CARROUSEL",
      }]
    } else {
      datos = [{
        id: this.idCarousel,
        description: this.dataAddImagen.controls.nameContent.value,
        link: this.dataAddImagen.controls.link.value,
        idBusiness: this.dataAddImagen.controls.business.value,
        //business: bussiness.code,
        infoAditional: this.dataAddImagen.controls.comision.value,
        active: visible,
        imageWeb: this.fileImgCat,
        imageMobile: this.fileImgCat2,
        //CARROUSEL
        type: "CARROUSEL",
      }]
    }

    this.content.saveOfertBusiness(datos).subscribe((resp) => {
      this.dataAddImagen.reset()
      this.dialog.closeAll()
    })
  }
  saveImagenOfertas() {
    let bussiness = this.business;
    let datos;
    if (this.idOfertas === 0) {
      datos = [{
        description: this.dataAddImagenOfertas.controls.nameContent.value,
        link: this.dataAddImagenOfertas.controls.link.value,
        idBusiness: this.dataAddImagenOfertas.controls.business.value,
        //business: bussiness.code,
        infoAditional: this.dataAddImagenOfertas.controls.comision.value,
        active: 1,
        type: "OFERTA",
        imageWeb: this.fileImgCat
      }]
    } else {
      datos = [{
        id: this.idOfertas,
        description: this.dataAddImagenOfertas.controls.nameContent.value,
        link: this.dataAddImagenOfertas.controls.link.value,
        idBusiness: this.dataAddImagenOfertas.controls.business.value,
        //business: bussiness.code,
        infoAditional: this.dataAddImagenOfertas.controls.comision.value,
        active: 1,
        type: "OFERTA",
        imageWeb: this.fileImgCat
      }]
    }

    this.content.saveOfertBusiness(datos).subscribe((resp) => {
      this.dataAddImagenOfertas.reset()
      this.dialog.closeAll()
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

        })

      }
    })
  }

}
