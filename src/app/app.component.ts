import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  HostListener,
  OnDestroy,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";
import {
  trigger,
  state,
  style,
  transition,
  group,
  animate,
} from "@angular/animations";
import { UtilsService } from "./services/utils.service";
import { Subscription } from "rxjs";
import { AuthService } from "./services/auth.service";
import { BnNgIdleService } from "bn-ng-idle";
import Swal from "sweetalert2";
import { BreakpointObserver } from "@angular/cdk/layout";
import { UserService } from "./services/user.service";
import { ContentService } from './services/content.service';
import { TokenService } from "./services/token.service";
import { SwUpdate } from "@angular/service-worker";
declare var dataLayer: any;
import { PopupComponent } from "./modules/shared/components/popup/popup.component";
import { Location } from "@angular/common";
import { MatDialog } from '@angular/material';
import decode from "jwt-decode";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [
    trigger("openClose", [
      state("in", style({ height: "*", opacity: 0 })),
      transition(":leave", [
        style({ height: "*", opacity: 1 }),

        group([
          animate(300, style({ height: 0 })),
          animate(
            "600ms ease-in-out",
            style({ transform: "translateY(-1000px)" })
          ),
        ]),
      ]),
    ]),
    trigger("slideInOut", [
      state("in", style({ height: "*", opacity: 1 })),
      transition(":leave", [
        style({ height: "*", opacity: 1 }),

        group([
          animate(300),
          animate(
            "600ms ease-in-out",
            style({ transform: "translateX(1000px)" })
          ),
        ]),
      ]),
    ]),
    trigger("simpleFadeAnimation", [
      // the "in" style determines the "resting" state of the element when it is visible.
      state("in", style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(":enter", [style({ opacity: 0 }), animate(600)]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(":leave", animate(600, style({ opacity: 0 }))),
    ]),
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  // isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Web)
  // .pipe(
  //   map(result => result.matches),
  //   shareReplay()
  // );

  @ViewChild(
    "templateCardLogin, TemplateCardRegister, TemplateCardForgot, templateCardActivate",
    {
      static: false,
    }
  )
  template: TemplateRef<any>;
  isHome: boolean;
  internal: boolean;
  showLoginForm: boolean;
  showRegisterForm: boolean;
  showForgotForm: boolean;
  showActivateForm: boolean;
  isOpen = false;
  isOpenMenu = false;
  private subscription: Subscription = new Subscription();
  innerWidth: number;
  showAnimation1: boolean;
  showAnimation2: boolean;
  isLoggedIn: any;
  firstName: string;
  lastName: string;
  email: string;
  userInfo: any;
  managedPayments: boolean;
  isEmployee: boolean;
  role: string;
  classPage: string;
  location: Location;
  timeout: any

  constructor(
    private translate: TranslateService,
    private router: Router,
    private utils: UtilsService,
    public auth: AuthService,
    private bnIdle: BnNgIdleService,
    private breakpointObserver: BreakpointObserver,
    private user: UserService,
    private content: ContentService,
    private token: TokenService,
    private swUpdate: SwUpdate,
    private dialog: MatDialog,
    location: Location
  ) {
    translate.setDefaultLang("es");
    translate.use("es");

    this.subscription = router.events.subscribe((url: any) => {
      if (url instanceof NavigationStart) {
        dataLayer.push({
          event: "pageview",
          virtualPageURL: url.url,
        });
      } else if (url instanceof NavigationEnd) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.getPopUps();
        }, 500)
      }
    });

    this.isLoggedIn = this.auth.isLoggedIn();

    this.subscription = this.router.events.subscribe(() => {
      let urlLocation = location.prepareExternalUrl(location.path());
      let SplitLocation = urlLocation.split("/");
      this.classPage = SplitLocation[1];
    });
  }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        Swal.fire({
          title: "¡Nueva versión disponible!",
          text: "Haz clic en el botón aceptar.",
          type: "info",
          allowEscapeKey: false,
          allowOutsideClick: false,
          confirmButtonText: "Aceptar",
          confirmButtonClass: "update-success",
          customClass: "paymentData",
        }).then(() => {
          window.location.reload();
        });
      });
    }

    this.showAnimation1 = true;
    this.innerWidth = window.innerWidth;
    this.showLoginForm = true;
    this.showRegisterForm = false;
    this.showForgotForm = false;
    this.showActivateForm = false;

    this.subscription = this.utils.change.subscribe((isOpen) => {
      this.isOpen = isOpen;
      this.showRegisterForm = false;
      this.showLoginForm = true;
      this.showForgotForm = false;
      this.showActivateForm = false;
    });

    this.subscription = this.utils.changeMenu.subscribe((isOpenMenu) => {
      this.isOpenMenu = isOpenMenu;
    });

    this.subscription = this.utils.changeRegister.subscribe(
      (isOpenRegister) => {
        this.isOpen = isOpenRegister;
        this.showRegisterForm = true;
        this.showLoginForm = false;
        this.showForgotForm = false;
        this.showActivateForm = false;
      }
    );

    this.subscription = this.utils.showForgotFormEmit.subscribe(
      (isOpenForgot) => {
        this.isOpen = isOpenForgot;
        this.showRegisterForm = false;
        this.showLoginForm = false;
        this.showActivateForm = false;
        this.showForgotForm = true;
      }
    );

    this.subscription = this.utils.showActivateFormEmit.subscribe(
      (isOpenActivate) => {
        this.isOpen = isOpenActivate;
        this.showActivateForm = true;
        this.showRegisterForm = false;
        this.showLoginForm = false;
        this.showForgotForm = false;
      }
    );

    this.windowWidth();
    this.getUserData();
  }

  public getPopUps() {
    if (this.auth.isLoggedIn()) {
      this.content.getPopup().subscribe((resp) => {
        let locationHref = location.href;
        let routeSplit = locationHref.split("/");
        let currentRoute = '/' + routeSplit[routeSplit.length - 1];
  
        const popUp = resp.find(x => !x.new && x.seccion === currentRoute)
  
        if (popUp) {
          const infoPopUp = {
            imageUrlWeb: popUp.imageurlweb,
            imageUrlMobile: popUp.imageurlmobile,
            textbutton: popUp.textbutton,
            colorbutton: popUp.colorbutton,
            BLink: popUp.link
          }
          
          this.openPopUp(infoPopUp)
          this.saveVisitOffer(popUp.id)
        }
      })
    }
  }

  public openPopUp(infoPopUp) {
    this.dialog.open(PopupComponent, {
      data: {
        ...infoPopUp
      },
      panelClass: "dynamic-popup"
    });
  }

  public saveVisitOffer(idoffer) {
    let token = localStorage.getItem("ACCESS_TOKEN")
    let tokenDecode = decode(token)
    const userId = tokenDecode.userid

    this.content.saveVisitOffer({ idoffer, userId }).subscribe((resp) => {})
  }

  public hideLogin() {
    this.isOpen = !this.isOpen;
    this.showLoginForm = true;
    this.showRegisterForm = false;
    this.showForgotForm = false;
    this.showActivateForm = false;
  }

  public showRegister() {
    this.showRegisterForm = true;
    this.showLoginForm = false;
    this.showForgotForm = false;
    this.showActivateForm = false;
  }

  public showLogin() {
    this.showRegisterForm = false;
    this.showForgotForm = false;
    this.showLoginForm = true;
    this.showActivateForm = false;
  }

  public showForgot() {
    this.showForgotForm = true;
    this.showRegisterForm = false;
    this.showLoginForm = false;
    this.showActivateForm = false;
  }

  public showActivate() {
    this.showForgotForm = false;
    this.showRegisterForm = false;
    this.showLoginForm = false;
    this.showActivateForm = true;
  }

  public getUserData() {
    this.subscription = this.auth.getRole$.subscribe((role) => {
      this.role = role;
      if (role === "CLICKER" || role === "ADMIN" || role === "SUPERADMIN") {
        this.email = this.token.userInfo().userName;
        this.subscription = this.user.getuserdata().subscribe((user) => {
          this.firstName = user.firstNames;
          this.lastName = user.lastNames;
          this.managedPayments = user.managedPayments;
          this.isEmployee = user.isEmployeeGrupoExito;
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener("over")
  hideMenu() {
    this.utils.hideMenu();
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.innerWidth = event.target.innerWidth;
    this.windowWidth();
  }

  public windowWidth() {
    if (this.innerWidth > 600) {
      this.showAnimation1 = true;
      this.showAnimation2 = false;
    }
    if (this.innerWidth < 600) {
      this.showAnimation1 = false;
      this.showAnimation2 = true;
    }
  }
}
