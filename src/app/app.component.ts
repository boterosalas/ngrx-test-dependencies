import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  HostListener,
  OnDestroy,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Router, NavigationStart } from "@angular/router";
import {
  trigger,
  state,
  style,
  transition,
  group,
  animate,
} from "@angular/animations";
import { UtilsService } from "./services/utils.service";
import { Subscription, Observable } from "rxjs";
import { AuthService } from "./services/auth.service";
import { BnNgIdleService } from "bn-ng-idle";
import Swal from "sweetalert2";
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";
import { map, shareReplay } from "rxjs/operators";
import { UserService } from "./services/user.service";
import { TokenService } from "./services/token.service";
import { Meta } from "@angular/platform-browser";
import { SwUpdate } from "@angular/service-worker";
declare var dataLayer: any;
// import { MessagingService } from "./shared/messaging.service";

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

  @ViewChild("templateCardLogin, TemplateCardRegister, TemplateCardForgot", {
    static: false,
  })
  template: TemplateRef<any>;
  isHome: boolean;
  internal: boolean;
  showLoginForm: boolean;
  showRegisterForm: boolean;
  showForgotForm: boolean;
  isOpen = false;
  isOpenMenu = false;
  private subscription: Subscription = new Subscription();
  innerWidth: number;
  showAnimation1: boolean;
  showAnimation2: boolean;
  isLoggedIn: any;
  message;
  firstName: string;
  lastName: string;
  email: string;
  userInfo: any;
  managedPayments: boolean;
  isEmployee: boolean;
  role: String;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private utils: UtilsService,
    public auth: AuthService,
    private bnIdle: BnNgIdleService,
    private breakpointObserver: BreakpointObserver,
    private user: UserService,
    private token: TokenService,
    private metaTagService: Meta,
    private swUpdate: SwUpdate
  ) {
    translate.setDefaultLang("es");
    translate.use("es");

    this.subscription = router.events.subscribe((url: any) => {
      if (url instanceof NavigationStart) {
        dataLayer.push({
          event: "pageview",
          virtualPageURL: url.url,
        });
      }
    });

    this.isLoggedIn = this.auth.isLoggedIn();
  }


  ngOnInit() {

    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(()=> {
        Swal.fire({
          title: "¡Nueva versión disponible!",
          text:
            "Haz clic en el botón aceptar.",
          type: "info",
          allowEscapeKey: false,
          allowOutsideClick: false,
          confirmButtonText: "Aceptar",
          confirmButtonClass: "update-success",
          customClass:"paymentData"
        }).then(() => {
          window.location.reload();
        });
      });
    }

    // const userId = 'user001';
    // this.messagingService.requestPermission(userId)
    // this.messagingService.receiveMessage()
    // this.message = this.messagingService.currentMessage

    // this.email = this.userInfo.userName;

    this.metaTagService.addTags([
      {
        name: "keywords",
        content:
          "clickam, exito.com, carulla.com, seguros, referidos, viajes, cashback ",
      },
      {
        name: "description",
        content:
          "Clickam es una plataforma donde ganas comisiones por referir productos y servicios de negocios asociados, creando y compartiendo link con tus amigos en redes sociales o de manera digital, una vez estos realicen una compra a través de estos y sea verificada, clickam te pagara la comisión correspondiente al producto o servicio.",
      },
    ]);

    this.showAnimation1 = true;
    this.innerWidth = window.innerWidth;
    this.showLoginForm = true;
    this.showRegisterForm = false;
    this.showForgotForm = false;

    this.subscription = this.utils.change.subscribe((isOpen) => {
      this.isOpen = isOpen;
      this.showRegisterForm = false;
      this.showLoginForm = true;
      this.showForgotForm = false;
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
      }
    );

    this.subscription = this.utils.showForgotFormEmit.subscribe(
      (isOpenForgot) => {
        this.isOpen = isOpenForgot;
        this.showRegisterForm = false;
        this.showLoginForm = false;
        this.showForgotForm = true;
      }
    );

    this.windowWidth();
    this.getUserData();
 
  }

  public showModalPayment() {
    if(this.role === 'CLICKER' && this.managedPayments === false && this.isEmployee === false ) {
      Swal.fire({
        title: "¡Registra tus datos bancarios!",
        text:
          "Recuerda que para recibir el pago de tus comisiones, debes registrar tus datos bancarios.",
        type: "info",
        showCancelButton: true,
        showCloseButton: true,
        allowEscapeKey: false,
        allowOutsideClick: false,
        confirmButtonText: "Ingresar datos",
        cancelButtonText: "Ahora no",
        confirmButtonClass: "payment-success",
        cancelButtonClass: "payment-cancel",
        customClass:"paymentData"
      }).then((resp) => {
        if (resp.value === true) {
          this.router.navigate(["/mi-perfil", "pagos"]);
        }
      });
    }
  }

  public hideLogin() {
    this.isOpen = !this.isOpen;
    this.showLoginForm = true;
    this.showRegisterForm = false;
    this.showForgotForm = false;
  }

  public showRegister() {
    this.showRegisterForm = true;
    this.showLoginForm = false;
    this.showForgotForm = false;
  }

  public showLogin() {
    this.showRegisterForm = false;
    this.showForgotForm = false;
    this.showLoginForm = true;
  }

  public showForgot() {
    this.showForgotForm = true;
    this.showRegisterForm = false;
    this.showLoginForm = false;
  }

  public getUserData() {
    this.auth.getRole$.subscribe((role) => {
      this.role = role;
      if (role === "CLICKER" || role === "ADMIN") {
        this.email = this.token.userInfo().userName;
        this.user.getuserdata().subscribe((user) => {
          this.firstName = user.firstNames;
          this.lastName = user.lastNames;
          this.managedPayments = user.managedPayments;
          this.isEmployee = user.isEmployeeGrupoExito;
        });
      }
      setTimeout(() => {
        this.showModalPayment();
      }, 1000);
    });
  }

  onActivate(event) {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 1);
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
