import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { OnboardingSwiperComponent } from 'src/app/modules/shared/components/onboarding-swiper/onboarding-swiper.component';

@Component({
  selector: 'app-menu-help-center',
  templateUrl: './menu-help-center.component.html',
  styleUrls: ['./menu-help-center.component.scss'],
})
export class MenuHelpCenterComponent implements OnInit {
  step = 0;
  token = localStorage.getItem('ACCESS_TOKEN');
  authorization = this.token;
  reportVisible: boolean;
  constructor(location: Location, private dialog: MatDialog) {
    const urlLocation = location.prepareExternalUrl(location.path());
    const SplitLocation = urlLocation.split('/');
    switch (SplitLocation[2]) {
      case 'sobre-clickam':
        this.step = 0;
        break;
      case 'configuraciones-de-cuenta':
        this.step = 1;
        break;
      case 'comisiones':
        this.step = 2;
        break;
      case 'reportes':
        this.step = 3;
        break;
      case 'refiere-a-un-amigo':
        this.step = 4;
        break;
      case 'ofertas':
        this.step = 5;
        break;
      case 'otras-preguntas-frecuentes':
        this.step = 6;
        break;
      case 'contacta-los-negocios':
        this.step = 7;
        break;
      case 'contactanos':
        this.step = 8;
        break;
      case 'reportar':
        this.step = 9;
        break;
      default:
        this.step = 0;
        break;
    }
  }

  aboutClickam = [
    {
      name: '¿Qué es Clickam?',
      route: '/centro-de-ayuda/sobre-clickam/que-es-clickam',
      class: 'queesclickam',
    },
    {
      name: '¿Cómo me puedo registrar?',
      route: '/centro-de-ayuda/sobre-clickam/como-me-puedo-registrar',
      class: 'comomepuedoregistrar',
    },
    {
      name: '¿Por cuáles medios puedo descargar la app?',
      route: '/centro-de-ayuda/sobre-clickam/por-cuales-medios-puedo-descargar-la-app',
      class: 'porcualesmediospuedodescargarlaapp',
    },
    {
      name: '¿Cómo funciona Clickam?',
      route: '/centro-de-ayuda/sobre-clickam/como-funciona-clickam',
      class: 'comofuncionaclickam',
    },
    {
      name: '¿Cómo gano comisiones?',
      route: '/centro-de-ayuda/sobre-clickam/como-gano-comisiones',
      class: 'comoganocomisiones',
    },
    {
      name: '¿Cuáles son los beneficios de ser un Clicker?',
      route: '/centro-de-ayuda/sobre-clickam/cuales-son-los-beneficios-de-un-clicker',
      class: 'cualessonlosbeneficiosdeserunclicker',
    },
    {
      name: '¿Cuáles son los negocios asociados?',
      route: '/centro-de-ayuda/sobre-clickam/cuales-son-los-negocios-asociados',
      class: 'cualessonlosnegociosasociados',
    },
  ];

  configurations = [
    {
      name: 'Cambios de tus datos personales',
      route: '/centro-de-ayuda/configuraciones-de-cuenta/cambios-de-tus-datos-personales',
      class: 'cambiosdetusdatospersonales',
    },
    {
      name: 'Restablecer contraseña',
      route: '/centro-de-ayuda/configuraciones-de-cuenta/restablecer-contrasena',
      class: 'restablecercontrasena',
    },
  ];

  commissions = [
    {
      name: '¿Qué es la ruta de compra Clickam?',
      route: '/centro-de-ayuda/comisiones/que-es-la-ruta-de-compra-clickam',
      class: 'queeslarutadecompraclickam',
    },
    {
      name: '¿Cómo cruzan la venta?',
      route: '/centro-de-ayuda/comisiones/como-cruzan-la-venta',
      class: 'comocruzanlaventa',
    },
    {
      name: '¿Cuáles son las fechas de pago?',
      route: '/centro-de-ayuda/comisiones/cuales-son-las-fechas-de-pago',
      class: 'cualessonlasfechasdepago',
    },
    {
      name: '¿Por qué no me llegó la comisión?',
      route: '/centro-de-ayuda/comisiones/porque-no-me-llego-la-comision',
      class: 'porquenomellegolacomision',
    },
    {
      name: '¿Cómo es el proceso de pago?',
      route: '/centro-de-ayuda/comisiones/como-es-el-proceso-de-pago',
      class: 'comoeselprocesodepago',
    },
    {
      name: '¿Cuándo se considera una compra efectiva por el negocio?',
      route: '/centro-de-ayuda/comisiones/cuando-se-considera-una-compra-efectiva-por-el-negocio',
      class: 'cuandoseconsideraunacompraefectivaporelnegocio',
    },
  ];

  reports = [
    {
      name: '¿Dónde puedo encontrar un historial de mis links?',
      route: '/centro-de-ayuda/reportes/donde-puedo-encontrar-un-historial-de-mis-links',
      class: 'dondepuedoencontrarunhistorialdemislinks',
    },
    {
      name: '¿Cómo veo las comisiones que he ganado?',
      route: '/centro-de-ayuda/reportes/como-veo-las-comisiones-que-he-ganado',
      class: 'comoveolascomisionesqueheganado',
    },
    {
      name: '¿Cómo puedo saber por cuales productos me pagaron comisión?',
      route: '/centro-de-ayuda/reportes/como-puedo-saber-por-cuales-productos-me-pagaron-comision',
      class: 'comopuedosaberporcualesproductosmepagaroncomision',
    },
  ];

  refer = [
    {
      name: '¿Qué es el programa refiere a tu amigo?',
      route: '/centro-de-ayuda/refiere-a-un-amigo/que-es-el-programa-refiere-a-tu-amigo',
      class: 'queeselprogramarefiereatuamigo',
    },
    {
      name: '¿Cómo funciona el programa?',
      route: '/centro-de-ayuda/refiere-a-un-amigo/como-funciona-el-programa',
      class: 'comofuncionaelprograma',
    },
    {
      name: '¿Cuántos amigos puedo invitar?',
      route: '/centro-de-ayuda/refiere-a-un-amigo/cuantos-amigos-puedo-invitar',
      class: 'cuantosamigospuedoinvitar',
    },
  ];

  offers = [
    {
      name: '¿Dónde puedo encontrar las mejores ofertas?',
      route: '/centro-de-ayuda/ofertas/donde-puedo-encontrar-las-mejores-ofertas',
      class: 'dondepuedoencontrarlasmejoresofertas',
    },
    {
      name: 'Preferencias de correo',
      route: '/centro-de-ayuda/ofertas/preferencias-de-correo',
      class: 'preferenciasdecorreo',
    },
  ];

  questions = [
    {
      name: '¿Quién es el tomador de un seguro?',
      route: '/centro-de-ayuda/otras-preguntas-frecuentes/quien-es-el-tomador-de-un-seguro',
      class: 'quieneseltomadordeunseguro',
    },
    {
      name: '¿Qué es un producto Marketplace?',
      route: '/centro-de-ayuda/otras-preguntas-frecuentes/que-es-un-producto-marketplace',
      class: 'queesunproductomarketplace',
    },
    {
      name: '¿Cuáles son los medios de pago de cada negocio?',
      route: '/centro-de-ayuda/otras-preguntas-frecuentes/cuales-son-los-medios-de-pago-de-cada-negocio',
      class: 'cualessonlosmediosdepagodecadanegocio',
    },
  ];

  contacts = [
    {
      name: 'Contactos',
      route: '/centro-de-ayuda/contacta-los-negocios/contactos-negocios',
      class: 'contactos',
    },
  ];

  contactUs = [
    {
      name: 'Dónde puedo contactarme si tengo preguntas extras',
      route: '/centro-de-ayuda/contactanos/donde-puedo-contactarme-si-tengo-preguntas-extras',
      class: 'dondepuedocontactarmesitengopreguntasextras',
    },
  ];
  report = [
    {
      name: 'Reportar novedad',
      route: '/centro-de-ayuda/reportar/novedad',
      class: 'reportar',
    },
    {
      name: 'Estado de novedades',
      route: '/centro-de-ayuda/reportar/estado-novedades',
      class: 'estadonovedades',
    },
  ];

  ngOnInit() {
    if (this.authorization) {
      this.reportVisible = true;
    } else {
      this.reportVisible = false;
    }
  }

  setStep(index: number) {
    this.step = index;
  }

  /**
   * Muestra el onboarding
   */
  showOnboarding(): void {
    this.dialog.open(OnboardingSwiperComponent, { panelClass: 'panel-class-onboarding' });
  }
}
