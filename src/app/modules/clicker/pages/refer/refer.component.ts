import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import { Router } from "@angular/router";
import { MatSnackBar, MatPaginator, MatTableDataSource } from "@angular/material";
import { NgNavigatorShareService } from "ng-navigator-share";
import { LinksService } from "src/app/services/links.service";
import { Subscription } from "rxjs";
import Swal from "sweetalert2";
import { ResponseService } from "src/app/interfaces/response";
import { Refer } from 'src/app/interfaces/refer';
import { ContentService } from "src/app/services/content.service";
import { TokenService } from "src/app/services/token.service";

@Component({
  selector: "app-refer",
  templateUrl: "./refer.component.html",
  styleUrls: ["./refer.component.scss"],
})
export class ReferComponent implements OnInit, OnDestroy {
  private ngNavigatorShareService: NgNavigatorShareService;
  private subscription: Subscription = new Subscription();

  @ViewChild("share", { static: false }) public refer: Refer;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public urlClicker: Object;
  dataSource: any;
  pageIndex: number = 0;
  pageSize: number = 20;
  pageTo: number = 20;
  totalItems: number;
  paginate: string;
  orderBy: string;
  from: any;
  to: any;
  amount: any;
  amountReferred: any;

  constructor(
    private router: Router,
    private content: ContentService,
    private token: TokenService,
    private _snackBar: MatSnackBar,
    ngNavigatorShareService: NgNavigatorShareService,
    private link: LinksService
  ) {
    this.ngNavigatorShareService = ngNavigatorShareService;
  }

  ngOnInit() {
    this.getReferrals();
    this.amount = localStorage.getItem('Amount');
    this.amountReferred = localStorage.getItem('AmonuntReferred');
  }

  ngAfterViewInit() {
    this.urlClicker = this.refer['urlValue'];
  }

  public goback() {
    this.router.navigate(["./"]);
  }

  public sendEmail(email) {
    let dataEmail = {
      email,
      link: this.urlClicker,
    };
    this.generateLink(dataEmail)
    this.subscription = this.link.saveLinkRefer(dataEmail).subscribe(
      (resp: ResponseService) => {
        if (resp.state === "Success") {
          Swal.fire({
            title: "Invitación enviada",
            text: resp.userMessage,
            type: "success",
            confirmButtonText: "Aceptar",
            confirmButtonClass: "accept-refer-alert-success",
          }).then(() => {
            this.getReferrals();
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
  public generateLink(dataEmail: any) {
    let tokenInfo = this.token.userInfo();
    let idClicker = tokenInfo.idclicker;
    let formData: FormData = new FormData();
    formData.append('idClicker', idClicker);
    formData.append('type', 'Generate');
    this.content.setClick(formData).subscribe((resp) => {
      console.log("Responde")
    })
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

  public shareEvent(url: string) {
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

  public getReferrals(from = 1, to = this.pageTo) {
    let params = { from, to };
    this.subscription = this.link.getReferrals(params).subscribe(resp => {
      this.dataSource = new MatTableDataSource<any>(resp.referrals);
      this.totalItems = resp.total;
    });
  }

  public pagination(paginate: any) {
    this.pageIndex = paginate.pageIndex;
    paginate.length = this.totalItems;
    this.from = paginate.pageSize * paginate.pageIndex + 1;
    this.to = paginate.pageSize * (paginate.pageIndex + 1);
    this.getReferrals(this.from, this.to);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
