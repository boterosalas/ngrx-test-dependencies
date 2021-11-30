import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ActionUser } from 'src/app/interfaces/actionUser';
import { ResponseService } from 'src/app/interfaces/response';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy, OnChanges {

  @Input() data: ActionUser;
  idAdmin: string;
  private subscription: Subscription = new Subscription();
  state: boolean;
  mail: boolean;
  sms: boolean;

  constructor(
    private user: UserService,
    private utils: UtilsService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.userState();
    this.mail = this.data.receiveemail;
    this.sms = this.data.receivesms;
  }

  public userState() {
    if (this.data.stateuser === 'Inactivo') {
      this.state = false;
    } else {
      if (this.data.stateuser === 'Activo' || this.data.stateuser === 'Registrado' || this.data.stateuser === 'Migrado') {
        this.state = true;
      }
    }

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
      this.callMsg(user.userMessage);
    });
  }

  private changeStateUser(userId, valueState) {
    this.subscription = this.user.statusUser(userId, valueState).subscribe((respState: any) => {
      this.callMsg(respState.userMessage);
    });
  }

  private changeInternal(userId, valueInternal) {
    this.subscription = this.user.changeOrigin(userId, valueInternal).subscribe((respInternal: any) => {
      this.callMsg(respInternal.userMessage);
    });
  }

  public notifications(e: any, typeNotification: string) {
    if(e.checked && typeNotification === 'email') {
      this.mail = true;
    }
    if(e.checked && typeNotification === 'sms') {
      this.sms = true;
    }

    const dataUser = {
      userId: this.data.userId,
      receiveSms: this.sms,
      receiveEmail: this.mail
    }

    this.user.setReceiveCommunications(dataUser).subscribe((comunication: ResponseService) => {
      this.utils.openSnackBar(comunication.userMessage, 'Cerrar');
    });

  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
