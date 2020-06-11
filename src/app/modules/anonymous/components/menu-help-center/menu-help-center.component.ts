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
      case "comisiones":
        this.step = 2;
        break;
      case "reportes":
        this.step = 3;
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

  commissions = [
    {
      name: "¿Qué es la ruta de compra Clickam?",
      route:
        "/centro-de-ayuda/comisiones/que-es-la-ruta-de-compra-clickam",
    },
    {
      name: "¿Cómo cruzan la venta?",
      route:
        "/centro-de-ayuda/comisiones/como-cruzan-la-venta",
    },
    {
      name: "¿Cuáles son las fechas de pago?",
      route:
        "/centro-de-ayuda/comisiones/cuales-son-las-fechas-de-pago",
    },
    {
      name: "¿Por qué no me llegó la comisión?",
      route:
        "/centro-de-ayuda/comisiones/porque-no-me-llego-la-comision",
    },
    {
      name: "¿Cómo es el proceso de pago?",
      route:
        "/centro-de-ayuda/comisiones/como-es-el-proceso-de-pago",
    },
    {
      name: "¿Cuándo se considera una compra efectiva por el negocio?",
      route:
        "/centro-de-ayuda/comisiones/cuando-se-considera-una-compra-efectiva-por-el-negocio",
    },
  ];

  reports = [
    {
      name: "¿Dónde puedo encontrar un historial de mis links?",
      route:
        "/centro-de-ayuda/reportes/donde-puedo-encontrar-un-historial-de-mis-links",
    },
    {
      name: "¿Cómo veo las comisiones que he ganado?",
      route:
        "/centro-de-ayuda/reportes/como-veo-las-comisiones-que-he-ganado",
    },
    {
      name: "¿Cómo puedo saber por cuales productos me pagaron comisión?",
      route:
        "/centro-de-ayuda/reportes/como-puedo-saber-por-cuales-productos-me-pagaron-comision",
    },
  ];

  ngOnInit() {}

  setStep(index: number) {
    this.step = index;
  }
}
