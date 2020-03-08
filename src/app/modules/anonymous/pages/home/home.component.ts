import { Component, OnInit, HostBinding, HostListener, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { Subscription } from "rxjs";
import { UserService } from "src/app/services/user.service";
import { UtilsService } from 'src/app/services/utils.service';
import { trigger, state, style, transition, animate, group } from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';
import decode from 'jwt-decode';
import { ContentService } from 'src/app/services/content.service';
import { distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: "app-login",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  animations: [
    trigger('openClose', [
        state('in', style({height: '*', opacity: 0})),
        transition(':leave', [
            style({height: '*', opacity: 1}),

            group([
                animate(300, style({height: 0})),
                animate('600ms ease-in-out', style({'transform': 'translateY(-1000px)'}))
            ])

        ])
    ]),
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(600 )
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(600, style({opacity: 0})))
    ])
]
})


export class HomeComponent implements OnInit, OnDestroy {

  showLoginForm: boolean;
  showRegisterForm: boolean;
  showForgotForm: boolean;
  isOpen = false;
  private subscription: Subscription = new Subscription();
  email: string;
  bussiness: Array<any> = [];
  newsSlider = [];
  offers = [];

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private user: UserService,
    private utils: UtilsService,
    private auth: AuthService,
    private content: ContentService
  ) {

    /**
     *  Verifica que en la ruta de inicio exista el parametro de email y activa el usuario
     * @param email 
     */

    this.subscription = this.route.queryParams.subscribe(params => {
      if (params.email) {
        this.email = params.email;
  
        this.activateUser();
      } else {
        router.navigate(["/"]);
      }
    });
  }

 
  

  ngOnInit() {

    /**
     * verifica si el usuario esta logueado y lo envia a la pagina de clicker, para no mostrar la pagina inicial anonima
     */

     this.routeBased();
     this.getBussiness();
     this.getOffers();
     this.slider();

  }

  /**
   * Metodo para activar el usuario
   * @param email
   */

  public activateUser() {

    this.subscription = this.user
    .activateProfile(this.email)
    .subscribe((user: any) => {
      if (user.state === "Success") {
        Swal.fire({
          title: "Activación exitosa",
          text: user.userMessage,
          type: "success",
          confirmButtonText: "Aceptar",
          confirmButtonClass: "accept-activation-alert-success"
        }).then(() => {
          this.router.navigate(["/inicio"]);
        });
      } else {
        Swal.fire({
          title: "Activación errónea",
          text: user.userMessage,
          type: "error",
          confirmButtonText: "Aceptar",
          confirmButtonClass: "accept-activation-alert-error"
        }).then(() => {
          this.router.navigate(["/inicio"]);
        });
      }
    },
      error => {
        Swal.fire({
          title: error.statusText,
          text: error.error,
          type: "error",
          confirmButtonText: "Aceptar",
          confirmButtonClass: "accept-activation-alert-invalid"
        }).then(() => {
          this.router.navigate(["/inicio"]);
        });
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  @HostListener('over')
  openRegister() {
    this.utils.showRegisterForm();
  }
  
  @HostListener("over")
  sliderOffers() {
    let token = localStorage.getItem("ACCESS_TOKEN");
    if(token === null) {
        this.utils.showloginForm();
    };
  }

  private routeBased() {
    let token = localStorage.getItem("ACCESS_TOKEN");
    if (token !== null) {
      let tokenDecode = decode(token);
      if(tokenDecode.role === "ADMIN") {
        this.router.navigate(['/dashboard']);
        this.auth.getRole$.next("ADMIN")
      }
    }
  }

  public getBussiness() {
    this.content.getBusiness()
    .pipe(distinctUntilChanged())
    .subscribe(bussiness => {
      this.bussiness = bussiness;
    })
  }

  public slider() {
    this.subscription = this.content.getNews()
    .pipe(distinctUntilChanged())
    .subscribe((slide: any)=> {
      this.newsSlider = slide;
    });
  }

  public getOffers() {
    this.subscription = this.content.getOffers()
    .pipe(distinctUntilChanged())
    .subscribe(offer => {
      this.offers = offer;
    });
  }

  public bussinessNavigation(bussiness) {

    let token = localStorage.getItem("ACCESS_TOKEN");
    if(token === null) {
        this.utils.showloginForm();
    };

    let params = {
      id: bussiness.id,
      code: bussiness.code,
      infoAditional: bussiness.infoaditional
    }
    this.router.navigate(['/bussiness', {id: params.id, code: params.code, infoAditional: params.infoAditional}]);
    
    

  }


}
