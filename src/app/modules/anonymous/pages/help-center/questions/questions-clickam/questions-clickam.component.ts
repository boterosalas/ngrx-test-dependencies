import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questions-clickam',
  templateUrl: './questions-clickam.component.html',
  styleUrls: ['./questions-clickam.component.scss'],
})
export class QuestionsClickamComponent implements OnInit {
  questions = [
    {
      name: '¿Quién es el tomador de un seguro?',
      route: '/centro-de-ayuda/otras-preguntas-frecuentes/quien-es-el-tomador-de-un-seguro',
      icon: '/assets/img/ayuda/otras-preguntas/seguro.svg',
    },
    {
      name: '¿Qué es un producto Marketplace?',
      route: '/centro-de-ayuda/otras-preguntas-frecuentes/que-es-un-producto-marketplace',
      icon: '/assets/img/ayuda/otras-preguntas/marketplace.svg',
    },
    {
      name: '¿Cuáles son los medios de pago de cada negocio?',
      route: '/centro-de-ayuda/otras-preguntas-frecuentes/cuales-son-los-medios-de-pago-de-cada-negocio',
      icon: '/assets/img/ayuda/otras-preguntas/medios-de-pago.svg',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
