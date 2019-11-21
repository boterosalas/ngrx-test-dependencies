import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/services/auth.service";
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: "app-profile-form",
  templateUrl: "./profile-form.component.html",
  styleUrls: ["./profile-form.component.scss"]
})
export class ProfileFormComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private user: UserService,
    private auth: AuthService,
    private loader: LoaderService
  ) {}

  private subscription: Subscription = new Subscription();
  profileForm: FormGroup;
  isLoggedIn: any;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  id: string;
  address: string;
  bank: string;
  bankAccountNumber: string;
  typeBankAccount: string;
  userId: string;
  isEmployee:boolean;

  ngOnInit() {
    
      this.subscription = this.user.userInfo$
        .subscribe(val => {
          if (!!val) {
            this.name = val.firstNames;
            this.lastName = val.lastNames;
            this.email = val.email;
            this.phone = val.cellphone;
            this.id = val.identification;
            this.address = val.address;
            this.bank = val.bank;
            this.bankAccountNumber = val.bankAccountNumber;
            this.typeBankAccount = val.typeBankAccount;
            this.userId = val.userId;
            this.isEmployee = val.isEmployeeGrupoExito;
          }
        });
    
  }

  // public formProfile() {
  //   this.profileForm = this.fb.group({
  //     name: [{ value: this.name, disabled: true }],
  //     lastName: [{ value: this.lastName, disabled: true }],
  //     email: [{ value: this.email, disabled: true }],
  //     phone: [{ value: this.phone, disabled: true }],
  //     id: [{ value: this.id, disabled: true }]
  //   });
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
