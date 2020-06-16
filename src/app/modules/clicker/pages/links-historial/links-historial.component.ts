import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  TemplateRef
} from "@angular/core";
import {
  MatTableDataSource,
  MatPaginator,
  MatDialog,
  MatSnackBar,
  MatBottomSheet
} from "@angular/material";
import { LinksService } from "src/app/services/links.service";
import { Subscription } from "rxjs";
import { FormGroup, FormBuilder } from "@angular/forms";
import { NgNavigatorShareService } from "ng-navigator-share";
import { DialogComponent } from "src/app/modules/shared/components/dialog/dialog.component";

@Component({
  selector: "app-links-historial",
  templateUrl: "./links-historial.component.html",
  styleUrls: ["./links-historial.component.scss"]
})
export class LinksHistorialComponent implements OnInit {
  dataSource: any;
  pageIndex: number = 0;
  pageSize: number = 20;
  pageTo: number = 20;
  totalItems: number;
  paginate: string;
  private subscription: Subscription = new Subscription();
  orderBy: string;
  from: any;
  to: any;
  orderOptions: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  orderValue: any;
  @ViewChild("templateCategories", { static: false })
  templateCategories: TemplateRef<any>;
  urlshorten: string = "";
  url: string;
  classButtonCopy: string;
  classButtonRefer: string;
  classButtonBuy: string;
  classButtonFacebook: string;
  classButtonTwitter: string;
  classButtonWhatsapp: string;
  classButtonShare: string;
  formLink: FormGroup;
  private ngNavigatorShareService: NgNavigatorShareService;
  tokenInfo: any;
  token: any;
  idClicker: any;
  showForm: boolean;
  reference: boolean;
  showFormCustomer: boolean;
  user: any;
  enableCopy: boolean;
  // idCustomerForm: any;
  business: any;
  plu: any;
  title: any;
  router: any;

  constructor(
    private links: LinksService,
    ngNavigatorShareService: NgNavigatorShareService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialog: MatBottomSheet
  ) {
    this.ngNavigatorShareService = ngNavigatorShareService;
  }

  ngOnInit() {
    this.orderOptions = [
      { value: "DATEDESC", description: "Más recientes" },
      { value: "DATEASC", description: "Menos recientes" },
      { value: "EFFECTIVEDESC", description: "Más efectivo" },
      { value: "EFFECTIVEASC", description: "Menos efectivo" },
    ];

    this.getLinksHistory();
  }

  public pagination(paginate: any) {
    this.pageIndex = paginate.pageIndex;
    paginate.length = this.totalItems;
    this.from = paginate.pageSize * paginate.pageIndex + 1;
    this.to = paginate.pageSize * (paginate.pageIndex + 1);
    this.getLinksHistory(this.from, this.to);
  }

  public getLinksHistory(from = 1, to = this.pageTo, orderBy = "DATEDESC") {
    const params = { from, to, orderBy };
    this.subscription = this.links.getLinkHistory(params).subscribe(resp => {
      this.dataSource = new MatTableDataSource<any>(resp.listLinkHistory);
      this.totalItems = resp.total;
    });
  }

  public order(option: string) {
    this.pageIndex = 0;
    this.getLinksHistory(1, this.pageTo, option);
    this.orderValue = option;
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

  /* To copy Text from Textbox */
  public copyInputMessage(inputElement: any) {
    inputElement.select();
    document.execCommand("copy");
    inputElement.setSelectionRange(0, 0);
    this.openSnackBar("Se ha copiado el link al portapapeles", "Cerrar");
  }

  share() {
    this.ngNavigatorShareService
      .share({
        title: "",
        text: "",
        url: this.urlshorten
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  buy() {
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (iOS) {
      window.location.assign(this.urlshorten);
    } else {
      window.open(this.urlshorten, "_blank");
    }
  }

  public dataHistory(product) {
    this.enableCopy = false;
    const dataCategoryUrl = product.link;
    this.showForm = false;
    this.urlshorten = "";
    this.reference = false;
    this.showFormCustomer = true;
    this.url = `${dataCategoryUrl}${this.idClicker}`;
    this.subscription = this.user
    let splice = product.link.split('//');
    this.urlshorten = 'https://'+ splice[1];
    this.formShareLink();
    const home = true;
    this.business = product.idbusiness;
    this.plu = product.description;
    const infoaditional = product.infoaditional;
    const img = product.imageurl;
    const showCloseIcon = true;
    const showClose = false;
    const buttonClose = "Cerrar";
    const showshowTitle = false;
    const title = product.productname;
    const showProduct = true;
    const id = product.productId;
    const history = true;
    this.classButtonWhatsapp = `gtmClicLightboxIconoWhatsApp${this.title}${product.description}`
      .replace(/\s/g, "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    this.classButtonTwitter = `gtmClicLightboxIconoTwitter${this.title}${product.description}`
      .replace(/\s/g, "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    this.classButtonFacebook = `gtmClicLightboxIconoFacebook${this.title}${product.description}`
      .replace(/\s/g, "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    this.classButtonShare = `gtmClicLightboxCompartir${this.title}${product.description}`
      .replace(/\s/g, "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    this.classButtonBuy = `gtmClicLightboxComprar${this.title}${product.description}`
      .replace(/\s/g, "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    this.classButtonRefer = `gtmClicLightboxReferir${this.title}${product.description}`
      .replace(/\s/g, "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    this.classButtonCopy = `gtmClicLightboxCopiarLink${this.title}${product.description}`
      .replace(/\s/g, "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const template = this.templateCategories;

    let dialogref = this.dialog.open(DialogComponent, {
      data: {
        template,
        infoaditional,
        showClose,
        img,
        showCloseIcon,
        showProduct,
        buttonClose,
        showshowTitle,
        id,
        title,
        home,
        history
      }
    });

    dialogref.afterDismissed().subscribe(() => {
      this.enableCopy = true;
    });
  }

  private formShareLink() {
    this.formLink = this.fb.group({
      link: [this.url]
    });
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
