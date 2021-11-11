import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-social-form',
  templateUrl: './social-form.component.html',
  styleUrls: ['./social-form.component.scss'],
})
export class SocialFormComponent implements OnInit, OnDestroy {
  socialForm: FormGroup;
  socialInfo: any;
  private subscription: Subscription = new Subscription();


  constructor(private fb: FormBuilder, private user: UserService, private utils: UtilsService) {}

  ngOnInit(): void {
    this.socialFormInfo();
    this.subscription = this.user.userInfo$.subscribe((val) => {
      if (!!val) {
        const { webSite, facebook, instagram, cellphone, youtube, firstNames, lastNames } = val;
        this.socialForm.controls.website.setValue(webSite);
        this.socialForm.controls.facebook.setValue(facebook);
        this.socialForm.controls.instagram.setValue(instagram);
        this.socialForm.controls.youtube.setValue(youtube);
        this.socialForm.controls.cellphone.setValue(cellphone);
        this.socialForm.controls.firstNames.setValue(firstNames);
        this.socialForm.controls.lastNames.setValue(lastNames);
      }
    });
  }

  public socialFormInfo() {
    this.socialForm = this.fb.group({
      website: [],
      facebook: [],
      instagram: [],
      youtube: [],
      cellphone: [],
      firstNames : [],
      lastNames : []
    });
  }

  saveSocial() {
    const socialData = this.socialForm.value;

    this.subscription = this.user.updateUser(socialData).subscribe(
      (user: any) => {
        if (user.state === 'Success') {
          this.subscription = this.user.getProfile();
          this.utils.openSnackBar(user.userMessage, 'Cerrar');
        }
      },
      (err) => {
        this.utils.openSnackBar(err.userMessage, 'Cerrar');
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
