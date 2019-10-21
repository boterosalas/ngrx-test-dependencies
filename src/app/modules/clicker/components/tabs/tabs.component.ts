import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { ProductSearchService } from "src/app/services/product-search.service";
import { LoaderService } from "src/app/services/loader.service";
import {
  MatSnackBar,
  PageEvent,
  MatBottomSheet,
  MatPaginatorIntl
} from "@angular/material";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { ShortenerService } from "src/app/services/shortener.service";
import { AuthService } from "src/app/services/auth.service";
import { Subscription } from "rxjs";
import { SearchProduct } from "src/app/interfaces/search-product";
import { distinctUntilChanged } from "rxjs/operators";
import { DialogComponent } from "src/app/modules/shared/components/dialog/dialog.component";
import { ContentService } from 'src/app/services/content.service';
import { LinksService } from 'src/app/services/links.service';

@Component({
  selector: "app-tabs",
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.scss"]
})
export class TabsComponent extends MatPaginatorIntl  implements OnInit {
  constructor(
    private sp: ProductSearchService,
    private loading: LoaderService,
    private dialog: MatBottomSheet,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private user: UserService,
    private shortUrl: ShortenerService,
    private auth: AuthService,
    private content: ContentService,
    private links: LinksService
  ) {
    super();

    /**
     * Traduccion del paginador
     */

    this.itemsPerPageLabel = 'Productos por página';
    this.nextPageLabel = 'Página siguiente';
    this.previousPageLabel = 'Página anterior';
    this.lastPageLabel = 'Última página';
    this.firstPageLabel = 'Primera página';

    this.getRangeLabel = function (page, pageSize, length) {
      if (length === 0 || pageSize === 0) {
        return '0 de ' + length;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      // If the start index exceeds the list length, do not try and fix the end index to the end.
      const endIndex =
        startIndex < length
          ? Math.min(startIndex + pageSize, length)
          : startIndex + pageSize;
      return startIndex + 1 + ' de ' + endIndex + ' productos de ' + length;
    };

  }

  term: string;

  @ViewChild("templateDialog", { static: false }) template: TemplateRef<any>;
  @ViewChild("paginator", { static: false }) paginator: any;

  private subscription: Subscription = new Subscription();
  productsList: SearchProduct;
  showResults: boolean;
  showNotFound: boolean;
  paginate: string;
  totalItems: number;
  pageSize: number = 6;
  pageTo: number = 6;
  pageSizeOptions: number[] = [6, 12, 24, 50];
  url: string;
  urlshorten: string;
  formLink: FormGroup;
  identification: string;
  pageIndex: number = 0;
  isLoggedIn: any;
  assureds = [];
  trips = [];
  date: any;
  plu: string;
  business: string;

  ngOnInit() {
    this.showNotFound = false;
    this.showResults = false;

    
    /**
     * verifica si el usuario esta logueado y se obtiene la identificacion
     */

    this.isLoggedIn = this.auth.isLoggedIn();
    if (this.isLoggedIn) {
      this.user.userInfo$.pipe(distinctUntilChanged()).subscribe(val => {
        if (!!val) {
          this.identification = val.identification;
        }
      });
    }

    this.getDate();
    this.Assured();
    this.Trip();
  }

  private formShareLink() {
    this.formLink = this.fb.group({
      link: [this.url]
    });
  }

  /**
   * Metodo para buscar los productos paginados
   * @param term 
   * @param from 
   * @param to 
   * 
   */

  public searchProductPaginate(term: string, from = 1, to = this.pageTo) {
    if (term !== this.paginate) {
      this.paginate = term;
      this.pageIndex = 0;
    }
    const params = { term, from, to };
    this.loading.show();
    this.subscription = this.sp.getProductsPagination(params).subscribe(
      (resp: any) => {
        this.loading.hide();
        const parsed = JSON.parse(resp.json);
        this.totalItems = resp.total;
        if (parsed.length > 0) {
          this.showResults = true;
          this.showNotFound = false;
          this.productsList = JSON.parse(resp.json);
        } else {
          this.showNotFound = true;
          this.showResults = false;
        }
      },
      error => {
        this.loading.hide();
        this.showNotFound = true;
        this.showResults = false;
      }
    );
  }

  /**
   * Paginacion
   * @param paginate 
   */

  public pagination(paginate: any) {
    this.pageIndex = paginate.pageIndex;
    paginate.length = this.totalItems;
    const from = paginate.pageSize * paginate.pageIndex + 1;
    const to = paginate.pageSize * (paginate.pageIndex + 1);
    this.searchProductPaginate(this.paginate, from, to);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // MatPaginator Output
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(",").map(str => +str);
  }

  /**
   * Metodo para abrir la modal con el producto seleccionado del exito
   * @param product 
   */

  public dataProduct(product) {
    const productUrl = product.linkText;
    this.url = `https://www.exito.com/${productUrl}/p?utm_source=clickam&utm_medium=referral&utm_campaign=${this.identification}`;
    this.shortUrl.getShortUrl(this.url).subscribe((resp: any) => {
      this.urlshorten = resp;
    });
    this.formShareLink();
    const title = product.productName;
    const id = product.productId;
    const img = product.items[0].images[0].imageUrl;
    const price = product.items[0].sellers[0].commertialOffer.Price;
    const template = this.template;
    const showClose = false;
    const showCloseIcon = true;
    const showProduct = true;
    const showshowTitle = false;
    const buttonClose = "Cerrar";
    const showPlu = true;
    const plu = product.items[0].itemId;
    this.plu = product.items[0].itemId;
    this.business = 'exito';
    this.dialog.open(DialogComponent, {
      data: {
        title,
        template,
        showClose,
        showCloseIcon,
        img,
        plu,
        price,
        showProduct,
        showPlu,
        showshowTitle,
        buttonClose,
        id
      }
    });
  }

  /**
   * Metodo para abrir la modal con el producto seleccionado del seguros
   * @param assured 
   */

  public dataAssured(assured) {
    const dataAssuredUrl = `${assured.link}${this.identification}`;
    this.url = dataAssuredUrl;
    this.shortUrl.getShortUrl(this.url).subscribe((resp: any) => {
      this.urlshorten = resp;
    });
    this.formShareLink();
    const title = assured.description;
    const id = assured.productId;
    const img = assured.imageurl;
    const price = assured.commission;
    const template = this.template;
    const showClose = false;
    const showCloseIcon = true;
    const showProduct = true;
    const showComission = true;
    const showshowTitle = false;
    const buttonClose = "Cerrar";
    this.plu = '';
    this.business = 'seguros'
    this.dialog.open(DialogComponent, {
      data: {
        title,
        template,
        showClose,
        showCloseIcon,
        img,
        price,
        showProduct,
        showshowTitle,
        showComission,
        buttonClose,
        id
      }
    });

  }

  /**
   * Metodo para abrir la modal con el producto seleccionado del viajes
   * @param trip 
   */

  public dataTrip(trip) {
    const datatripUrl = trip.link;
    this.url = `${datatripUrl}${this.identification}`;
    this.shortUrl.getShortUrl(this.url).subscribe((resp: any) => {
      this.urlshorten = resp;
    });
    this.formShareLink();
    const title = trip.description;
    const id = trip.productId;
    const img = trip.imageurl;
    const price = trip.commission;
    const template = this.template;
    const showClose = false;
    const showCloseIcon = true;
    const showProduct = true;
    const showComission = true;
    const showshowTitle = false;
    const buttonClose = "Cerrar";
    this.plu = '';
    this.business = 'viajes'
    this.dialog.open(DialogComponent, {
      data: {
        title,
        template,
        showClose,
        showCloseIcon,
        img,
        price,
        showProduct,
        showshowTitle,
        showComission,
        buttonClose,
        id
      }
    });

  }

  /**
   * Abre el mensaje de confirmacion de copiado del link
   * @param message 
   * @param action 
   */

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }

  /* To copy Text from Textbox */
  public copyInputMessage(inputElement: any) {
    inputElement.select();
    document.execCommand("copy");
    inputElement.setSelectionRange(0, 0);
    this.openSnackBar("Se ha copiado el link al portapapeles", "Cerrar");
  }

  /**
   * Metodo para listar los seguros
   */

  public Assured() {
    this.content.getAssured().subscribe(assured => {
      this.assureds = assured;
    });
  }

   /**
   * Metodo para listar los viajes
   */

  public Trip() {
    this.content.getTrips().subscribe(trip => {
      this.trips = trip;
    });
  }

   /**
   * Metodo para dalvar los links generados
   */

  public saveLink(){
    let data = {
      link: this.urlshorten,
      identification: this.identification,
      plu: this.plu,
      business: this.business,
      creationDate: this.date
    }
    this.links.saveLink(data).subscribe();
  }

  /**
   * Obtiene la fecha actual
   */

  public getDate(){
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    this.date = date+' '+time;
  }

}
