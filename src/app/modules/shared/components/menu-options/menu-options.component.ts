import { Component, OnInit, HostListener } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Subscription } from "rxjs";
import { UtilsService } from "src/app/services/utils.service";
import { LoaderService } from "src/app/services/loader.service";
import { distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-menu-options",
  templateUrl: "./menu-options.component.html",
  styleUrls: ["./menu-options.component.scss"]
})
export class MenuOptionsComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private utils: UtilsService,
    private loader: LoaderService
  ) {}

  options = [
    { name: "Inicio", route: "/inicio" },
    { name: "Click Academy", route: "/click-academy" },
    // { name: "Ofertas", route: "/ofertas" },
    { name: "Preguntas Frecuentes", route: "/preguntas-frecuentes" }
  ];

  isOpenMenu: boolean;
  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.showAnonymousMenu();
    this.showClickerMenu();
    this.showMobileMenu();
    this.showClickerMobile();
  }

  
  /**
   * metodos para mostrar los menus en escritorio
   */

  public showAnonymousMenu() {
    this.subscription = this.auth.menuInfo$
      .pipe(distinctUntilChanged())
      .subscribe(val => {
        this.options = val;
      });
  }

  public showClickerMenu() {
    this.subscription = this.auth.menuInfoClicker$
      .pipe(distinctUntilChanged())
      .subscribe(val => {
        this.options = val;
      });
  }

  /**
   * metodos para mostrar los menus en mobile
   */

  public showMobileMenu() {
    if (!this.auth.isLoggedIn()) {
      this.subscription = this.auth.getMenuMobile().subscribe(opt => {
        this.options = opt;
      });
    }
  }

  public showClickerMobile() {
    if (this.auth.isLoggedIn()) {
      this.subscription = this.auth.getMenuClickerMobile().subscribe(opt => {
        this.options = opt;
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener("over")
  hideMenu() {
    this.utils.hideMenu();
  }
}
