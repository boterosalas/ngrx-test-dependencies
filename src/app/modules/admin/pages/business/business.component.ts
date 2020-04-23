import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';
import { ResponseService } from 'src/app/interfaces/response';


@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit, OnDestroy {

  constructor(
    private content: ContentService,
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
    this.subscription = this.content.businessExcel().subscribe((resp:ResponseService) => {
      if(resp.state === 'Success') {
        this.openSnackBar(resp.userMessage, 'Cerrar');
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}