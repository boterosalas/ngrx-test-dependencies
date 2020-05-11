import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-refer',
  templateUrl: './refer.component.html',
  styleUrls: ['./refer.component.scss']
})
export class ReferComponent implements OnInit {

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  public goback() {
    this.router.navigate(['./']);
  }

  public sendEmail(email) {
    console.log(email);
  }

      /* To copy Text from Textbox */
      public copyInputMessage(inputElement: any) {
        inputElement.select();
        document.execCommand("copy");
        inputElement.setSelectionRange(0, 0);
        this.openSnackBar("Se ha copiado el link al portapapeles", "Cerrar");
      }

      
   /**
   * Abre el mensaje de confirmacion de copiado del link
   * @param message
   * @param action
   */

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }

}
