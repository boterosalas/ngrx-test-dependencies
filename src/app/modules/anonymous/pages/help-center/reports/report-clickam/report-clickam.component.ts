import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-clickam',
  templateUrl: './report-clickam.component.html',
  styleUrls: ['./report-clickam.component.scss'],
})
export class ReportClickamComponent implements OnInit {
  reportClickam = [
    {
      name: '¿Dónde puedo encontrar un historial de mis links?',
      route:
        '/centro-de-ayuda/reportes/donde-puedo-encontrar-un-historial-de-mis-links',
      icon: '/assets/img/ayuda/reportes/historial.svg',
    },
    {
      name: '¿Cómo veo las comisiones que he ganado?',
      route: '/centro-de-ayuda/reportes/como-veo-las-comisiones-que-he-ganado',
      icon: '/assets/img/ayuda/reportes/reportes.svg',
    },
    {
      name: '¿Cómo puedo saber por cuales productos me pagaron comisión?',
      route:
        '/centro-de-ayuda/reportes/como-puedo-saber-por-cuales-productos-me-pagaron-comision',
      icon: '/assets/img/ayuda/reportes/productos.svg',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
