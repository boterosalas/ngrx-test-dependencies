import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "app-menu-help-center",
  templateUrl: "./menu-help-center.component.html",
  styleUrls: ["./menu-help-center.component.scss"],
})
export class MenuHelpCenterComponent implements OnInit {
  step: number = 0;

  constructor(location: Location) {
    let urlLocation = location.prepareExternalUrl(location.path());
    let SplitLocation = urlLocation.split("/");
    switch (SplitLocation[2]) {
      case "sobre-clickam":
        this.step = 0;
        break;
      case "configuraciones-de-cuenta":
        this.step = 1;
        break;

      default:
        this.step = 0;
        break;
    }
  }

  aboutClickam = [
    {
      name: "¿Qué es Clickam?",
      route: "/centro-de-ayuda/sobre-clickam/que-es-clickam",
    },
    {
      name: "¿Cómo me puedo registrar?",
      route: "/centro-de-ayuda/sobre-clickam/como-me-puedo-registrar",
    },
    {
      name: "¿Por cuáles medios puedo descargar la app?",
      route:
        "/centro-de-ayuda/sobre-clickam/por-cuales-medios-puedo-descargar-la-app",
    },
    {
      name: "¿Cómo funciona Clickam?",
      route: "/centro-de-ayuda/sobre-clickam/como-funciona-clickam",
    },
    {
      name: "¿Cómo gano comisiones?",
      route: "/centro-de-ayuda/sobre-clickam/como-gano-comisiones",
    },
    {
      name: "¿Cuáles son los beneficios de ser un Clicker?",
      route:
        "/centro-de-ayuda/sobre-clickam/cuales-son-los-beneficios-de-un-clicker",
    },
    {
      name: "¿Cuáles son los negocios asociados?",
      route: "/centro-de-ayuda/sobre-clickam/cuales-son-los-negocios-asociados",
    },
  ];

  configurations = [
    {
      name: "Cambios de tus datos personales",
      route:
        "/centro-de-ayuda/configuraciones-de-cuenta/cambios-de-tus-datos-personales",
    },
    {
      name: "Restablecer contraseña",
      route:
        "/centro-de-ayuda/configuraciones-de-cuenta/restablecer-contrasena",
    },
  ];

  ngOnInit() {}

  setStep(index: number) {
    this.step = index;
  }
}
