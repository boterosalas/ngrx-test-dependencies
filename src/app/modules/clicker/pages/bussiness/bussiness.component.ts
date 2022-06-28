import { Component, OnInit, ViewChild, TemplateRef, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
import { UtilsService } from 'src/app/services/utils.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
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

declare var dataLayer: any;

@Component({
  selector: 'app-bussiness',
  templateUrl: './bussiness.component.html',
  styleUrls: ['./bussiness.component.scss'],
})
export class BussinessComponent implements OnInit, OnDestroy {
  id: string;
  hasproduct: boolean;
  title: string;
  phygital:boolean;
  percent: string;
  percentBussiness = 'Hasta 9.6%';
  bussiness = [];
  sellersExito: Array<any>;
  sellersMarketPlace: Array<any>;
  @ViewChild('templateTerms', { static: false })
  templateTerms: TemplateRef<any>;

  private subscription: Subscription = new Subscription();
  private ngNavigatorShareService: NgNavigatorShareService;
  image: string;
  template: any;
  numberPattern = '^(0|[0-9][0-9]*)$';
  showFormCustomer = true;
  reference: boolean;
  showForm = false;
  termsForm: FormGroup;
  idCustomerForm: FormGroup;
  date: any;
  business: string;
  plu: string;
  formLink: FormGroup;
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
  productsListExito = [];
  totalItems: number;
  showResults: boolean;
  showNotFound: boolean;
  orderOptions: any;
  orderValue: string;
  sellerId: string;
  mostrarProductos = 3;
  sellerName: string;
  showReferenceButton = true;
  allBussiness: string;
  visibleTerms = false;
  commision: any;
  description: string;
  infoBussiness: string;
  generalInfo: string;
  exceptionsInfo: string;
  caseSpecial: string;
  tips = [];
  invisible = false;
  nonEditedContent: string;
  isContentToggled: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private content: ContentService,
    private utils: UtilsService,
    private sp: ContentService,
    private dialog: MatBottomSheet,
    private fb: FormBuilder,
    private user: UserService,
    public auth: AuthService,
    private links: LinksService,
    private token: TokenService,
    ngNavigatorShareService: NgNavigatorShareService,
    private dialogModal: MatDialog,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.ngNavigatorShareService = ngNavigatorShareService;

    this.subscription = this.route.params.subscribe((route) => {
      if (route.id === undefined && route.code === undefined && route.imageurl === undefined && route.infoAditional === undefined) {
        this.id = '1';
        this.title = 'exito';
        this.image = 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-exito.svg';
        this.percent = 'Hasta 9.6% de ganancia';
        this.description = 'Almacenes Éxito';
      } else {
        this.id = route.id;
        this.title = route.code;
        this.description = route.description;
        this.image = route.imageurl;
        this.percent = route.infoAditional;
        this.allBussiness = route.allBussiness;
        this.content.getCommissionsByBussiness(this.id).subscribe((resp) => {
          this.commision = (resp[0].commissionvalue / 1000000).toFixed(1);
        });
        this.content.getBusinessById(this.id).subscribe((resp) => {
          this.hasproduct = resp.hasproduct;
          this.infoBussiness = resp.about;
          this.tips = resp.tips;
          this.nonEditedContent = this.infoBussiness;
          this.infoBussiness = this.formatContent(this.infoBussiness);
          this.phygital = resp.phygital;
          if (resp.terms.length > 0) {
            this.generalInfo = resp.terms[0].description;
            this.exceptionsInfo = resp.terms[1].description;
            this.caseSpecial = resp.terms[2].description;
          }
        });
      }
    });
  }

  ngOnInit() {
    if (
      this.title !== 'exito' && this.title !== 'carulla'
    ) {
      this.showReferenceButton = false;
    }

    this.getDate();
    this.getContentBussiness();
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
  toggleContent() {
    this.isContentToggled = !this.isContentToggled;
    this.infoBussiness = this.isContentToggled ? this.nonEditedContent : this.formatContent(this.infoBussiness);
  }

  public vermas() {
    if (this.visibleTerms === true) {
      this.visibleTerms = false;
    } else {
      this.visibleTerms = true;
    }
  }
  public getContentBussiness() {
    this.subscription = this.content
      .getBusinessContent(this.id)
      .pipe(distinctUntilChanged())
      .subscribe((bussiness) => {
        this.bussiness = bussiness;
      });
  }

  public goback() {
    if (this.allBussiness === 'true') {
      this.router.navigate(['/negocios']);
    } else {
      this.router.navigate(['./']);
    }
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
      window.open(this.urlshorten, '_blank');
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

  public dataSliderCategory(sliderInfo) {
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
      // this.classButton = (sliderInfo.description).replace(" ", "");
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

  /**
   * Metodo para abrir la modal con el producto seleccionado del exito
   * @param product producto
   */

  public dataProduct(product) {
    this.tokenInfo = this.token.userInfo();
    this.idClicker = this.tokenInfo.idclicker;
    this.reference = false;
    this.urlshorten = '';
    const productUrl = product.url;
    if (this.id === '1') {
      this.url = `${productUrl}?utm_source=clickam&utm_medium=referral&utm_campaign={1}`;
    }
    if (this.id === '2') {
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

  verMasProductos() {
    this.mostrarProductos += 3;
  }

  public searchBiggyExito(
    term: any,
    order: string = '',
    page = 1,
    count = 100 // Cantidad máxima que permite el servicio
  ) {
    this.productsListExito = [];
    if (term !== this.paginate) {
      this.paginate = term;
      this.pageIndex = 0;
      this.mostrarProductos = 3;
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
    this.subscription = this.sp.biggySearchExito(params).subscribe(
      (searchExito: any) => {
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
            this.productsListExito.push(object);
          }

          return object;
        });

        this.totalItems = this.productsListExito.length;

        if (this.productsListExito.length > 0) {
          this.showResults = true;
          this.showNotFound = false;
        } else {
          this.showNotFound = true;
          this.showResults = false;
        }
      },
      (error) => {
        this.showNotFound = true;
        this.showResults = false;
      }
    );
  }

  public searchBiggyCarulla(
    term: any,
    order: string = '',
    page = 1,
    count = 100 // Cantidad máxima que permite el servicio
  ) {
    this.productsListExito = [];
    if (term !== this.paginate) {
      this.paginate = term;
      this.pageIndex = 0;
      this.productsListExito = [];
      this.mostrarProductos = 3;
    }

    dataLayer.push({
      event: 'pushEventGA',
      categoria: 'NegocioCarulla',
      accion: 'ClicBuscar',
      etiqueta: term,
    });

    const params = { term, order, page, count };
    this.subscription = this.sp.biggySearchCarulla(params).subscribe(
      (searchCarulla: any) => {
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
            this.productsListExito.push(object);
          }

          return object;
        });

        this.totalItems = this.productsListExito.length;

        if (this.productsListExito.length > 0) {
          this.showResults = true;
          this.showNotFound = false;
        } else {
          this.showNotFound = true;
          this.showResults = false;
        }
      },
      (error) => {
        this.showNotFound = true;
        this.showResults = false;
      }
    );
  }

  libraryRoute() {
    this.router.navigate([
      '/biblioteca',
      {
        id: this.id,
      },
    ]);
  }

  deleteSearch() {
    this.showResults = false;
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

  searchOtherbusiness(searchText:string){
    const data = {
      id: this.title,
      text: searchText
    }

    return data;

  }

  public location(data) {
    this.dialogModal.open(PhygitalLocationComponent, {
      data
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
