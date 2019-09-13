import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfirmPasswordValidator } from "src/app/validators/confirm-password.validator";
import { RegisterUserService } from "src/app/services/register-user.service";
import Swal from "sweetalert2";
import { ResponseService } from 'src/app/interfaces/response';

@Component({
  selector: "app-registerform",
  templateUrl: "./registerform.component.html",
  styleUrls: ["./registerform.component.scss"]
})
export class RegisterformComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private registerUser: RegisterUserService
  ) {}

  registerForm: FormGroup;
  showTerms: boolean;
  showRegisterForm: boolean;
  acceptTerms: boolean;
  idUserType = [];
  emailPattern = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}";
  namePattern = "[a-zA-Z0-9 ]+";
  numberPattern = "^(0|[0-9][0-9]*)$";

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        name: [
          "",
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern(this.namePattern)
          ]
        ],
        lastName: [
          "",
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern(this.namePattern)
          ]
        ],
        idType: ["", Validators.required],
        id: [
          "",
          [
            Validators.required,
            Validators.maxLength(11),
            Validators.pattern(this.numberPattern)
          ]
        ],
        phone: [
          "",
          [
            Validators.required,
            Validators.maxLength(10),
            Validators.minLength(10),
            Validators.pattern(this.numberPattern)
          ]
        ],
        email: [
          "",
          [
            Validators.required,
            Validators.pattern(this.emailPattern),
            Validators.maxLength(64)
          ]
        ],
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
      },
      { validator: ConfirmPasswordValidator.MatchPassword }
    );
    this.showTerms = false;
    this.showRegisterForm = true;
    this.acceptTerms = false;
    this.getidType();
  }

  public nextStep() {
    this.showTerms = true;
    this.showRegisterForm = false;
  }

  public register() {
    let registerForm = {
      Email: this.registerForm.controls.email.value,
      FirstNames: this.registerForm.controls.name.value,
      LastNames: this.registerForm.controls.lastName.value,
      Identification: this.registerForm.controls.id.value,
      Cellphone: this.registerForm.controls.phone.value,
      Password: btoa(this.registerForm.controls.password.value),
      IdType: this.registerForm.controls.idType.value
    };

    this.registerUser.registerUser(registerForm).subscribe(
      (resp: ResponseService) => {
        if (resp.state === "Success") {
          Swal.fire({
            title: "Registro valido",
            text: "Te Has registrado correctamente",
            type: "success",
            confirmButtonText: "Aceptar"
          });
        } else {
          Swal.fire({
            title: "Registro invalido",
            text: resp.userMessage,
            type: "error",
            confirmButtonText: "Aceptar"
          });
        }
      },
      error => {
        Swal.fire({
          title: "Registro invalido",
          text: error.error,
          type: "error",
          confirmButtonText: "Aceptar"
        });
      }
    );
  }

  public acceptTermsCheck() {
    this.acceptTerms = !this.acceptTerms;
  }

  public getidType() {
    this.registerUser.idType().subscribe(res => {
      this.idUserType = res.objectResponse;
    });
  }

  public removewhiteSpace() {
    const inputValue = this.registerForm.controls.password.value;
    let noSpace = inputValue.replace(/ /g, "");
    this.registerForm.controls.password.setValue(noSpace);
  }

  public removewhiteSpaceConfirm() {
    const inputValue = this.registerForm.controls.confirmPassword.value;
    let noSpace = inputValue.replace(/ /g, "");
    this.registerForm.controls.confirmPassword.setValue(noSpace);
  }
}
