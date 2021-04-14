import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatTable } from '@angular/material';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
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
  constructor(
    private dialog: MatDialog,
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

  fileImgCat2: any = "";
  nameFileCert2: string = '';
  showErrorCert2: boolean;
  activebutton: boolean;
  validFormat: boolean;
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
        idbusiness: this.dataSourceOfer[i].id,
        order: i + 1
      })
    }
    //this.saveOrder(datosSourceSend)
  }
  private getExtension(nameFile: string, getSize: number) {
    let splitExt = nameFile.split(".");
    let getExt = splitExt[splitExt.length - 1].toLocaleLowerCase();
    this.validFormat = false;
    if (getExt === "jpg") {
      this.validFormat = true;
    }
    if (getSize / 1000 > 250) {
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
  saveCarouselModal() {
    const title = "Nueva Imagen";
    const idBussiness = 1;
    const edit = 0;
    const template = this.templateAddImagenCarousel;
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
        console.log(element)
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
        console.log(element)
      }
    })
  }
  saveImagenCarousel() {
    console.log("Enviando post");
  }
  saveImagenOfertas() {
    console.log("Enviando post ofertas");
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
}
