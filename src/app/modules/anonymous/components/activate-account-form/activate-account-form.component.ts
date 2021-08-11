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
  styleUrls: ['./activate-account-form.component.scss'],
})
export class ActivateAccountFormComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private forgot: AuthService,
    private loading: LoaderService,
    private utils: UtilsService
  ) {}

  text: any = '';
  emailPattern = '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}';
  activateForm: FormGroup;
  private subscription: Subscription = new Subscription();

  swalOptInvalid: Object = {
    title: this.text,
    confirmButtonText: 'Aceptar',
    confirmButtonClass: 'accept-forgot-alert-invalid',
    type: 'error',
  };

  swalOptError: Object = {
    title: 'Ups algo salió mal',
    text: this.text,
    confirmButtonText: 'Aceptar',
    confirmButtonClass: 'accept-forgot-alert-error',
    type: 'error',
  };

  swalOptSuccess: Object = {
    title: 'Se ha enviado un email',
    text: this.text,
    confirmButtonText: 'Aceptar',
    confirmButtonClass: 'accept-forgot-alert-success',
    type: 'success',
  };

  ngOnInit() {
    this.activateForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern), Validators.maxLength(64)]],
    });
  }

  @HostListener('over')
  hideActivate() {
    this.utils.showloginForm();
  }

  /**
   * Metodo para enviar correo cuando se olvido la contreña
   * @param email  recibe el nombre del usuario que es el correo.
   */

  public activateAccount() {
    let email = this.activateForm.controls.email.value;
    this.subscription = this.forgot.sendActivation(email).subscribe(
      (resp: ResponseService) => {
        if (resp.state === 'Success') {
          this.swalOptSuccess = {
            ...this.swalOptSuccess,
            text: resp.userMessage,
          };
          Swal.fire(this.swalOptSuccess).then(() => {
            this.utils.hideloginForm();
          });
        } else {
          Swal.fire(
            (this.swalOptError = {
              ...this.swalOptError,
              text: resp.userMessage,
            })
          );
        }
      },
      (error) => {
        this.loading.hide();
        Swal.fire(
          (this.swalOptInvalid = {
            ...this.swalOptInvalid,
            text: error.statusText,
          })
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
