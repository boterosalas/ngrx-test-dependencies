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
    console.log(event, service);
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

  private changeComunications(userId, value) {
    this.subscription = this.user.comunitcations(userId, value).subscribe((user: any) => {
      if (value === true) {
        this.utils.openSnackBar(user.userMessage, 'Cerrar');
      } else {
        this.utils.openSnackBar(user.userMessage, 'Cerrar');
      }
    });
  }

  private changeStateUser(userId, value) {
    this.subscription = this.user.statusUser(userId, value).subscribe((respState: any) => {
      if (value === false) {
        this.utils.openSnackBar(respState.userMessage, 'Cerrar');
      } else {
        this.utils.openSnackBar(respState.userMessage, 'Cerrar');
      }
    });
  }

  private changeInternal(userId, value) {
    this.subscription = this.user.changeOrigin(userId, value).subscribe((respInternal: any) => {
      if (value === false) {
        this.utils.openSnackBar(respInternal.userMessage, 'Cerrar');
      } else {
        this.utils.openSnackBar(respInternal.userMessage, 'Cerrar');
      }
    });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
