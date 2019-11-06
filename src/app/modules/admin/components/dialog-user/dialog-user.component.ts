import { Component, OnInit, Inject, Output, EventEmitter, OnDestroy } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

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
  ) {}

  @Output() state = new EventEmitter();
  @Output() comunications = new EventEmitter();
  @Output() verified = new EventEmitter();
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();

    /**
     * verifica si el usuario esta logueado y se obtiene la identificacion
     */

    if (this.isLoggedIn) {
      this.subscription = this.user.userInfo$.pipe(distinctUntilChanged()).subscribe(val => {
        if (!!val) {
          this.idAdmin = val.userId;
        }
      });
    }
  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }

}
