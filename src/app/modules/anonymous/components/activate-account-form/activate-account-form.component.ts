import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activate-account-form',
  templateUrl: './activate-account-form.component.html',
  styleUrls: ['./activate-account-form.component.scss']
})
export class ActivateAccountFormComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private forgot: AuthService,
    private loading: LoaderService,
    private utils: UtilsService
  ) {}
  
  private subscription: Subscription = new Subscription();
  emailPattern = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}";
  activateForm: FormGroup;
  text:any;

  swalOptSuccess: Object = {
      title: "Se ha enviado un email",
      text: this.text,
      confirmButtonText: "Aceptar",
      confirmButtonClass: 'accept-forgot-alert-success',
      type: "success"
  }

  swalOptError: Object = {
    title: "Ups algo salió mal",
    text: this.text,
    confirmButtonText: "Aceptar",
    confirmButtonClass: 'accept-forgot-alert-error',
    type: "error"
  }

  swalOptInvalid: Object = {
    title: this.text,
    confirmButtonText: "Aceptar",
    confirmButtonClass: 'accept-forgot-alert-invalid',
    type: "error"
  }

  ngOnInit() {
    this.activateForm = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(this.emailPattern),
          Validators.maxLength(64)
        ]
      ]
    });
  }

  /**
   * Metodo para enviar correo cuando se olvido la contreña
   * @param email  recibe el nombre del usuario que es el correo.
   */

  public forgotPassword() {
    this.loading.show();
    let email = this.activateForm.controls.email.value;
    this.subscription = this.forgot.forgotPassword(email).subscribe(
      (resp: ResponseService) => {
        this.loading.hide();
        if (resp.state === "Success") {
          this.swalOptSuccess = {...this.swalOptSuccess, text: resp.userMessage};
          Swal.fire(this.swalOptSuccess).then(()=> {
            this.utils.hideloginForm();
          });
        } else {
          Swal.fire(
            this.swalOptError = {...this.swalOptError, text: resp.userMessage}
          );
        }
      },
      error => {
        this.loading.hide();
        Swal.fire(
          this.swalOptInvalid = {...this.swalOptInvalid, text: error.statusText}
        );
      }
    );
  }

  @HostListener('over')
  hideActivate() {
    this.utils.showloginForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
