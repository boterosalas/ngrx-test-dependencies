import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuration-account',
  templateUrl: './configuration-account.component.html',
  styleUrls: ['./configuration-account.component.scss']
})
export class ConfigurationAccountComponent implements OnInit {

  aboutClickam = [
    {name:'Cambios de tus datos personales', route:'/centro-de-ayuda/configuraciones-de-cuenta/cambios-de-tus-datos-personales', icon:'/assets/img/ayuda/configuracion-cuenta/datos-personales.svg'},
    {name:'Restablecer contraseña', route:'/centro-de-ayuda/configuraciones-de-cuenta/restablecer-contrasena', icon:'/assets/img/ayuda/configuracion-cuenta/restablecer-contrasena.svg'},
  ]

  constructor() { }

  ngOnInit() {
  }

}
