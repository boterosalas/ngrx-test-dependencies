import { Component, OnInit, HostListener, OnChanges, DoCheck, Input, OnDestroy } from "@angular/core";
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
export class MenuOptionsComponent implements OnInit, OnDestroy {
  constructor(
    public auth: AuthService,
    private utils: UtilsService,
    private loader: LoaderService
  ) {}

  options = [];

  @Input() colfooter;
  @Input() aligmentdesktop = 'center center';
  @Input() aligment;
  @Input() layoutxs = "row";
  @Input() layoutmd = "column";
  @Input() showIcon = false;
  @Input() icon:string;
  @Input() section:string="menuTop";

  isOpenMenu: boolean;
  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.getMenu()
  }

  /**
   * Metodo para obtener los menus
   */
  
  public getMenu () {
   this.subscription = this.auth.getMenu$.subscribe(val => {
      this.options = val;
    })
  }

  @HostListener("over")
  hideMenu() {
    this.utils.hideMenu();
  }

   /**
   * metodo para cerrar sesion
   */

  public logout() {
    this.utils.logout();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
