import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MasterDataService } from 'src/app/services/master-data.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ConfirmPasswordValidator } from 'src/app/validators/confirm-password.validator';
import { ProfileFormComponent } from '../profile-form/profile-form.component';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent extends ProfileFormComponent implements OnInit  {

  mail:boolean;
  sms: boolean;
  userId: string;

  subscription: Subscription = new Subscription();

  constructor(
     fb: FormBuilder,
     user: UserService,
     auth: AuthService,
     loader: LoaderService,
     dialog: MatDialog,
     snackBar: MatSnackBar,
     utils: UtilsService,
     personalInfo: MasterDataService
  ) {
    super(fb,user, auth, loader, dialog, snackBar, utils, personalInfo);
  }

  ngOnInit(): void {
    this.formProfilePass();
    this.subscription = this.user.userInfo$.subscribe((val) => {
      if (!!val) {
        this.userId = val.userId;
        this.mail = val.receiveEmail;
        this.sms = val.receiveSms;
      }})
  }

  public formProfilePass() {
    this.profileFormPass = this.fb.group(
      {
        actualPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        password: ['', [Validators.minLength(6), Validators.maxLength(20), Validators.pattern(new RegExp(this.passwordPattern))]],
        confirmPassword: ['', [Validators.minLength(6), Validators.maxLength(20)]],
      },
      {
        validator: [ConfirmPasswordValidator.MatchPassword],
      }
    );
  }

  public notifications(e: any, typeNotification: string) {
    if(e.checked && typeNotification === 'email') {
      this.mail = true;
    }
    if(e.checked && typeNotification === 'sms') {
      this.sms = true;
    }

    const dataUser = {
      userId: this.userId,
      receiveSms: this.sms,
      receiveEmail: this.mail
    }

    this.user.setReceiveCommunications(dataUser).subscribe((comunication: ResponseService) => {
      this.utils.openSnackBar(comunication.userMessage, 'Cerrar');
    });

  }

}
