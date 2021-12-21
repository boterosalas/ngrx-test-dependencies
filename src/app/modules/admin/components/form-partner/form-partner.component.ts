import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { UserService } from 'src/app/services/user.service';
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
    private utils: UtilsService,
    private user: UserService
  ) {}

  private subscription: Subscription = new Subscription();
  partnerForm: FormGroup;
  passwordPattern = '(?=.*[a-zA-Z])(?=.*[0-9])';
  emailPattern = '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}';

  ngOnInit() {
    this.partnerForm = this.fb.group(
      {
        firstNames: ['', Validators.required],
        lastNames: ['', Validators.required],
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
      firstNames: this.partnerForm.controls.firstNames.value,
      lastNames: this.partnerForm.controls.lastNames.value,
      email: this.partnerForm.controls.email.value,
      password: btoa(this.partnerForm.controls.password.value),
      rol: "PARTNER",
      idBusiness: this.data
    };
    this.user.addUserAdmin(dataUser).subscribe((createParner:ResponseService) => {
      this.utils.openSnackBar(createParner.userMessage, 'cerrar');
      this.onNoClick();
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
