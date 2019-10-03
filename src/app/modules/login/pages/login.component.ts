import { Component, OnInit, HostBinding } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { Subscription } from "rxjs";
import { UserService } from "src/app/services/user.service";
import { UtilsService } from 'src/app/services/utils.service';
import { trigger, state, style, transition, animate, group } from '@angular/animations';


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
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
    ])
]
})


export class LoginComponent implements OnInit {

  // @HostBinding('class.slide-in-top')
  isOpen = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private user: UserService,
    private utils: UtilsService
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
  showLoginForm: boolean;
  showRegisterForm: boolean;
  email: string;
  

  ngOnInit() {
    this.showLoginForm = true;
    this.showRegisterForm = false;

    this.utils.change.subscribe(isOpen => {
      this.isOpen = isOpen;
    });

  }

  public hideLogin() {
    this.isOpen = !this.isOpen;
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
          this.router.navigate(["/"]);
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


}
