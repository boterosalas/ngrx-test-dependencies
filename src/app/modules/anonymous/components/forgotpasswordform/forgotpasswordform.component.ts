import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ResponseService } from 'src/app/interfaces/response';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AuthService } from 'src/app/services/auth.service';

declare var dataLayer: any;

@Component({
  selector: 'app-forgotpasswordform',
  templateUrl: './forgotpasswordform.component.html',
  styleUrls: ['./forgotpasswordform.component.scss'],
})
export class ForgotpasswordformComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private forgot: AuthService,
    private loading: LoaderService,
    private utils: UtilsService
  ) {}

  private subscription: Subscription = new Subscription();
  emailPattern = '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}';
  forgotPaswordForm: UntypedFormGroup;
  text: any = '';

  swalOptSuccess: object = {
    title: 'Se ha enviado un email',
    text: this.text,
    confirmButtonText: 'Aceptar',
    confirmButtonClass: 'accept-forgot-alert-success',
    type: 'success',
  };

  swalOptError: object = {
    title: 'Ups algo salió mal',
    text: this.text,
    confirmButtonText: 'Aceptar',
    confirmButtonClass: 'accept-forgot-alert-error',
    type: 'error',
  };

  swalOptInvalid: object = {
    title: this.text,
    confirmButtonText: 'Aceptar',
    confirmButtonClass: 'accept-forgot-alert-invalid',
    type: 'error',
  };

  ngOnInit() {
    this.forgotPaswordForm = this.fb.group({
      Username: ['', [Validators.required, Validators.pattern(this.emailPattern), Validators.maxLength(64)]],
    });
  }

  /**
   * Metodo para enviar correo cuando se olvido la contreña
   * @param userName  recibe el nombre del usuario que es el correo.
   */

  public forgotPassword() {
    this.loading.show();
    const userName = this.forgotPaswordForm.controls.Username.value;
    this.subscription = this.forgot.forgotPassword(userName).subscribe(
      (resp: ResponseService) => {
        this.loading.hide();
        if (resp.state !== 'Success') {

          dataLayer.push({
            event: 'pushEventGA',
            categoria: 'CambioDeContrasena',
            accion: 'ClicContinuar',
            etiqueta: 'CambioDeContrasenaAceptarExitoso',
          });

          Swal.fire(
            (this.swalOptError = {
              ...this.swalOptError,
              text: resp.userMessage,
            })
          );
        } else {
          this.swalOptSuccess = {
            ...this.swalOptSuccess,
            text: resp.userMessage,
          };
          Swal.fire(this.swalOptSuccess).then(() => {
            this.utils.hideloginForm();
          });
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

  @HostListener('over')
  hideForgot() {
    this.utils.showloginForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
