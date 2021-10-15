import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ActionUser } from 'src/app/interfaces/actionUser';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  @Input() data: ActionUser;
  idAdmin: string;
  private subscription: Subscription = new Subscription();

  constructor(
    private user: UserService,
    private utils: UtilsService
  ) { }

  ngOnInit(): void {
  }

  public changeValueService(event: any, service: string) {
    if (event.checked === false) {
      if (service === 'comunications') {
        this.changeComunications(this.data.userId, event.checked);
      }
      if (service === 'status') {
        this.changeStateUser(this.data.userId, event.checked);
      }
      if (service === 'internal') {
        this.changeInternal(this.data.userId, event.checked);
      }
    } else {
      if (event.checked === true) {
        if (service === 'comunications') {
          this.changeComunications(this.data.userId, event.checked);
        }
        if (service === 'status') {
          this.changeStateUser(this.data.userId, event.checked);
        }
        if (service === 'internal') {
          this.changeInternal(this.data.userId, event.checked);
        }
      }
    }
  }

  private callMsg(msg: string) {
    this.utils.openSnackBar(msg, 'Cerrar')
  }

  private changeComunications(userId, value) {
    this.subscription = this.user.comunitcations(userId, value).subscribe((user: any) => {
      value === true ? this.callMsg(user.userMessage) : this.callMsg(user.userMessage);
    });
  }

  private changeStateUser(userId, valueState) {
    this.subscription = this.user.statusUser(userId, valueState).subscribe((respState: any) => {
      valueState === true ? this.callMsg(respState.userMessage) : this.callMsg(respState.userMessage);
    });
  }

  private changeInternal(userId, valueInternal) {
    this.subscription = this.user.changeOrigin(userId, valueInternal).subscribe((respInternal: any) => {
      valueInternal === true ? this.callMsg(respInternal.userMessage) : this.callMsg(respInternal.userMessage);
    });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
