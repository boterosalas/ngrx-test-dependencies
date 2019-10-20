import { Component, OnInit, HostListener, OnChanges, DoCheck, Input } from "@angular/core";
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

  options = [];

  @Input() colfooter;
  @Input() aligment;

  isOpenMenu: boolean;
  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.getMenu()
  }

  /**
   * Metodo para obtener los menus
   */
  
  public getMenu () {
    this.auth.getMenu$.subscribe(val => {
      this.options = val;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener("over")
  hideMenu() {
    this.utils.hideMenu();
  }
}
