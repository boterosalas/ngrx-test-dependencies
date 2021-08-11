import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commission-clickam',
  templateUrl: './commission-clickam.component.html',
  styleUrls: ['./commission-clickam.component.scss'],
})
export class CommissionClickamComponent implements OnInit {
  commission = [
    {
      name: '¿Qué es la ruta de compra Clickam?',
      route: '/centro-de-ayuda/comisiones/que-es-la-ruta-de-compra-clickam',
      icon: '/assets/img/ayuda/comisiones/ruta-de-compra.svg',
    },
    {
      name: '¿Cómo cruzan la venta?',
      route: '/centro-de-ayuda/comisiones/como-cruzan-la-venta',
      icon: '/assets/img/ayuda/comisiones/como-se-cruzan-ventas.svg',
    },
    {
      name: '¿Cuáles son las fechas de pago?',
      route: '/centro-de-ayuda/comisiones/cuales-son-las-fechas-de-pago',
      icon: '/assets/img/ayuda/comisiones/fechas-de-pago.svg',
    },
    {
      name: '¿Por qué no me llegó la comisión?',
      route: '/centro-de-ayuda/comisiones/porque-no-me-llego-la-comision',
      icon: '/assets/img/ayuda/comisiones/comisiones-compras.svg',
    },
    {
      name: '¿Cómo es el proceso de pago?',
      route: '/centro-de-ayuda/comisiones/como-es-el-proceso-de-pago',
      icon: '/assets/img/ayuda/comisiones/proceso-de-pago.svg',
    },
    {
      name: '¿Cuándo se considera una compra efectiva por el negocio?',
      route: '/centro-de-ayuda/comisiones/cuando-se-considera-una-compra-efectiva-por-el-negocio',
      icon: '/assets/img/ayuda/comisiones/compra-efectiva.svg',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
