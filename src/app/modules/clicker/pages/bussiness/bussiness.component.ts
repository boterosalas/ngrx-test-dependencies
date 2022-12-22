import { Component, OnInit, ViewChild, TemplateRef, OnDestroy, Inject, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
import { UtilsService } from 'src/app/services/utils.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { UntypedFormGroup, Validators, UntypedFormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DialogComponent } from 'src/app/modules/shared/components/dialog/dialog.component';
import { ResponseService } from 'src/app/interfaces/response';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { LinksService } from 'src/app/services/links.service';
import { TokenService } from 'src/app/services/token.service';
import { NgNavigatorShareService } from 'ng-navigator-share';
import { isPlatformBrowser } from '@angular/common';
import Swal from 'sweetalert2';
import { PhygitalLocationComponent } from '../../components/phygital-location/phygital-location.component';
import { FiendlyUrl } from 'src/app/helpers/friendly-url';
import { BreakpointService } from 'src/app/services/breakpoint.service';

declare var dataLayer: any;

@Component({
  selector: 'app-bussiness',
  templateUrl: './bussiness.component.html',
  styleUrls: ['./bussiness.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BussinessComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  bussinessIsLoading: boolean = true;
  searchingIsLoading: boolean = false;
  id: number = 0;
  hasproduct: boolean;
  title: string;
  phygital: boolean;
  clickear: boolean;
  percent: string;
  percentBussiness = 'Hasta 9.6%';
  bussiness = [];
  sellersExito: Array<any>;
  sellersMarketPlace: Array<any>;
  @ViewChild('templateTerms', { static: false })
  templateTerms: TemplateRef<any>;

  private subscription: Subscription = new Subscription();
  offersImageBreakpoint$: Subscription = new Subscription();
  isMobile: boolean = true;
  seeOffersImage: string = '';
  private ngNavigatorShareService: NgNavigatorShareService;
  image: string;
  template: any;
  numberPattern = '^(0|[0-9][0-9]*)$';
  showFormCustomer = true;
  reference: boolean;
  showForm = false;
  termsForm: UntypedFormGroup;
  idCustomerForm: UntypedFormGroup;
  date: any;
  business: number;
  plu: string;
  formLink: UntypedFormGroup;
  enableCopy = true;
  identification: string;
  imgBanner: string;
  imgBannerMobile: string;
  colorText: string;

  @ViewChild('templateCategories', { static: false })
  templateCategories: TemplateRef<any>;

  @ViewChild('templateEC', { static: false }) templateEC: TemplateRef<any>;

  urlshorten = '';
  url: string;
  classButtonCopy: string;
  classButtonRefer: string;
  classButtonBuy: string;
  classButtonFacebook: string;
  classButtonTwitter: string;
  classButtonWhatsapp: string;
  classButtonShare: string;
  acceptTerms: boolean = null;
  terms = false;
  tokenInfo: any;
  idClicker: string;

  paginate: string;
  pageIndex = 0;
  pageTo = 50;
  pageSize = 52;
  productsList: Array<any>;
  productsListBiggy: Array<any>;
  productsListTransform: Array<any>;
  searchProductList = [];
  totalItems: number;
  showResults: boolean;
  showNotFound: boolean;
  orderOptions: any;
  orderValue: string;
  sellerId: string;
  showSearchProducts = 4;
  showCategoriesProducts = 8;
  sellerName: string;
  showReferenceButton = true;
  visibleTerms = false;
  commision: any;
  description: string;
  infoBussiness: string;
  generalInfo: string = '';
  exceptionsInfo: string = '';
  caseSpecial: string = '';
  // generalInfo: string = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.';
  // exceptionsInfo: string = 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for "lorem ipsum" will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).';
  // caseSpecial: string = 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';
  saleTips = [
    {
      title: 'Conoce muy bien los productos',
      description: 'Cuando ingresas a exito.com y escoges algún producto, en la parte inferior encontrarás las especificaciones, así podrás llenarte de argumentos a la hora de ofrecerlos, menciona siempre los atributos y beneficios.'
    },
    {
      title: 'Estrategia de descuentos',
      description: 'Habla desde el ahorro que obtendrá el cliente al comprar los productos, si el descuento es en porcentaje, realiza el cálculo y menciona el valor que ahorrará, ellos la mayoría de veces evitan hacer la operación matemática.'
    },
    {
      title: 'Ofrece los múltiples métodos de pago',
      description: 'Una fortaleza de este e-commerce son los múltiples medio de pago que le puedes ofrecer a tus clientes: Tarjeta Éxito, Tarjeta de crédito: Visa, MasterCard, American Express, Diners, Tarjeta débito, Tarjeta Codensa, Consignación en cuenta Bancolombia, Pago contra entrega: solo para pedidos de mercado, Pago en cajas de Almacenes Éxito, Carulla, Surtimax o Super Inter, Tarjeta presente (opción empleados Grupo Éxito)'
    },
    {
      title: 'Descuentos TODAS las semanas',
      description: '• Lunes de vida sana: Productos saludables con descuentos. • Martes para brillar: Productos de aseo para el hogar con descuentos. • Miércoles de Mercado con descuento. • Juernes de rumba, descuentos en licores.'
    },
    {
      title: 'Grandes eventos de descuentos',
      description: 'Existen grandes eventos de descuentos en nuestro E-commerce como: Jueves Online, Mi descuento, Aniversario Éxito, Megapromo, Black Days, Cyberdays, Días de precios especiales, SingleDays, Hot Sale, PromOnline.'
    },
  ];
  invisible = false;
  nonEditedContent: string = '';
  // nonEditedContent: string = 'Éxito es una cadena colombiana de supermercados perteneciente al Grupo Éxito. Nació en un local 4X4 en el centro de Medellín y ahora tiene alrededor de 240 almacenes ubicados en toda Colombia.';
  bussinessNameUrl: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private content: ContentService,
    private utils: UtilsService,
    private dialog: MatBottomSheet,
    private fb: UntypedFormBuilder,
    private user: UserService,
    public auth: AuthService,
    private links: LinksService,
    private token: TokenService,
    ngNavigatorShareService: NgNavigatorShareService,
    private dialogModal: MatDialog,
    private breakPointService: BreakpointService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.bussinessNameUrl = this.route.snapshot.paramMap.get('bussinessNameUrl');
    if (this.content.bussinessList.length > 0) {
      const currentBussiness = this.getCurrentBussiness(this.bussinessNameUrl);
      this.setBussinessInfo(currentBussiness);
      this.getBussinessInfo();
    } else {
      this.getBussinessByCategory();
    }

    this.ngNavigatorShareService = ngNavigatorShareService;
  }

  ngOnInit() {
    if (
      this.title !== 'exito' && this.title !== 'carulla'
    ) {
      this.showReferenceButton = false;
    }

    this.getDate();
    this.links.getSellers().subscribe((resp: any) => {
      this.sellersExito = resp.sellersExito;
      this.sellersMarketPlace = resp.sellersMarketPlace;
    });
    if (localStorage.getItem('ACCESS_TOKEN') !== null) {
      this.identification = this.token.userInfo().identification;
    }

    this.idCustomerForm = this.fb.group({
      identification: ['', [Validators.required, Validators.pattern(this.numberPattern), Validators.maxLength(10)]],
    });

    this.termsForm = this.fb.group({
      acceptTerms: [null, Validators.required],
    });

    this.orderOptions = [
      { value: 'OrderByTopSaleDESC', description: 'Más Vendidos' },
      { value: 'OrderByReleaseDateDESC', description: 'Más recientes' },
      { value: 'OrderByPriceDESC', description: 'Mayor precio primero' },
      { value: 'OrderByNameASC', description: 'Productos de la A-Z' },
      { value: 'OrderByNameDESC', description: 'Productos de la Z-A' },
    ];
    this.offersImageBreakpoint();
  }

  offersImageBreakpoint() {
    this.offersImageBreakpoint$ = this.breakPointService
      .isWidthLessThanBreakpoint('600')
      .subscribe((res: boolean) => {
        this.isMobile = res;
        if (res) {
          this.seeOffersImage = '/assets/img/banners/oferts_mobile.png'
        } else {
          this.seeOffersImage = '/assets/img/banners/oferts.png'
        }
      });
  }

  getCurrentBussiness(bussinessNameUrl) {
    return this.content.bussinessList.find(b => FiendlyUrl.removeAccentsAndSpaces(b.description) === bussinessNameUrl);
  }

  getBussinessInfo() {
    this.subscription = this.content.getCommissionsByBussiness(this.id).subscribe((resp) => {
      this.commision = (resp[0].commissionvalue / 1000000).toFixed(1);
    });
    this.subscription = this.content.getBusinessById(this.id).subscribe((resp) => {
      this.setBussinessInfo(resp);
      this.getContentBussiness();
    });
  }

  setBussinessInfo(data: any) {
    if (data) {
      this.id = data.id;
      this.hasproduct = data.hasproduct;
      this.saleTips = data.tips;
      this.title = data.description;
      this.image = data.imageurl;
      this.description = data.description;
      this.nonEditedContent = data.about;
      this.infoBussiness = this.formatContent(data.about);
      this.phygital = data.phygital;
      this.clickear = data.buttonclickear;
      this.percent = data.infoaditional;
      if (data.terms.length > 0) {
        this.generalInfo = data.terms[0].description;
        this.exceptionsInfo = data.terms[1].description;
        this.caseSpecial = data.terms[2].description;
      }
      this.isLoading = false;
    } else {
      this.router.navigateByUrl('/negocios');
    }
  }

  getGTMBussiness(bussiness: string = '', product: string = ''){
    let wordsTitle = bussiness.split(' ');
    let wordsProduct = product.split(' ');

    wordsTitle = wordsTitle.map((word) => word.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    wordsTitle = wordsTitle.map((word) => word.replace(/[^\w\s]/gi, ''));
    wordsTitle = wordsTitle.map((word) => word?.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase());

    wordsProduct = wordsProduct.map((word) => word.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    wordsProduct = wordsProduct.map((word) => word.replace(/[^\w\s]/gi, ''));
    wordsProduct = wordsProduct.map((word) => word?.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase());

    return `gtmNegocio${wordsTitle.join('')}${wordsProduct.join('')}`;
  }

  getBussinessByCategory(id: number = 0) {
    this.subscription = this.content
      .getBusinessByCategory(id)
      .pipe(distinctUntilChanged())
      .subscribe((bussiness) => {
        this.content.bussinessList = bussiness;
        const currentBussiness = this.getCurrentBussiness(this.bussinessNameUrl);
        this.setBussinessInfo(currentBussiness);
        this.getBussinessInfo();
      });
  }

  /**
   * Metodo para dalvar los links reference
   */

  public saveLinkReference() {
    const dataSaveLinkReference = {
      link: this.url,
      identification: this.identification,
      plu: this.plu,
      business: this.business,
      creationDate: this.date,
      identificationcustomer: this.idCustomerForm.controls.identification.value,
    };
    this.subscription = this.links.saveLink(dataSaveLinkReference).subscribe((resp: ResponseService) => {
      if (resp.state === 'Error') {
        if (resp.userMessage.includes('máximo de referidos')) {
          Swal.fire({
            title: 'Limite de referidos',
            text: resp.userMessage,
            type: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonClass: 'upload-error',
          });
        } else
          this.utils.openSnackBar(resp.userMessage, 'cerrar');
      } else {
        this.utils.openSnackBar(resp.userMessage, 'cerrar');
        this.dialog.dismiss();
      }
    });
  }

  formatContent(content: string) {
    if (content && content.length > 250) {
      return `${content.substr(0, 250)}...`;
    } else {
      this.invisible = true;
      return content ? `${content.substr(0, 250)}` : '';
    }
  }

  vermas() {
    this.visibleTerms = !this.visibleTerms;
  }

  public getContentBussiness() {
    this.subscription = this.content
      .getBusinessContent(this.id)
      .pipe(distinctUntilChanged())
      .subscribe((bussiness) => {
        this.bussiness = bussiness;
        this.bussinessIsLoading = false;
      });
  }

  private formShareLink() {
    this.formLink = this.fb.group({
      link: [this.url],
    });
  }

  /**
   * Obtiene la fecha actual
   */

  public getDate() {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    this.date = date + ' ' + time;
  }


  /* To copy Text from Textbox */
  public copyInputMessage(inputElement: any) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.utils.openSnackBar('Se ha copiado el link al portapapeles', 'Cerrar');
  }

  public showReference() {
    this.reference = !this.reference;
    this.idCustomerForm.reset();
  }

  share() {
    this.ngNavigatorShareService
      .share({
        title: '',
        text: '',
        url: this.urlshorten,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  buy() {
    this.subscription = this.content.saveMission('BUY').subscribe();
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (iOS) {
      window.location.assign(this.urlshorten);
    } else {
      window.open(this.urlshorten, '_blank');
    }
  }

  public nextStep() {
    this.showForm = !this.showForm;
    this.showFormCustomer = !this.showFormCustomer;
    this.saveLink('assured');
  }

  public backStep() {
    this.reference = !this.reference;
    this.showForm = !this.showForm;
  }

  /**
   * Metodo para abrir la modal con el producto seleccionado
   *
   */

  public dataSliderCategory(clickFrom, sliderInfo) {
    if (clickFrom === 'button' || (clickFrom === 'container' && this.isMobile)) {
      const token = localStorage.getItem('ACCESS_TOKEN');
      if (token !== null && sliderInfo.business !== 'clickam') {
        this.tokenInfo = this.token.userInfo();
        this.idClicker = this.tokenInfo.idclicker;

        const dataCategoryUrl = sliderInfo.link;
        this.showForm = false;
        this.urlshorten = '';
        this.reference = false;
        this.showFormCustomer = true;
        this.url = `${dataCategoryUrl}`;
        setTimeout(() => {
          this.saveLink();
        }, 500);
        this.idCustomerForm.controls.identification.setValue('');
        this.idCustomerForm.reset();
        this.formShareLink();
        const home = true;
        this.business = sliderInfo.idbusiness;
        this.plu = sliderInfo.description;
        const infoaditional = sliderInfo.infoaditional;
        const img = sliderInfo.imageurl;
        const showCloseIcon = true;
        const showClose = false;
        const buttonClose = 'Cerrar';
        const showshowTitle = false;
        const title = sliderInfo.description;
        const showProduct = true;
        const id = sliderInfo.productId;
        this.classButtonWhatsapp = `gtmClicLightboxIconoWhatsApp${this.title}${sliderInfo.description}`
          .replace(/\s/g, '')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        this.classButtonTwitter = `gtmClicLightboxIconoTwitter${this.title}${sliderInfo.description}`
          .replace(/\s/g, '')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        this.classButtonFacebook = `gtmClicLightboxIconoFacebook${this.title}${sliderInfo.description}`
          .replace(/\s/g, '')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        this.classButtonShare = `gtmClicLightboxCompartir${this.title}${sliderInfo.description}`
          .replace(/\s/g, '')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        this.classButtonBuy = `gtmClicLightboxComprar${this.title}${sliderInfo.description}`
          .replace(/\s/g, '')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        this.classButtonRefer = `gtmClicLightboxReferir${this.title}${sliderInfo.description}`
          .replace(/\s/g, '')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        this.classButtonCopy = `gtmClicLightboxCopiarLink${this.title}${sliderInfo.description}`
          .replace(/\s/g, '')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');

        const template = this.templateCategories;

        const dialogref = this.dialog.open(DialogComponent, {
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
          },
        });

        dialogref.afterDismissed().subscribe(() => {
          this.enableCopy = true;
        });
      } else {
        this.router.navigate(['/' + sliderInfo.link]);
      }
    }
  }

  /**
   * Metodo para abrir la modal con el producto seleccionado del exito
   * @param product producto
   */

  public dataProduct(clickFrom, product) {
    if (clickFrom === 'button' || (clickFrom === 'container' && this.isMobile)) {
      this.tokenInfo = this.token.userInfo();
      this.idClicker = this.tokenInfo.idclicker;
      this.reference = false;
      this.urlshorten = '';
      const productUrl = product.url;
      if (this.id === 1) {
        this.url = `${productUrl}?utm_source=clickam&utm_medium=referral&utm_campaign={1}`;
      }
      if (this.id === 2) {
        this.url = `https://www.carulla.com${productUrl}?utm_source=clickam&utm_medium=referral&utm_campaign={1}`;
      }
      this.idCustomerForm.controls.identification.setValue('');
      this.idCustomerForm.reset();
      setTimeout(() => {
        this.saveLink();
      }, 500);
      this.formShareLink();
      const title = product.title;
      const id = product.plu;
      const img = product.image.value;
      const price = product.price;
      const discount = product.oldprice;
      const template = this.templateEC;
      const showClose = false;
      const showCloseIcon = true;
      const showProduct = true;
      const showshowTitle = false;
      const buttonClose = 'Cerrar';
      const showPlu = true;
      const plu = product.plu;
      this.plu = product.plu;
      const business = product.business;
      const home = true;
      const exito = true;
      this.business = this.id;

      const dialogref = this.dialog.open(DialogComponent, {
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
          business,
          home,
          exito,
        },
      });

      dialogref.afterDismissed().subscribe(() => {
        this.enableCopy = true;
      });
    }
  }

  showMoreSearchProducts() {
    this.showSearchProducts += 4;
  }

  showMoreCategories() {
    this.showCategoriesProducts += 8;
  }

  public searchBiggyExito(
    term: any,
    order: string = '',
    page = 1,
    count = 100 // Cantidad máxima que permite el servicio
  ) {
    if (typeof term === 'string') {
      this.searchingIsLoading = true;
      this.searchProductList = [];
      if (term !== this.paginate) {
        this.paginate = term;
        this.pageIndex = 0;
        this.showSearchProducts = 4;
      }
      if (isPlatformBrowser(this.platformId)) {
        dataLayer.push({
          event: 'pushEventGA',
          categoria: 'NegocioExito',
          accion: 'ClicBuscar',
          etiqueta: term,
        });
      }
      const params = { term, order, page, count };
      this.subscription = this.content.biggySearchExito(params).subscribe({
        next: (searchExito: any) => {
          this.productsListBiggy = searchExito.products;
          this.productsListTransform = [...this.productsListBiggy];
          this.productsListTransform.forEach((searchExito) => {
            if (!!searchExito.skus[0] && !!searchExito.skus[0].sellers[0]) {
              const sellerSkus = searchExito.skus[0].sellers;
              const filterSkus = sellerSkus.filter(
                (idSeller) => this.sellersExito.includes(idSeller.id) || this.sellersMarketPlace.includes(idSeller.id)
              );

              if (!!filterSkus[0]) {
                this.sellerId = filterSkus[0].id;
                this.sellerName = filterSkus[0].name;
              } else {
                this.sellerId = '';
                this.sellerName = '';
              }
            }

            const object = {
              title: searchExito.name,
              plu: searchExito.id,
              url: searchExito.url,
              oldprice: searchExito.oldPrice,
              price: searchExito.price,
              image: searchExito.images[0],
              seller: this.sellerId,
              business: this.sellerName,
            };

            if ((this.sellersExito.includes(object.seller) || this.sellersMarketPlace.includes(object.seller)) && object.oldprice !== 0) {
              this.searchProductList.push(object);
            }

            return object;
          });

          this.totalItems = this.searchProductList.length;

          if (this.searchProductList.length > 0) {
            this.showResults = true;
            this.showNotFound = false;
          } else {
            this.showNotFound = true;
            this.showResults = false;
          }
        },
        error: () => {
          this.showNotFound = true;
          this.showResults = false;
        },
        complete: () => {
          this.searchingIsLoading = false;
        }
      });
    }
  }

  public searchBiggyCarulla(
    term: any,
    order: string = '',
    page = 1,
    count = 100 // Cantidad máxima que permite el servicio
  ) {
    if (typeof term === 'string') {
      this.searchingIsLoading = true;
      this.searchProductList = [];
      if (term !== this.paginate) {
        this.paginate = term;
        this.pageIndex = 0;
        this.searchProductList = [];
        this.showSearchProducts = 4;
      }

      dataLayer.push({
        event: 'pushEventGA',
        categoria: 'NegocioCarulla',
        accion: 'ClicBuscar',
        etiqueta: term,
      });

      const params = { term, order, page, count };
      this.subscription = this.content.biggySearchCarulla(params).subscribe({
        next: (searchCarulla: any) => {
          this.productsListBiggy = searchCarulla.products;
          this.productsListTransform = [...this.productsListBiggy];
          this.productsListTransform.forEach((searchCarulla) => {
            if (!!searchCarulla.skus[0] && !!searchCarulla.skus[0].sellers[0]) {
              const sellerSkus = searchCarulla.skus[0].sellers;
              const filterSkus = sellerSkus.filter((idSeller) => idSeller.id === '1' || idSeller.id === '10078');
              if (!!filterSkus[0]) {
                this.sellerId = filterSkus[0].id;
                this.sellerName = filterSkus[0].name;
              } else {
                this.sellerId = '';
                this.sellerName = '';
              }
            }

            const object = {
              title: searchCarulla.name,
              plu: searchCarulla.id,
              url: searchCarulla.url,
              oldprice: searchCarulla.oldPrice,
              price: searchCarulla.price,
              image: searchCarulla.images[0],
              seller: this.sellerId,
              business: this.sellerName,
            };

            if ((object.seller === '1' || object.seller === '10078') && object.oldprice !== 0) {
              this.searchProductList.push(object);
            }

            return object;
          });

          this.totalItems = this.searchProductList.length;

          if (this.searchProductList.length > 0) {
            this.showResults = true;
            this.showNotFound = false;
          } else {
            this.showNotFound = true;
            this.showResults = false;
          }
        },
        error: () => {
          this.showNotFound = true;
          this.showResults = false;
        },
        complete: () => {
          this.searchingIsLoading = false;
        }
      });
    }
  }

  libraryRoute() {
    this.router.navigate(['/biblioteca', { id: this.id }]);
  }

  deleteSearch() {
    this.showResults = false;
    this.showSearchProducts = 4;
  }

  /**
   * Metodo para salvar los links generados
   */

  public saveLink(param?: string) {
    const dataSaveLink = {
      link: this.url,
      identification: this.identification,
      plu: this.plu,
      business: this.business,
      creationDate: this.date,
      identificationcustomer: this.idCustomerForm.controls.identification.value,
    };

    this.subscription = this.links.saveLink(dataSaveLink).subscribe((resp: ResponseService) => {
      this.urlshorten = resp.objectResponse.link;
      this.enableCopy = false;
      if (param === 'assured') {
        if (resp.state === 'Error') {
          this.utils.openSnackBar(resp.userMessage, 'cerrar');
          this.showForm = false;
          this.showFormCustomer = true;
        }
      }
    });
  }

  public location() {
    this.dialogModal.open(PhygitalLocationComponent, {
      data: this.id
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
