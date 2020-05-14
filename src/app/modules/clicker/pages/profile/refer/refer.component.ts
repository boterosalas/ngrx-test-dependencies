import {
  Component,
  OnInit,
  ViewChildren,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { NgNavigatorShareService } from "ng-navigator-share";
import { LinksService } from "src/app/services/links.service";
import { Subscription } from "rxjs";
import Swal from "sweetalert2";
import { share } from "rxjs/operators";
import { url } from "inspector";
import { ResponseService } from "src/app/interfaces/response";

@Component({
  selector: "app-refer",
  templateUrl: "./refer.component.html",
  styleUrls: ["./refer.component.scss"],
})
export class ReferComponent implements OnInit, OnDestroy {
  private ngNavigatorShareService: NgNavigatorShareService;
  private subscription: Subscription = new Subscription();

  @ViewChild("share", { static: false }) refer: any;
  urlClicker: string;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    ngNavigatorShareService: NgNavigatorShareService,
    private link: LinksService
  ) {
    this.ngNavigatorShareService = ngNavigatorShareService;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.urlClicker = this.refer.urlValue;
  }

  public goback() {
    this.router.navigate(["./"]);
  }

  public sendEmail(email) {
    let dataEmail = {
      email,
      link: this.urlClicker,
    };

    this.subscription = this.link.saveLinkRefer(dataEmail).subscribe(
      (resp: ResponseService) => {
        if (resp.state === "Success") {
          Swal.fire({
            title: "Invitación enviada",
            text: resp.userMessage,
            type: "success",
            confirmButtonText: "Aceptar",
            confirmButtonClass: "accept-refer-alert-success",
          })
        } else {
          Swal.fire({
            title: "Ups algo salió mal",
            text: resp.userMessage,
            type: "error",
            confirmButtonText: "Aceptar",
            confirmButtonClass: "accept-refer-alert-error",
          });
        }
      },
      (error) => {
        Swal.fire({
          title: error.statusText,
          // text: error.error.userMessage,
          type: "error",
          confirmButtonText: "Aceptar",
          confirmButtonClass: "accept-refer-alert-invalid",
        });
      }
    );
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
      duration: 5000,
    });
  }

  share(url: string) {
    this.ngNavigatorShareService
      .share({
        title: "",
        text: "",
        url: url,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
