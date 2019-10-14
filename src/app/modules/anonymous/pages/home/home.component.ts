import { Component, OnInit, HostBinding, HostListener } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { Subscription } from "rxjs";
import { UserService } from "src/app/services/user.service";
import { UtilsService } from 'src/app/services/utils.service';
import { trigger, state, style, transition, animate, group } from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';


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


export class HomeComponent implements OnInit {

  showLoginForm: boolean;
  showRegisterForm: boolean;
  showForgotForm: boolean;
  isOpen = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private user: UserService,
    private utils: UtilsService,
    private auth: AuthService
  ) {
    this.route.queryParams.subscribe(params => {
      if (params.email) {
        this.email = params.email;
        this.activateUser();
      } else {
        router.navigate(["/"]);
      }
    });
  }

  private subscription: Subscription = new Subscription();
  email: string;
  

  ngOnInit() {

    if(this.auth.isLoggedIn()) {
      this.router.navigate(['clicker']);
    }
    
  }


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
          this.router.navigate(["/"]);
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
          this.router.navigate(["/"]);
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

}
