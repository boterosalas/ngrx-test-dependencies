import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from 'src/app/validators/confirm-password.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { RecoverpasswordService } from 'src/app/services/recoverpassword.service';
import Swal from "sweetalert2";
import { ResponseService } from 'src/app/interfaces/response';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';

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
    private loading: LoaderService
  ) { }

  private subscription: Subscription = new Subscription();
  recoverPasswordForm: FormGroup;
  id: string;

  ngOnInit() {
    this.recoverPasswordForm = this.fb.group({
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
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

    this.route.params.subscribe(params => {
      this.id = params.id;
    });

  }

  public recoverPassword() {
    this.loading.show();
    let dataUser = {
      password: btoa(this.recoverPasswordForm.controls.password.value),
      id: this.id
    }

    this.subscription = this.recover.recoverPassword(dataUser).subscribe(
      (resp: ResponseService) => {
        this.loading.hide();
        if (resp.state === "Success") {
          Swal.fire({
            title: "Recuperación de contraseña",
            text: "Tu contraseña ha sido reestablecida exitosamente",
            type: "success",
            confirmButtonText: "Aceptar"
          }).then(()=>{
            this.router.navigate(['/']);
          });
        } else {
          Swal.fire({
            title: "Ups algo salió mal",
            text: resp.userMessage,
            type: "error",
            confirmButtonText: "Aceptar"
          });
        }
      },
      error => {
        this.loading.hide();
        Swal.fire({
          title: error.statusText,
          // text: error.error.userMessage,
          type: "error",
          confirmButtonText: "Aceptar"
        });
      }
    );
  }

  public removewhiteSpace() {
    const inputValue = this.recoverPasswordForm.controls.password.value;
    let noSpace = inputValue.replace(/ /g, "");
    this.recoverPasswordForm.controls.password.setValue(noSpace);
  }

  public removewhiteSpaceConfirm() {
    const inputValue = this.recoverPasswordForm.controls.confirmPassword.value;
    let noSpace = inputValue.replace(/ /g, "");
    this.recoverPasswordForm.controls.confirmPassword.setValue(noSpace);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();  
  }

}
