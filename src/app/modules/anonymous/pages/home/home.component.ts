import {
  Component,
  OnInit,
  HostBinding,
  HostListener,
  OnDestroy,
  ViewChild,
  TemplateRef,
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
  @ViewChild("templateBusiness", { static: false })
  templateBusiness: TemplateRef<any>;
  categories = [];
  code: string;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private user: UserService,
    private utils: UtilsService,
    public auth: AuthService,
    private content: ContentService,
    private dialog: MatDialog
  ) {
    /**
     *  Verifica que en la ruta de inicio exista el parametro de email y activa el usuario
     * @param email
     */

    this.subscription = this.route.queryParams.subscribe((params) => {
      if (params.email) {
        this.email = params.email;
        this.activateUser();
      } 
      else {
        if(params.code) {
          this.code = params.code;
        }
        else {
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
      if (role === "CLICKER" || role === "ADMIN") {
        this.subscription = this.user.getuserdata().subscribe((user) => {
          this.isEmployee = user.isEmployeeGrupoExito;
        });
      }
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

  public getBussinessClicker() {
    this.subscription = this.auth.isLogged$.subscribe((val) => {
      let token = localStorage.getItem("ACCESS_TOKEN");
      if (!!val || token !== null) {
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
}
