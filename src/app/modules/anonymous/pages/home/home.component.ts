import {
  Component,
  OnInit,
  HostBinding,
  HostListener,
  OnDestroy,
  ViewChild,
  TemplateRef,
  ElementRef,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { Subscription } from "rxjs";
import { UserService } from "src/app/services/user.service";
import { UtilsService } from "src/app/services/utils.service";
import {
  trigger,
  state,
  style,
  transition,
  animate,
  group,
} from "@angular/animations";
import { AuthService } from "src/app/services/auth.service";
import decode from "jwt-decode";
import { ContentService } from "src/app/services/content.service";
import { distinctUntilChanged } from "rxjs/operators";
import { MatDialog } from "@angular/material";
import { ModalGenericComponent } from "src/app/modules/shared/components/modal-generic/modal-generic.component";
import { ResponseService } from "src/app/interfaces/response";
import { LinksService } from "src/app/services/links.service";
import { JoyrideService } from "ngx-joyride";
import { DialogComponent } from "src/app/modules/shared/components/dialog/dialog.component";

@Component({
  selector: "app-login",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
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
export class HomeComponent implements OnInit, OnDestroy {
  showLoginForm: boolean;
  showRegisterForm: boolean;
  showForgotForm: boolean;
  isOpen = false;
  private subscription: Subscription = new Subscription();
  email: string;
  bussiness: Array<any> = [];
  bussinessClicker: Array<any> = [];
  sliderMobile: any;
  sliderMobileOffers: any;
  sliderWeb: any;
  offersMobile: any;
  offersWeb: any;
  isEmployee: any;
  userOnboarding: boolean;
  @ViewChild("templateBusiness", { static: false })
  templateBusiness: TemplateRef<any>;
  categories = [];
  managedPayments: boolean;
  role: String;
  numberSteps:any;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private user: UserService,
    private utils: UtilsService,
    public auth: AuthService,
    private content: ContentService,
    private dialog: MatDialog,
    private link: LinksService,
    private readonly joyrideService: JoyrideService,
    private elementRef: ElementRef
  ) {
    /**
     *  Verifica que en la ruta de inicio exista el parametro de email y activa el usuario
     * @param email
     */

    this.subscription = this.route.queryParams.subscribe((params) => {
      if (params.email) {
        this.email = params.email;
        this.activateUser();
      } else {
        if (params.code) {
          localStorage.setItem("idClicker", params.code);
          this.openRegister();
        } else {
          router.navigate(["/"]);
        }
      }
    });
  }

  ngOnInit() {
    /**
     * verifica si el usuario esta logueado y lo envia a la pagina de clicker, para no mostrar la pagina inicial anonima
     */

    this.routeBased();
    this.getBussiness();
    this.getBussinessClicker();
    this.getOffers();
    this.slider();
    this.getUserData();
  }

  public getUserData() {
    this.subscription = this.auth.getRole$.subscribe((role) => {
      this.role = role;
      if (role === "CLICKER" || role === "ADMIN") {
        this.subscription = this.user.getuserdata().subscribe((user) => {
          this.isEmployee = user.isEmployeeGrupoExito;
          this.managedPayments = user.managedPayments;
          this.userOnboarding = user.onBoardingViewed;
          if (this.userOnboarding === false && role === "CLICKER") {
            this.starTour();
          }
        });
      }
      setTimeout(() => {
        this.showModalPayment();
      }, 1000);
    });
  }

  /**
   * Metodo para activar el usuario
   * @param email
   */

  public activateUser() {
    this.subscription = this.user.activateProfile(this.email).subscribe(
      (user: any) => {
        if (user.state === "Success") {
          Swal.fire({
            title: "Activación exitosa",
            text: user.userMessage,
            type: "success",
            confirmButtonText: "Aceptar",
            confirmButtonClass: "accept-activation-alert-success",
          }).then(() => {
            this.router.navigate(["/inicio"]);
          });
        } else {
          Swal.fire({
            title: "Activación errónea",
            text: user.userMessage,
            type: "error",
            confirmButtonText: "Aceptar",
            confirmButtonClass: "accept-activation-alert-error",
          }).then(() => {
            this.router.navigate(["/inicio"]);
          });
        }
      },
      (error) => {
        Swal.fire({
          title: error.statusText,
          text: error.error,
          type: "error",
          confirmButtonText: "Aceptar",
          confirmButtonClass: "accept-activation-alert-invalid",
        }).then(() => {
          this.router.navigate(["/inicio"]);
        });
      }
    );
  }

  public getAmount() {
    this.subscription = this.link.getAmount().subscribe((amount) => {
      localStorage.setItem("Amount", amount.amountsCommission);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener("over")
  openRegister() {
    this.utils.showRegisterForm();
  }

  @HostListener("over")
  sliderOffers() {
    let token = localStorage.getItem("ACCESS_TOKEN");
    if (token === null) {
      this.utils.showloginForm();
    }
  }

  private routeBased() {
    let token = localStorage.getItem("ACCESS_TOKEN");
    if (token !== null) {
      let tokenDecode = decode(token);
      if (tokenDecode.role === "ADMIN") {
        this.router.navigate(["/dashboard"]);
        this.auth.getRole$.next("ADMIN");
      }
    }
  }

  public getBussiness() {
    this.subscription = this.content
      .getBusiness()
      .pipe(distinctUntilChanged())
      .subscribe((bussiness) => {
        this.bussiness = bussiness;
      });
  }

  public starTour() {
    this.joyrideService.closeTour();
    if (window.outerWidth > 600) {
      this.numberSteps = {
        steps: [
          "firstStep",
          "secondStep0@inicio",
          "thirdStep1@bussiness",
          "fourthStep",
          "fifthStep",
          "lastStep",
        ],
      };
    } else {
      this.numberSteps = {
        steps: [
          "firstStep",
          "secondStep0@inicio",
          "thirdStep1@bussiness",
          "fourthStepMobile",
          "lastStep",
        ],
      };
    }
    this.joyrideService
      .startTour({
        steps: this.numberSteps.steps,
        waitingTime: 1000,
        customTexts: { prev: "Anterior", next: "Siguiente", done: "Terminar" },
      })
      .subscribe(
        (step) => {
          const hook = document.querySelector("#bussinessHook");

          if (step.number === 2) {
            hook.scrollIntoView();
          }

          if (step.number === 3) {
            const nextButton = document.querySelector(
              "#joyride-step-thirdStep1 .joyride-step__next-container joyride-button button"
            );
            const button = document.querySelector("#btnbussiness1");
            nextButton.addEventListener("click", () => {
              button.dispatchEvent(new Event("click"));
            });
          }

          if (step.number === 3 && step.actionType === "PREV") {
            const close = document.querySelector("#closeDialog");
            close.dispatchEvent(new Event("click"));
          }
        },
        (error) => {
          /*handle error*/
        },
        () => {
          /*Tour is finished here, do something*/
          this.user.saveOnboarding(true).subscribe();
          this.router.navigate(["/inicio"]);
          if (document.querySelector("#closeDialog")) {
            const close = document.querySelector("#closeDialog");
            close.dispatchEvent(new Event("click"));
          }
        }
      );
  }

  public getBussinessClicker() {
    this.subscription = this.auth.isLogged$.subscribe((val) => {
      let token = localStorage.getItem("ACCESS_TOKEN");
      if (!!val || token !== null) {
        this.getAmount();
        this.subscription = this.content
          .getBusinessClicker()
          .subscribe((bussiness) => {
            this.bussinessClicker = bussiness;
          });
      }
    });
  }

  public slider() {
    this.subscription = this.content
      .getNews()
      .pipe(distinctUntilChanged())
      .subscribe((slide: any) => {
        this.sliderWeb = slide.web;
        this.sliderMobile = slide.mobile;
      });
  }

  public getOffers() {
    this.subscription = this.content
      .getOffers()
      .pipe(distinctUntilChanged())
      .subscribe((offer) => {
        this.offersMobile = offer.mobile;
        this.offersWeb = offer.web;
      });
  }

  public bussinessNavigation(bussiness) {
    let token = localStorage.getItem("ACCESS_TOKEN");
    if (token === null) {
      this.utils.showloginForm();
    }

    let params = {
      id: bussiness.id,
      code: bussiness.code,
      infoAditional: bussiness.infoaditional,
      imageurl: bussiness.imageurl,
    };
    this.router.navigate([
      "/bussiness",
      {
        id: params.id,
        code: params.code,
        infoAditional: params.infoAditional,
        imageurl: params.imageurl,
      },
    ]);
  }

  public openRegisterBusiness() {
    this.getCategoriesBusiness();
    const template = this.templateBusiness;
    const title = "";
    const id = "business-modal";

    this.dialog.open(ModalGenericComponent, {
      data: {
        title,
        id,
        template,
      },
    });
  }

  public getCategoriesBusiness() {
    this.subscription = this.content
      .getCategoriesBusiness()
      .subscribe((categories) => (this.categories = categories));
  }

  public sendDataBusiness(data) {
    let formInfo = data.value;
    let infoBusiness = {
      description: formInfo.name,
      website: formInfo.domain,
      contactname: formInfo.contact,
      contactphone: formInfo.phone,
      contactemail: formInfo.email,
      category: formInfo.category,
      acceptTerms: formInfo.acceptTerms,
      acceptHabeasData: true,
    };
    this.subscription = this.content
      .registerBusinessClicker(infoBusiness)
      .subscribe(
        (resp: ResponseService) => {
          if (resp.state === "Success") {
            this.dialog.closeAll();
            Swal.fire({
              title: "Registro exitoso",
              text: resp.userMessage,
              type: "success",
              confirmButtonText: "Aceptar",
              confirmButtonClass: "accept-register-alert-success",
            });
          } else {
            this.dialog.closeAll();
            Swal.fire({
              title: "Registro erróneo",
              text: resp.userMessage,
              type: "error",
              confirmButtonText: "Aceptar",
              confirmButtonClass: "accept-register-alert-error",
            });
          }
        },
        (error) => {
          this.dialog.closeAll();
          Swal.fire({
            title: error.statusText,
            text: error.error,
            type: "error",
            confirmButtonText: "Aceptar",
            confirmButtonClass: "accept-register-alert-invalid",
          });
        }
      );
  }

  public showModalPayment() {
    if (
      this.role === "CLICKER" &&
      this.managedPayments === false &&
      this.isEmployee === false &&
      this.userOnboarding === true
    ) {
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
        customClass: "paymentData",
      }).then((resp) => {
        if (resp.value === true) {
          this.router.navigate(["/mi-perfil", "pagos"]);
        }
      });
    }
  }
}
