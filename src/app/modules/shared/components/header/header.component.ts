import {
  Component,
  OnInit,
  HostListener,
  Input,
  OnDestroy
} from "@angular/core";
import { UtilsService } from "src/app/services/utils.service";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";
import { distinctUntilChanged } from "rxjs/operators";
import { Subscription } from "rxjs";
import { NavigationStart, Router } from "@angular/router";
import { TokenService } from "src/app/services/token.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() isHome: boolean;
  @Input() internal: boolean;
  isLoggedIn: any;

  firstNames: string;
  lastNames: string;
  initials: string;
  private subscription: Subscription = new Subscription();

  constructor(
    private utils: UtilsService,
    public auth: AuthService,
    private user: UserService,
    private router: Router,
    private token: TokenService,
  ) {}

  ngOnInit() {
 
    this.initialNameLastName();
   

    /**
     * metodo para verificar la url si es home para aplicar estilos en la cabezera
     */

    this.subscription = this.router.events.subscribe((url: any) => {
      if (url instanceof NavigationStart) {
        if (url.url === "/") {
          this.isHome = true;
          this.internal = false;
        } else {
          this.isHome = false;
          this.internal = true;
        }
      }
    });
  }

  /**
   * metodo para cerrar sesion
   */

  public logout() {
    this.utils.logout();
  }

  /**
   * Meotodo para formar las inciales del nombre y el apellido
   */

  public initialNameLastName() {
    this.subscription = this.user.userInfo$.subscribe(val => {
      if (val !== null) {
        const initialName = val.firstNames.charAt(0);
        const initialLastName = val.lastNames.charAt(0);
        this.initials = initialName + initialLastName;
      } else {
        this.auth.getRole$.subscribe(role => {
          if(role === 'CLICKER' || role === 'ADMIN') {
            this.subscription = this.user.getuserdata().subscribe(val => {
              const initialName = val.firstNames.charAt(0);
              const initialLastName = val.lastNames.charAt(0);
              this.initials = initialName + initialLastName;
             });
          }
        })
      }
    });
  }

  @HostListener("over")
  showLogin() {
    this.utils.showloginForm();
  }

  @HostListener("over")
  showMenu() {
    this.utils.showMenu();
  }

  @HostListener("over")
  openRegister() {
    this.utils.showRegisterForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
