import { Component, OnInit } from "@angular/core";
import { animateText, onSideNavChange } from "src/app/animations/animations";
import { SidenavService } from "src/app/services/sidenav.service";

interface children {
  name: string;
  link: string;
}
interface Page {
  link: string;
  name: string;
  icon: string;
  children: children[];
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

  public pages: Page[] = [
    {
      name: "Torre de control",
      link: "www.google.com",
      icon: "home",
      children: [],
    },
    {
      name: "Mercadeo",
      link: "www.google.com",
      icon: "leaderboard",
      children: [
        { name: "Herramientas", link: "http://google.com" },
        { name: "Blog", link: "http://google.com" },
        { name: "Notificaciones", link: "http://google.com" },
      ],
    },
    {
      name: "Operación",
      link: "www.google.com",
      icon: "paid",
      children: [
        { name: "Herramientas", link: "http://google.com" },
        { name: "Blog", link: "http://google.com" },
        { name: "Notificaciones", link: "http://google.com" },
      ],
    },
    {
      name: "Configuración",
      link: "www.google.com",
      icon: "settings",
      children: [
        { name: "Herramientas", link: "http://google.com" },
        { name: "Blog", link: "http://google.com" },
        { name: "Notificaciones", link: "http://google.com" },
      ],
    },
  ];

  constructor(private _sidenavService: SidenavService) {}

  ngOnInit() {}

  onSinenavToggle() {
    this.sideNavState = !this.sideNavState;

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this._sidenavService.sideNavState$.next(this.sideNavState);
  }
}
