import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ConfirmPasswordValidator } from 'src/app/validators/confirm-password.validator';

@Component({
  selector: 'app-form-partner',
  templateUrl: './form-partner.component.html',
  styleUrls: ['./form-partner.component.scss'],
})
export class FormPartnerComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private utils: UtilsService
  ) {}

  private subscription: Subscription = new Subscription();
  partnerForm: FormGroup;
  passwordPattern = '(?=.*[a-zA-Z])(?=.*[0-9])';
  emailPattern = '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}';

  ngOnInit() {
    this.partnerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(this.emailPattern), Validators.maxLength(64)]],
        password: [
          '',
          [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern(new RegExp(this.passwordPattern))],
        ],
        confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      },
      { validator: ConfirmPasswordValidator.MatchPassword }
    );
  }

  public savePartner() {
    const dataUser = {
      name: this.partnerForm.controls.name.value,
      email: this.partnerForm.controls.email.value,
      password: btoa(this.partnerForm.controls.password.value),
    };
    console.log(dataUser);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
