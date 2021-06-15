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
  childrens: children[];
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
      childrens: [],
    },
    {
      name: "Mercadeo",
      link: "www.google.com",
      icon: "leaderboard",
      childrens: [{ name: "Herramientas", link: "http://google.com" }],
    },
    {
      name: "Operación",
      link: "www.google.com",
      icon: "paid",
      childrens: [{ name: "Herramientas2", link: "http://google.com" }],
    },
    {
      name: "Configuración",
      link: "www.google.com",
      icon: "settings",
      childrens: [{ name: "Herramientas3", link: "http://google.com" }],
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
