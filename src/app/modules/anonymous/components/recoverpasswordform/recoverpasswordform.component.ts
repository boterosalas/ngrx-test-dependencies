import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from 'src/app/validators/confirm-password.validator';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ResponseService } from 'src/app/interfaces/response';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { AuthService } from 'src/app/services/auth.service';
declare var dataLayer: any;

@Component({
  selector: 'app-recoverpasswordform',
  templateUrl: './recoverpasswordform.component.html',
  styleUrls: ['./recoverpasswordform.component.scss'],
})
export class RecoverpasswordformComponent implements OnInit, OnDestroy {
 
  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private recover: AuthService,
    private loading: LoaderService
  ) {}

  private subscription: Subscription = new Subscription();
  recoverPasswordForm: UntypedFormGroup;
  code: string;
  email: string;
  msg: string;
  classMsg: string;
  passwordPattern = '(?=.*[a-zA-Z])(?=.*[0-9])';

  ngOnInit() {
    this.recoverPasswordForm = this.fb.group(
      {
        password: [
          '',
          [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern(new RegExp(this.passwordPattern))],
        ],
        confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      },
      { validator: ConfirmPasswordValidator.MatchPassword }
    );

    /** verifica que los parametros en la ruta existan si no hace un redirect hacia el inicio */

    this.subscription = this.route.queryParams.subscribe((params) => {
      if (params.code && params.email) {
        this.code = params.code;
        this.email = params.email;
      } else {
        this.router.navigate(['/inicio']);
      }
    });
  }

  /**
   * Metodo encargado de reestablecer la contrase??a
   * @params code, email, newpassword
   */

  public recoverPassword() {
    this.loading.show();
    const dataUser = {
      code: this.code,
      email: this.email,
      newPassword: btoa(this.recoverPasswordForm.controls.password.value),
    };

    this.subscription = this.recover.recoverPassword(dataUser).subscribe(
      (resp: ResponseService) => {
        this.loading.hide();
        if (resp.state === 'Success') {

          dataLayer.push({
            event: 'pushEventGA',
            categoria: 'CambioDeContrasena',
            accion: 'ClicContinuar',
            etiqueta: 'CambioDeContrasenaEnviarExitoso',
          });

          Swal.fire({
            title: 'cambio de contrase??a',
            text: 'Tu contrase??a ha sido restablecida exitosamente',
            type: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonClass: 'accept-recover-alert-success',
          }).then(() => {
            this.router.navigate(['/inicio']);
          });
        } else {
          Swal.fire({
            title: 'Ups algo sali?? mal',
            text: resp.userMessage,
            type: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonClass: 'accept-recover-alert-error',
          });
        }
      },
      (error) => {
        this.loading.hide();
        Swal.fire({
          title: error.statusText,
          // text: error.error.userMessage,
          type: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonClass: 'accept-recover-alert-invalid',
        });
      }
    );
  }

  onStrengthChanged(event) {
    this.subscription = this.recoverPasswordForm.controls.password.valueChanges.subscribe((resp) => {
      if (resp === '') {
        this.msg = '';
      }
    });
    if (event <= 20) {
      this.msg = 'Contrase??a d??bil';
      this.classMsg = 'weak';
    }
    if (event > 20 && event < 100) {
      this.msg = 'Contrase??a aceptable';
      this.classMsg = 'normal';
    }
    if (event >= 100) {
      this.msg = 'Contrase??a segura';
      this.classMsg = 'acceptable';
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
