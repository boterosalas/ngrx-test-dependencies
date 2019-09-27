import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { Subscription } from "rxjs";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private user: UserService
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
  }

  public showRegister() {
    this.router.navigate(["/registro"]);
  }

  public activateUser() {

    this.subscription = this.user
    .activateProfile(this.email)
    .subscribe((user: any) => {
      console.log(user);
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
