import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material';
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
  constructor() { }
  @ViewChild('table', { static: false }) table: MatTable<PeriodicElement>;
  @ViewChild('table2', { static: false }) table2: MatTable<PeriodicElement2>;
  dataSourceOfer = [{
    id: 1,
    orderby: 1,
    image: "https://live-realidad-aumentada.pantheonsite.io/sites/default/files/2020-10/freidoraoster%201407112_0.jpg",
    nameContent: "Freidora Oster 3%",
    link: "https://www.clickam.com.co/#/url/cdsagfair3",
    bussiness: "Almacenes Éxito",
    comision: "3%"
  }, {
    id: 2,
    orderby: 2,
    image: "https://live-realidad-aumentada.pantheonsite.io/sites/default/files/2020-10/smarttvsamsung%201734612_0.jpg",
    nameContent: "Freidora Oster 3%",
    link: "https://www.clickam.com.co/#/url/cdsagfair3",
    bussiness: "Almacenes Éxito",
    comision: "3%"
  }, {
    id: 3,
    orderby: 3,
    image: "https://live-realidad-aumentada.pantheonsite.io/sites/default/files/2020-10/neverahaceb1%201637150_0.jpg",
    nameContent: "Freidora Oster 3%",
    link: "https://www.clickam.com.co/#/url/cdsagfair3",
    bussiness: "Almacenes Éxito",
    comision: "3%"
  }, {
    id: 4,
    orderby: 4,
    image: "https://live-realidad-aumentada.pantheonsite.io/sites/default/files/2020-09/1revisacomisionesmobile.jpg",
    nameContent: "Freidora Oster 3%",
    link: "https://www.clickam.com.co/#/url/cdsagfair3",
    bussiness: "Almacenes Éxito",
    comision: "3%"
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
  //https://live-realidad-aumentada.pantheonsite.io/sites/default/files/2020-08/mobilebienvenida.jpg
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
    this.table.renderRows();
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
}
