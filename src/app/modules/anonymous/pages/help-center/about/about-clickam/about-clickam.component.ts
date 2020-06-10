import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-clickam',
  templateUrl: './about-clickam.component.html',
  styleUrls: ['./about-clickam.component.scss']
})
export class AboutClickamComponent implements OnInit {

  aboutClickam = [
    {name:'¿Qué es Clickam?', route:'/centro-de-ayuda/que-es-clickam', icon:'/assets/img/ayuda/sobre-clickam/que-es.svg'},
    {name:'¿Cómo me puedo registrar?', route:'/centro-de-ayuda/como-me-puedo-registrar', icon:'/assets/img/ayuda/sobre-clickam/como-me-registro.svg'},
    {name:'¿Por cuáles medios puedo descargar la app?', route:'/centro-de-ayuda/por-cuales-medios-puedo-descargar-la-app', icon:'/assets/img/ayuda/sobre-clickam/descargar-app.svg'},
    {name:'¿Cómo funciona Clickam?', route:'/centro-de-ayuda/como-funciona-clickam', icon:'/assets/img/ayuda/sobre-clickam/como-funciona.svg'},
    {name:'¿Cómo gano comisiones?', route:'/centro-de-ayuda/como-gano-comisiones', icon:'/assets/img/ayuda/sobre-clickam/comisiones.svg'},
    {name:'¿Cuáles son los beneficios de ser un Clicker?', route:'/centro-de-ayuda/cuales-son-los-beneficios-de-un-clicker', icon:'/assets/img/ayuda/sobre-clickam/beneficios.svg'},
    {name:'¿Cuáles son los negocios asociados?', route:'/centro-de-ayuda/cuales-son-los-negocios-asociados', icon:'/assets/img/ayuda/sobre-clickam/negocios-asociados.svg'},
  ]

  constructor() { }

  ngOnInit() {
  }

}
