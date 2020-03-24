import {
  Component,
  OnInit,
  Inject,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Subscription } from "rxjs";
import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-dialog-user",
  templateUrl: "./dialog-user.component.html",
  styleUrls: ["./dialog-user.component.scss"]
})
export class DialogUserComponent implements OnInit, OnDestroy {
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private user: UserService,
    private auth: AuthService
  ) {
  }

  @Output() state = new EventEmitter();
  @Output() comunications = new EventEmitter();
  @Output() verified = new EventEmitter();
  @Output() IdentificationCard1 = new EventEmitter();
  @Output() IdentificationCard2 = new EventEmitter();
  @Output() bankCertificate = new EventEmitter();
  isLoggedIn: any;
  private subscription: Subscription = new Subscription();
  idAdmin: string;

  changeStatus() {
    this.state.emit(event);
  }

  changeComunications() {
    this.comunications.emit(event);
  }

  changeVerified() {
    this.verified.emit(event);
  }

  IdentificationCard1Download() {
    this.IdentificationCard1.emit(event);
  }

  IdentificationCard2Download() {
    this.IdentificationCard2.emit(event);
  }

  bankCardDownload() {
    this.bankCertificate.emit(event);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
