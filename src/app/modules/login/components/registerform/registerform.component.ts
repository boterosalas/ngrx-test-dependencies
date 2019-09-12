import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from 'src/app/validators/confirm-password.validator';

@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.scss']
})
export class RegisterformComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) { }

  registerForm: FormGroup;
  showTerms: boolean;
  showRegisterForm: boolean;
  acceptTerms: boolean;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(50)]],
      lastName: ["", [Validators.required, Validators.maxLength(50)]],
      idType: ["", Validators.required],
      id: ["", [Validators.required, Validators.maxLength(16)]],
      phone: ["", [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      email: ["",[ Validators.required, Validators.pattern(this.emailPattern), Validators.maxLength(64)]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      confirmPassword: [""],
    }, {validator: ConfirmPasswordValidator.MatchPassword });
    this.showTerms = false;
    this.showRegisterForm = true;
    this.acceptTerms = false;

  }

  public nextStep() {
    this.showTerms = true;
    this.showRegisterForm = false;
  }

  public register() {
    console.log(this.registerForm.value);
  }

  public acceptTermsCheck() {
    this.acceptTerms = !this.acceptTerms;
  }

}
