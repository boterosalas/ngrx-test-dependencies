import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-profile-form",
  templateUrl: "./profile-form.component.html",
  styleUrls: ["./profile-form.component.scss"]
})
export class ProfileFormComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private user: UserService,
    private auth: AuthService
  ) {}

  private subscription: Subscription = new Subscription();
  profileForm: FormGroup;
  isLoggedIn: any;
  name: string;
  lastName: string;
  email:string;
  phone: string;
  id: string;

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
    if (this.isLoggedIn) {
      this.subscription = this.user.userInfo$.pipe(distinctUntilChanged()).subscribe(val => {
        if (!!val) {
          this.name = val.firstNames;
          this.lastName = val.lastNames;
          this.email = val.email;
          this.phone = val.cellphone;
          this.id = val.identification;
        }
        this.formProfile();
      });
    }
    

    
  }

  public formProfile() {
    this.profileForm = this.fb.group({
      name: [{value: this.name, disabled: true}],
      lastName: [{value:this.lastName, disabled: true}],
      email: [{value:this.email, disabled: true}],
      phone: [{value:this.phone, disabled: true}],
      id: [{value:this.id, disabled: true}]
    });
  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }

}
