import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commission-clickam',
  templateUrl: './commission-clickam.component.html',
  styleUrls: ['./commission-clickam.component.scss'],
})
export class CommissionClickamComponent implements OnInit {
  commission = [
    {
      title: '¿Qué es la ruta de compra Clickam?',
      internalRoute: '/centro-de-ayuda/comisiones/que-es-la-ruta-de-compra-clickam',
      comissionIcon: '/assets/img/ayuda/comisiones/ruta-de-compra.svg',
    },
    {
      title: '¿Cómo cruzan la venta?',
      internalRoute: '/centro-de-ayuda/comisiones/como-cruzan-la-venta',
      comissionIcon: '/assets/img/ayuda/comisiones/como-se-cruzan-ventas.svg',
    },
    {
      title: '¿Cuáles son las fechas de pago?',
      internalRoute: '/centro-de-ayuda/comisiones/cuales-son-las-fechas-de-pago',
      comissionIcon: '/assets/img/ayuda/comisiones/fechas-de-pago.svg',
    },
    {
      title: '¿Por qué no me llegó la comisión?',
      internalRoute: '/centro-de-ayuda/comisiones/porque-no-me-llego-la-comision',
      comissionIcon: '/assets/img/ayuda/comisiones/comisiones-compras.svg',
    },
    {
      title: '¿Cómo es el proceso de pago?',
      internalRoute: '/centro-de-ayuda/comisiones/como-es-el-proceso-de-pago',
      comissionIcon: '/assets/img/ayuda/comisiones/proceso-de-pago.svg',
    },
    {
      title: '¿Cuándo se considera una compra efectiva por el negocio?',
      internalRoute: '/centro-de-ayuda/comisiones/cuando-se-considera-una-compra-efectiva-por-el-negocio',
      comissionIcon: '/assets/img/ayuda/comisiones/compra-efectiva.svg',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
