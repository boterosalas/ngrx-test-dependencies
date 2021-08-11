import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offers-clickam',
  templateUrl: './offers-clickam.component.html',
  styleUrls: ['./offers-clickam.component.scss'],
})
export class OffersClickamComponent implements OnInit {
  offers = [
    {
      name: '¿Dónde puedo encontrar las mejores ofertas?',
      route:
        '/centro-de-ayuda/ofertas/donde-puedo-encontrar-las-mejores-ofertas',
      icon: '/assets/img/ayuda/ofertas/ofertas.svg',
    },
    {
      name: 'Preferencias de correo',
      route: '/centro-de-ayuda/ofertas/preferencias-de-correo',
      icon: '/assets/img/ayuda/ofertas/preferencias-correo.svg',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
