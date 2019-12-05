import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  HostListener,
  OnDestroy
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Router, NavigationStart } from "@angular/router";
import {
  trigger,
  state,
  style,
  transition,
  group,
  animate
} from "@angular/animations";
import { UtilsService } from "./services/utils.service";
import { Subscription } from "rxjs";
import { AuthService } from "./services/auth.service";
import * as SmartBanner from "../../node_modules/smart-app-banner/dist/smart-app-banner.js";
import { BnNgIdleService } from "bn-ng-idle";
import Swal from "sweetalert2";
declare var dataLayer: any

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
          )
        ])
      ])
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
          )
        ])
      ])
    ]),
    trigger("simpleFadeAnimation", [
      // the "in" style determines the "resting" state of the element when it is visible.
      state("in", style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(":enter", [style({ opacity: 0 }), animate(600)]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(":leave", animate(600, style({ opacity: 0 })))
    ])
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild("templateCardLogin, TemplateCardRegister, TemplateCardForgot", {
    static: false
  })
  template: TemplateRef<any>;
  SmartBanner: any;
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

  constructor(
    private translate: TranslateService,
    private router: Router,
    private utils: UtilsService,
    public auth: AuthService,
    private bnIdle: BnNgIdleService
  ) {
    translate.setDefaultLang("es");
    translate.use("es");

    this.subscription = router.events.subscribe((url: any) => {
      if (url instanceof NavigationStart) {
        if (url.url === "/") {
          this.isHome = true;
          this.internal = false;
        } else {
          this.isHome = false;
          this.internal = true;
        }
        dataLayer.push({
        event: 'pageview',
        virtualPageURL: url.url
      })

      }

    });

    new SmartBanner({
      daysHidden: 5, // days to hide banner after close button is clicked (defaults to 15)
      daysReminder: 20, // days to hide banner after "VIEW" button is clicked (defaults to 90)
      appStoreLanguage: "es", // language code for the App Store (defaults to user's browser language)
      title: "Clickam",
      author: "",
      button: "Descargar",
      price: {
        android: "Descarga la app "
      },
      store: {
        android: `</br> gratis en la Play Store`
      }
      // force: 'android' // Uncomment for platform emulation
    });

    this.isLoggedIn = this.auth.isLoggedIn();

   this.subscription = this.auth.isLogged$.subscribe((val) => {
      if(!!val) {
        this.subscription = this.bnIdle.startWatching(3600).subscribe(res => {
          if (res) {
            localStorage.removeItem("ACCESS_TOKEN");
            this.auth.getRole$.next(null);
            this.auth.isLogged$.next(false);
            Swal.fire({
              title: "Ha expirado tu sesión",
              text: 'Por favor vuelve a iniciar sesión',
              type: "info",
              confirmButtonText: "Volver al inicio",
              confirmButtonClass: "init-sesssion",
              allowOutsideClick: false
            }).then(() => {
              window.location.reload();
            })
          }
        });
      }

    });
    
  }

  ngOnInit() {

    this.showAnimation1 = true;
    this.innerWidth = window.innerWidth;
    this.showLoginForm = true;
    this.showRegisterForm = false;
    this.showForgotForm = false;

    this.subscription = this.utils.change.subscribe(isOpen => {
      this.isOpen = isOpen;
      this.showRegisterForm = false;
      this.showLoginForm = true;
      this.showForgotForm = false;
    });

    this.subscription = this.utils.changeMenu.subscribe(isOpenMenu => {
      this.isOpenMenu = isOpenMenu;
    });

    this.subscription = this.utils.changeRegister.subscribe(isOpenRegister => {
      this.isOpen = isOpenRegister;
      this.showRegisterForm = true;
      this.showLoginForm = false;
      this.showForgotForm = false;
    });

    this.windowWidth();
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
