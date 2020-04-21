import { Component, OnInit } from '@angular/core';
import { LinksService } from 'src/app/services/links.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {

  constructor(
    private file: LinksService,
    private usersService: UserService,
    private _snackBar: MatSnackBar,
  ) { }

 
  private subscription: Subscription = new Subscription();
  email: string;

  ngOnInit() {
  }

    /**
   * Abre el mensaje de confirmacion
   * @param message
   * @param action
   */

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }

  public exportBusiness() {
    console.log('export');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
