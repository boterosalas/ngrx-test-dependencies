import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from 'src/app/validators/confirm-password.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { RecoverpasswordService } from 'src/app/services/recoverpassword.service';
import Swal from "sweetalert2";
import { ResponseService } from 'src/app/interfaces/response';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { RemoveSpaceService } from 'src/app/services/remove-space.service';

@Component({
  selector: 'app-recoverpasswordform',
  templateUrl: './recoverpasswordform.component.html',
  styleUrls: ['./recoverpasswordform.component.scss']
})
export class RecoverpasswordformComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private recover: RecoverpasswordService,
    private loading: LoaderService,
    private removeSpace: RemoveSpaceService
  ) { }

  private subscription: Subscription = new Subscription();
  recoverPasswordForm: FormGroup;
  code: string;
  email: string;
  passwordPattern = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[!#/_@#$%^&+-.*)(´}{><:;¡!})])";

  ngOnInit() {
    this.recoverPasswordForm = this.fb.group({
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.pattern(new RegExp(this.passwordPattern))
        ]
      ],
      confirmPassword: [
        "",
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]
      ]
    },{ validator: ConfirmPasswordValidator.MatchPassword });

    this.route.queryParams.subscribe(params => {
      if(params.code && params.email) {
        this.code = params.code;
        this.email = params.email;
      } else {
        this.router.navigate(['/']);
      }
    });

  }

  public recoverPassword() {
    this.loading.show();
    let dataUser = {
      code: this.code,
      email: this.email,
      newPassword: btoa(this.recoverPasswordForm.controls.password.value)
    }

    this.subscription = this.recover.recoverPassword(dataUser).subscribe(
      (resp: ResponseService) => {
        this.loading.hide();
        if (resp.state === "Success") {
          Swal.fire({
            title: "Recuperación de contraseña",
            text: "Tu contraseña ha sido reestablecida exitosamente",
            type: "success",
            confirmButtonText: "Aceptar",
            confirmButtonClass: 'accept-recover-alert-success'
          }).then(()=>{
            this.router.navigate(['/']);
          });
        } else {
          Swal.fire({
            title: "Ups algo salió mal",
            text: resp.userMessage,
            type: "error",
            confirmButtonText: "Aceptar",
            confirmButtonClass: 'accept-recover-alert-error'
          });
        }
      },
      error => {
        this.loading.hide();
        Swal.fire({
          title: error.statusText,
          // text: error.error.userMessage,
          type: "error",
          confirmButtonText: "Aceptar",
          confirmButtonClass: 'accept-recover-alert-invalid'
        });
      }
    );
  }

  public removewhiteSpaceRecover() {
    const inputValue = this.recoverPasswordForm.controls.password.value;
    const recoverControl = this.recoverPasswordForm.controls.password;
    this.removeSpace.removeSpace(inputValue, recoverControl);
  }

  public removewhiteSpaceConfirmRecover() {
    const inputValue = this.recoverPasswordForm.controls.confirmPassword.value;
    const recoerConfirmControl = this.recoverPasswordForm.controls.confirmPassword
    this.removeSpace.removeSpace(inputValue, recoerConfirmControl);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();  
  }

}