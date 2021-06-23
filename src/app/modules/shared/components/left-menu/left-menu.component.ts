import { Component, Input, OnInit } from "@angular/core";
import { animateText, onSideNavChange } from "src/app/animations/animations";
import { SidenavService } from "src/app/services/sidenav.service";
import { AuthService } from "src/app/services/auth.service";
import { Subscription } from "rxjs";

interface children {
  name: string;
  route: string;
  orderby: number;
}
interface Page {
  id: number;
  description: string;
  menus: children[];
}

@Component({
  selector: "app-left-menu",
  templateUrl: "./left-menu.component.html",
  styleUrls: ["./left-menu.component.scss"],
  animations: [onSideNavChange, animateText],
})
export class LeftMenuComponent implements OnInit {
  public sideNavState: boolean = false;
  public linkText: boolean = false;
  public itemSelected: string = "";
  @Input() name: string;

  public currentPages: Page[] = [];

  public pagesNoLogin: Page[] = [
    {
      id: 1,
      description: "Sin Grupo",
      menus: [
        {
          name: "Click Academy",
          route: "https://www.clickam.com.co/#/click-academy",
          orderby: 1,
        },
      ],
    },

    {
      id: 1,
      description: "Sin Grupo",
      menus: [
        {
          name: "Blog",
          route: "https://www.clickam.com.co/#/blog",
          orderby: 2,
        },
      ],
    },

    {
      id: 1,
      description: "Sin Grupo",
      menus: [
        {
          name: "Centro de Ayuda",
          route: "https://www.clickam.com.co/#/centro-de-ayuda",
          orderby: 3,
        },
      ],
    },

    {
      id: 1,
      description: "Sin Grupo",
      menus: [
        {
          name: "Tabla de Comisiones",
          route: "https://www.clickam.com.co/#/tabla-comisiones",
          orderby: 4,
        },
      ],
    },
  ];

  public pages: Page[] = [
    {
      id: 1,
      description: "Sin Grupo",
      menus: [
        {
          name: "Torre de Control",
          route: "/dashboard",
          orderby: 0,
        },
      ],
    },
    {
      id: 5,
      description: "Sin Grupo",
      menus: [
        {
          name: "Negocios",
          route: "/dashboard",
          orderby: 0,
        },
      ],
    },
    {
      id: 2,
      description: "Mercadeo",
      menus: [
        {
          name: "Negocios",
          route: "/negocios-admin",
          orderby: 0,
        },
        {
          name: "Blog",
          route: "/blog-admin",
          orderby: 0,
        },
        {
          name: "Generador de Links",
          route: "/generador-links",
          orderby: 0,
        },
        {
          name: "Herramientas",
          route: "/carrousel-admin",
          orderby: 0,
        },
      ],
    },
    {
      id: 3,
      description: "Operación",
      menus: [
        {
          name: "Reportes",
          route: "/reportes-admin",
          orderby: 0,
        },
        {
          name: "Usuarios",
          route: "/usuarios",
          orderby: 0,
        },
        {
          name: "Referidos",
          route: "/referidos-admin",
          orderby: 0,
        },
        {
          name: "Novedades",
          route: "/novedades",
          orderby: 0,
        },
        {
          name: "Comisiones",
          route: "/comisiones",
          orderby: 0,
        },
      ],
    },
    {
      id: 4,
      description: "Configuración",
      menus: [
        {
          name: "Auditoría",
          route: "/auditoria",
          orderby: 0,
        },
        {
          name: "Legales",
          route: "/legales",
          orderby: 0,
        },
        {
          name: "Permisos",
          route: "/configuracion",
          orderby: 0,
        },
        {
          name: "Navegación",
          route: "/navegacion",
          orderby: 0,
        },
      ],
    },
  ];

  private subscription: Subscription = new Subscription();

  constructor(
    private _sidenavService: SidenavService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.getMenu();
  }

  getMenu() {
    this.subscription = this.auth.getMenu$.subscribe((val) => {
      console.log(`menu`, val);
      this.currentPages = val;
    });
  }

  onSinenavToggle() {
    this.sideNavState = !this.sideNavState;

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this._sidenavService.sideNavState$.next(this.sideNavState);
  }

  setItemSelected(page) {
    this.itemSelected = page;
  }
}
