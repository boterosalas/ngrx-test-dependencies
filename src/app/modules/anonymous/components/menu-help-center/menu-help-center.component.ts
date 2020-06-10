import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-help-center',
  templateUrl: './menu-help-center.component.html',
  styleUrls: ['./menu-help-center.component.scss']
})
export class MenuHelpCenterComponent implements OnInit {

  constructor() { }

  aboutClickam = [
    {name:'¿Qué es Clickam?', route:'/centro-de-ayuda/que-es-clickam'},
    {name:'¿Cómo me puedo registrar?', route:'/centro-de-ayuda/como-me-puedo-registrar'},
    {name:'¿Por cuáles medios puedo descargar la app?', route:'/centro-de-ayuda/por-cuales-medios-puedo-descargar-la-app'},
    {name:'¿Cómo funciona Clickam?', route:'/centro-de-ayuda/como-funciona-clickam'},
    {name:'¿Cómo gano comisiones?', route:'/centro-de-ayuda/como-gano-comisiones'},
    {name:'¿Cuáles son los beneficios de ser un Clicker?', route:'/centro-de-ayuda/cuales-son-los-beneficios-de-un-clicker'},
    {name:'¿Cuáles son los negocios asociados?', route:'/centro-de-ayuda/cuales-son-los-negocios-asociados'},
  ]

  configurations = [
    {name:'Cambios de tus datos personales', route:'/centro-de-ayuda/cambios-de-tus-datos-personales'},
    {name:'Restablecer contraseña', route:'/centro-de-ayuda/restablecer-contrasena'},
  ]

  ngOnInit() {
  }

}
