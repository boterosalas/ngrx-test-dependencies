import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  OnDestroy
} from "@angular/core";
import { LoaderService } from "src/app/services/loader.service";
import {
  MatSnackBar,
  PageEvent,
  MatBottomSheet,
  MatPaginatorIntl
} from "@angular/material";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/services/auth.service";
import { Subscription } from "rxjs";
import { SearchProduct } from "src/app/interfaces/search-product";
import { distinctUntilChanged } from "rxjs/operators";
import { DialogComponent } from "src/app/modules/shared/components/dialog/dialog.component";
import { ContentService } from "src/app/services/content.service";
import { LinksService } from "src/app/services/links.service";
import { environment } from "src/environments/environment";
import { TokenService } from "src/app/services/token.service";
import { ResponseService } from "src/app/interfaces/response";
import { NgNavigatorShareService } from 'ng-navigator-share';
import Swal from "sweetalert2";
import { SlickCarouselComponent } from 'ngx-slick-carousel';
declare var dataLayer: any

@Component({
  selector: "app-tabs",
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.scss"]
})
export class TabsComponent extends MatPaginatorIntl
  implements OnInit, OnDestroy {
  private ngNavigatorShareService: NgNavigatorShareService;
  constructor(
    private sp: ContentService,
    private loading: LoaderService,
    private dialog: MatBottomSheet,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private user: UserService,
    private auth: AuthService,
    private content: ContentService,
    private links: LinksService,
    private token: TokenService,
    ngNavigatorShareService: NgNavigatorShareService
  ) {
    super();
    this.ngNavigatorShareService = ngNavigatorShareService;
    /**
     * Traduccion del paginador
     */

    this.itemsPerPageLabel = "Productos por página";
    this.nextPageLabel = "Página siguiente";
    this.previousPageLabel = "Página anterior";
    this.lastPageLabel = "Última página";
    this.firstPageLabel = "Primera página";

    this.getRangeLabel = function(page, pageSize, length) {
      if (length === 0 || pageSize === 0) {
        return "0 de " + length;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      // If the start index exceeds the list length, do not try and fix the end index to the end.
      const endIndex =
        startIndex < length
          ? Math.min(startIndex + pageSize, length)
          : startIndex + pageSize;
      return startIndex + 1 + " de " + endIndex + " productos de " + length;
    };
  }
  @ViewChild("templateTrips", { static: false }) templateTrips: TemplateRef<any>;
  @ViewChild("templateDialog", { static: false }) template: TemplateRef<any>;
  @ViewChild("templateDialogAssured", { static: false })
  templateAssured: TemplateRef<any>;
  @ViewChild("templateCategories", { static: false })
  templateCategories: TemplateRef<any>;
  @ViewChild("paginator", { static: false }) paginator: any;

  term: string;
  private subscription: Subscription = new Subscription();
  productsList: Array<any>;
  showResults: boolean;
  showNotFound: boolean;
  paginate: string;
  totalItems: number;
  pageSize: number = 50;
  pageTo: number = 50;
  pageSizeOptions: number[] = [50];
  url: string;
  urlshorten: string = '';
  formLink: FormGroup;
  identification: string;
  pageIndex: number = 0;
  isLoggedIn: any;
  assureds = [];
  trips = [];
  categories = [];
  date: any;
  plu: string;
  business: string;
  showForm = false;
  showFormCustomer = true;
  percent: number;
  percents = [];
  percentsSearch = [];
  images = [];
  imgLogo: any;
  imgLogoAliance = [];
  idCustomer: string = "";
  buttonDisabled: boolean = true;
  numberPattern = "^(0|[0-9][0-9]*)$";
  idCustomerForm: FormGroup;
  priceAliance: any;
  listPriceAliance: any;
  totalPriceAliance: any;
  totalPriceArrays = [];
  price = [];
  totalArraysDesc: any;
  alianceSplit: string;
  alianceSplit2: string;
  nameAliance: any;
  percentModal: any;
  reference: boolean;
  orderOptions: any;
  orderValue:string;
  enableCopy: boolean = true;
  @ViewChild('slickModal', {static: true}) slickModal: SlickCarouselComponent;
  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 5,
    infinite: false,
    dots: true,
    dotClass: "slick-dots orange",
    autoplay: false,
    autoplaySpeed: 5000,
    arrows: true,
    centerPadding: "10px",
    // the magic
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          infinite: false,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          dots: false,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 300,
        settings: "unslick" // destroys slick
      }
    ]
  };

  ngOnInit() {

    setTimeout(() => {
      document.querySelector('.mat-tab-label[aria-posinset="1"]').classList.add("gtmInicioClicFiltroExitocom");
      document.querySelector('.mat-tab-label[aria-posinset="2"]').classList.add("gtmInicioClicFiltroSeguro");
      document.querySelector('.mat-tab-label[aria-posinset="3"]').classList.add("gtmInicioClicFiltroViajes");
    }, 1000);

    this.showNotFound = false;
    this.showResults = false;

    this.idCustomerForm = this.fb.group({
      identification: [
        "",
        [
          Validators.required,
          Validators.pattern(this.numberPattern),
          Validators.maxLength(10)
        ]
      ]
    });

    this.orderOptions = [
      {value: 'OrderByTopSaleDESC', description: 'Más Vendidos'},
      {value: 'OrderByReleaseDateDESC', description: 'Más recientes'},
      {value: 'OrderByPriceDESC', description: 'Mayor precio primero'},
      {value: 'OrderByNameASC', description: 'Productos de la A-Z'},
      {value: 'OrderByNameDESC', description: 'Productos de la Z-A'},
    ]
  

    /**
     * verifica si el usuario esta logueado y se obtiene la identificacion
     */

    this.isLoggedIn = this.auth.isLoggedIn();
    this.identification = this.token.userInfo().identification;

    this.getDate();
    this.Assured();
    this.getCategories();
    this.Trip();
    this.reference = false;
    
  }

  private formShareLink() {
    this.formLink = this.fb.group({
      link: [this.url]
    });
  }

  order(option) {
    this.pageIndex = 0;
    this.searchProductPaginate(this.paginate, option, 1 , this.pageTo);
    this.orderValue = option;
  }

  /**
   * Metodo para buscar los productos paginados
   * @param term
   * @param from
   * @param to
   *
   */

public searchProductPaginate(term: any, order:string ='', from = 1, to = this.pageTo) {
    if (term !== this.paginate) {
      this.paginate = term;
      this.pageIndex = 0;
    }
    
    const params = { term, order, from, to };
    this.loading.show();
    this.subscription = this.sp.getProductsPagination(params).subscribe(
      (resp: any) => {
        this.loading.hide();
        this.productsList = JSON.parse(resp.json);
        this.totalItems = resp.total;

        if (this.productsList.length > 0) {
          this.showResults = true;
          this.showNotFound = false;
          let productListCopy = [...this.productsList];
          this.productsList = productListCopy.map(_product => {
            
            _product.items = [..._product.items].sort((a, b)  => {
              if(a.sellers[0].commertialOffer.Price > 0 && b.sellers[0].commertialOffer.Price > 0 ) {
                return a.sellers[0].commertialOffer.Price - b.sellers[0].commertialOffer.Price
              } else {
                return b.sellers[0].commertialOffer.Price - a.sellers[0].commertialOffer.Price
              }
            });

            return _product;
          });
          this.aliance([this.productsList]);
        } else {
          this.showNotFound = true;
          this.showResults = false;
        }
        
        dataLayer.push({
          event: 'pushEventGA',
          categoria: 'Inicio',
          accion: 'ClicFiltroExitocom',
          etiqueta: term
        });

      },
      error => {
        this.loading.hide();
        this.showNotFound = true;
        this.showResults = false;
      }
    );
  }

  private aliance(arr: any) {
    this.percentsSearch = [];
    this.totalPriceArrays = [];
    this.imgLogoAliance = [];
    this.images = [];
    this.totalPriceAliance = "";
    arr.map(element => {
      for (const key in element) {
        let teasers = element[key].items[0].sellers[0].commertialOffer.Teasers;
        this.priceAliance =
          element[key].items[0].sellers[0].commertialOffer.Price;
        this.listPriceAliance =
          element[key].items[0].sellers[0].commertialOffer.ListPrice;

        if (teasers.length === 0) {
          teasers = [
            {
              "<Name>k__BackingField": "default_0"
            }
          ];
        }

        if (teasers.length === 1) {
          let name = teasers[0]["<Name>k__BackingField"];
          let split = name.split("_");
          let logo = split[0];
          let percent = split[1];
          this.percentsSearch.push(percent);
          this.images.push(logo);
        } else {
          if (teasers.length === 2) {
            let name = teasers[0]["<Name>k__BackingField"];
            let name2 = teasers[1]["<Name>k__BackingField"];
            let split = name.split("_");
            let split2 = name2.split("_");
            let logo = split[0];
            let logo2 = split2[0];
            let percent = split[1];
            let percent2 = split2[1];
            if (percent > percent2) {
              this.percentsSearch.push(percent);
              this.images.push(logo);
            } else {
              this.percentsSearch.push(percent2);
              this.images.push(logo2);
            }
          }
        }

        this.getImages(this.images[key]);
        this.imgLogoAliance.push(this.imgLogo);

        this.totalPriceAliance =
          this.listPriceAliance -
          this.listPriceAliance * (this.percentsSearch[key] / 100);
        this.totalPriceArrays.push(this.totalPriceAliance);
      }
    });
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
    this.searchProductPaginate(this.paginate, this.orderValue, from, to);
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
    this.urlshorten = '';
    this.reference = false;
    if (environment.production === false) {
      const productUrl = product.link;
      this.url = `${productUrl}?utm_source=clickam&utm_medium=referral&utm_campaign=${this.identification}`;
    } else {
      const productUrl = product.linkText;
      this.url = `https://www.exito.com/${productUrl}/p?utm_source=clickam&utm_medium=referral&utm_campaign=${this.identification}`;
    }
    this.subscription = this.user
      .getShortUrl(this.url)
      .subscribe((resp: any) => {
        this.urlshorten = resp;
        this.saveLink();
        this.enableCopy = false;
      });
    this.idCustomerForm.controls.identification.setValue("");
    this.idCustomerForm.reset();
    this.formShareLink();
    const title = product.productName;
    const id = product.productId;
    const img = product.items[0].images[0].imageUrl;
    const price = product.items[0].sellers[0].commertialOffer.Price;
    const discount = product.items[0].sellers[0].commertialOffer.ListPrice;
    const template = this.template;
    const showClose = false;
    const showCloseIcon = true;
    const showProduct = true;
    const showshowTitle = false;
    const buttonClose = "Cerrar";
    const showPlu = true;
    const plu = product.items[0].itemId;
    this.plu = product.items[0].itemId;
    this.business = "exito";
    const home = true;
    let teasers = product.items[0].sellers[0].commertialOffer.Teasers;
    const exito = true;

    if (teasers.length === 0) {
      teasers = [
        {
          "<Name>k__BackingField": "default_0"
        }
      ];
    }

    if (teasers.length === 1) {
      let name = teasers[0]["<Name>k__BackingField"];
      let split = name.split("_");
      let logo = split[0];
      this.alianceSplit = split[1];
      this.percentModal = this.alianceSplit;
      this.getImages(logo);
    } else {
      if (teasers.length === 2) {
        let name = teasers[0]["<Name>k__BackingField"];
        let name2 = teasers[1]["<Name>k__BackingField"];
        let split = name.split("_");
        let split2 = name2.split("_");
        let logo = split[0];
        let logo2 = split2[0];
        this.alianceSplit = split[1];
        this.alianceSplit2 = split2[1];
        if (this.alianceSplit > this.alianceSplit2) {
          this.percentModal = this.alianceSplit;
          this.getImages(logo);
        } else {
          this.percentModal = this.alianceSplit2;
          this.getImages(logo2);
        }
      }
    }

    const imgLogo = this.imgLogo;
    const aliance = this.percentModal;

    let dialogref = this.dialog.open(DialogComponent, {
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
        id,
        discount,
        home,
        aliance,
        imgLogo,
        exito
      }
    });

    dialogref.afterDismissed().subscribe(() => {
      this.enableCopy = true;
    })


  }

  private getImages(text: string) {
    switch (text) {
      case "exito1":
        this.imgLogo =
          "https://d3ez54m90carx6.cloudfront.net/logo-bank-tuya-3dwydtsjyhmy22j.png";
        break;
      case "exito2":
        this.imgLogo =
          "https://d3ez54m90carx6.cloudfront.net/logo-bank-tuya-3oc0pwkjyhmzi29.png";
        break;
      case "colpatria1":
        this.imgLogo =
          "https://d3ez54m90carx6.cloudfront.net/logo-bank-colpatria-3oc0pwkjyhniolc.png";
        break;
      case "bogota1":
        this.imgLogo =
          "https://d3ez54m90carx6.cloudfront.net/logo-bank-bogota-3dwydtsjyhnn0v1.png";
        break;
      case "colpatriascotiabank1":
        this.imgLogo =
          "https://d3ez54m90carx6.cloudfront.net/logo-bank-scotiaBankColpatria-3dwydtsjyhnlx0r.png";
        break;
      case "colpatria2":
        this.imgLogo =
          "https://d3ez54m90carx6.cloudfront.net/logo-bank-colpatria-3oc0pwkjyhnjjjd.png";
        break;
      case "colpatriascotiabank2":
        this.imgLogo =
          "https://d3ez54m90carx6.cloudfront.net/logo-bank-scotiaBankColpatria-3dwydtsjyhnmd9o.png";
        break;
      case "scotiabank1":
        this.imgLogo =
          "https://d3ez54m90carx6.cloudfront.net/logo-bank-scotiaBankColpatria-3oc0pwkjyhnl32l.png";
        break;
      case "visa":
        this.imgLogo =
          "https://d3ez54m90carx6.cloudfront.net/logo-bank-visa-3oc0pwkjyhnqkbs.png";
        break;
      case "aval":
        this.imgLogo =
          "https://d3ez54m90carx6.cloudfront.net/logo-bank-aval-3dwydtsjyhnpl3m.png";
        break;
      case "occidente1":
        this.imgLogo =
          "https://d3ez54m90carx6.cloudfront.net/logo-bank-occidente-3oc0pwkjyhnomk3.png";
        break;
      case "bogota2":
        this.imgLogo =
          "https://d3ez54m90carx6.cloudfront.net/logo-bank-bogota-3dwydtsjyhnnqgr.png";
        break;
      case "mastercard":
        this.imgLogo =
          "https://d3ez54m90carx6.cloudfront.net/logo-bank-mastercard-3oc0pwkjyhnsecq.png";
        break;
      case "davivienda1":
        this.imgLogo =
          "https://d3ez54m90carx6.cloudfront.net/logo-bank-davivienda-3dwydtsjyhnt6eo.png";
        break;
      case "davivienda3":
        this.imgLogo =
          "https://d3ez54m90carx6.cloudfront.net/logo-bank-davivienda-3oc0pwkjyhnuoxx.png";
        break;
      case "coomeva1":
        this.imgLogo =
          "https://d3ez54m90carx6.cloudfront.net/logo-bank-coomeva-3oc0pwkjyhnvboq.png";
        break;
      case "codensa1":
        this.imgLogo =
          "https://d3ez54m90carx6.cloudfront.net/logo-bank-codensa-3dwydtsjyhn0fzz.png";
        break;
      case "bancolombia2":
        this.imgLogo =
          "https://d3ez54m90carx6.cloudfront.net/logo-bank-bancolombia-3dwydtsjyhn3xpy.png";
        break;
      case "bancolombia1":
        this.imgLogo =
          "https://d3ez54m90carx6.cloudfront.net/logo-bank-bancolombia-3dwydtsjyhn1lhq.png";
        break;
      case "popular1":
        this.imgLogo =
          "https://d3ez54m90carx6.cloudfront.net/logo-bank-banco-popular-7lvp9sk0gu7rqx.png";
        break;
      case "itau1":
        this.imgLogo =
          "https://d3ez54m90carx6.cloudfront.net/logo-bank-itau-7lvp9sk0gu986p.png";
        break;
      default:
        this.imgLogo = "";
        break;
    }
  }

  /**
   * Metodo para abrir la modal con el producto seleccionado del seguros
   * @param assured
   */

  public dataAssured(assured) {
    this.urlshorten = '';
    const dataAssuredUrl = `${assured.link}${this.identification}`;
    this.url = dataAssuredUrl;
    this.subscription = this.user
      .getShortUrl(this.url)
      .subscribe((resp: any) => {
        this.urlshorten = resp;
        this.enableCopy = false;
      });
    this.formShareLink();
    this.showForm = false;
    this.idCustomerForm.controls.identification.setValue("");
    this.idCustomerForm.reset();
    this.showFormCustomer = true;
    const title = assured.description;
    const id = assured.productId;
    const img = assured.imageurl;
    const price = assured.commission;
    const template = this.templateAssured;
    const showClose = false;
    const showCloseIcon = true;
    const showProduct = true;
    const showComission = true;
    const showshowTitle = false;
    const buttonClose = "Cerrar";
    this.plu = assured.description;
    this.business = "seguros";
    const home = true;
    let dialogref = this.dialog.open(DialogComponent, {
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
        id,
        home
      }
    });

    dialogref.afterDismissed().subscribe(() => {
      this.enableCopy = true;
    })

  }

  /**
   * Metodo para abrir la modal con el producto seleccionado del viajes
   * @param trip
   */

  public dataTrip(trip) {
    this.urlshorten = '';
    this.reference = false;
    const datatripUrl = trip.link;
    this.url = `${datatripUrl}${this.identification}`;
    this.subscription = this.user
      .getShortUrl(this.url)
      .subscribe((resp: any) => {
        this.urlshorten = resp;
        if(resp !== '') {
          this.saveLink();
        }
        this.enableCopy = false;
      });
    this.idCustomerForm.controls.identification.setValue("");
    this.idCustomerForm.reset();
    this.formShareLink();
    const title = trip.description;
    const id = trip.productId;
    const img = trip.imageurl;
    const price = trip.commission;
    const template = this.templateTrips;
    const showClose = false;
    const showCloseIcon = true;
    const showProduct = true;
    const showComission = true;
    const showshowTitle = false;
    const buttonClose = "Cerrar";
    this.plu = trip.description;
    this.business = "viajes";
    const home = true;
    let dialogref = this.dialog.open(DialogComponent, {
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
        id,
        home
      }
    });

    dialogref.afterDismissed().subscribe(() => {
      this.enableCopy = true;
    })


  }

  /**
   * Metodo para abrir la modal con el producto seleccionado del viajes
   * @param trip
   */

  public dataCategory(category) {
    this.urlshorten = '';
    const dataCategoryUrl = category.link;
    this.url = `${dataCategoryUrl}${this.identification}`;
    this.subscription = this.user
      .getShortUrl(this.url)
      .subscribe((resp: any) => {
        this.urlshorten = resp;
        this.enableCopy = false;
        this.saveLink();
      });
    this.formShareLink();
    const title = category.description;
    const id = category.productId;
    const img = category.imageurl;
    const template = this.templateCategories;
    const showClose = false;
    const showCloseIcon = true;
    const showProduct = true;
    const showshowTitle = false;
    const buttonClose = "Cerrar";
    this.plu = category.description;
    this.business = "exito";
    const home = true;
    let dialogref = this.dialog.open(DialogComponent, {
      data: {
        title,
        template,
        showClose,
        showCloseIcon,
        img,
        showProduct,
        showshowTitle,
        buttonClose,
        id,
        home
      },
    });

    dialogref.afterDismissed().subscribe(() => {
      this.enableCopy = true;
    })

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

  /**
   * Metodo para listar los seguros
   */

  public Assured() {
    this.subscription = this.content.getAssured().subscribe(assured => {
      this.assureds = assured;
    });
  }

  /**
   * Metodo para listar los viajes
   */

  public Trip() {
    this.subscription = this.content.getTrips().subscribe(trip => {
      this.trips = trip;
    });
  }

  /**
   * Metodo para listar las categorias
   */

  public getCategories() {
    this.subscription = this.content.getCategory().subscribe(category => {
      this.categories = category;
    });
  }

  /**
   * Metodo para dalvar los links generados
   */

  public saveLink(param?: string) {
    let data = {
      link: this.urlshorten,
      identification: this.identification,
      plu: this.plu,
      business: this.business,
      creationDate: this.date,
      identificationcustomer: this.idCustomerForm.controls.identification.value
    };
    this.subscription = this.links
      .saveLink(data)
      .subscribe((resp: ResponseService) => {
        if (param === "assured") {
          if (resp.state === "Error") {
            this.openSnackBar(resp.userMessage, "cerrar");
            this.showForm = false;
            this.showFormCustomer = true;
          }
        }
      });
  }

  /**
   * Metodo para dalvar los links reference
   */

  public saveLinkReference() {
    let data = {
      link: this.urlshorten,
      identification: this.identification,
      plu: this.plu,
      business: this.business,
      creationDate: this.date,
      identificationcustomer: this.idCustomerForm.controls.identification.value
    };
    this.subscription = this.links
      .saveLink(data)
      .subscribe((resp: ResponseService) => {
        if (resp.state === "Error") {
          this.openSnackBar(resp.userMessage, "cerrar");
        } else {
          this.openSnackBar(resp.userMessage, "cerrar");
          // this.idCustomerForm.controls.identificacion.setValue('');
          this.dialog.dismiss();
        }
      });
  }

  /**
   * Obtiene la fecha actual
   */

  public getDate() {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    this.date = date + " " + time;
  }

  public nextStep() {
    this.showForm = !this.showForm;
    this.showFormCustomer = !this.showFormCustomer;
    this.saveLink("assured");
  }

  public getInfo(event) {
    this.idCustomer = event.target.value;
    if (
      event.target.value !== this.numberPattern &&
      event.target.value === ""
    ) {
      this.buttonDisabled = true;
    } else {
      this.buttonDisabled = false;
    }
  }

  public showReference() {
    this.reference = !this.reference;
    // this.idCustomerForm.controls.identification.setValue('');
    this.idCustomerForm.reset();
  }

  share() {
    this.ngNavigatorShareService.share({
      title: '',
      text: '',
      url: this.urlshorten
    }).then( (response) => {
      console.log(response);
    })
    .catch( (error) => {
      console.log(error);
    });
  }

  next() {
    this.slickModal.slickNext();
  }
  
  prev() {
    this.slickModal.slickPrev();
  }

}
