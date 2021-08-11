import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogComponent } from 'src/app/modules/shared/components/dialog/dialog.component';
import { ResponseService } from 'src/app/interfaces/response';
import { MatBottomSheet, MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { LinksService } from 'src/app/services/links.service';
import { TokenService } from 'src/app/services/token.service';
import { NgNavigatorShareService } from 'ng-navigator-share';
import { Router } from '@angular/router';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  constructor(
    private sp: ContentService,
    private dialog: MatBottomSheet,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private user: UserService,
    private auth: AuthService,
    private content: ContentService,
    private links: LinksService,
    private token: TokenService,
    ngNavigatorShareService: NgNavigatorShareService,
    private router: Router
  ) {
    this.ngNavigatorShareService = ngNavigatorShareService;
  }

  private ngNavigatorShareService: NgNavigatorShareService;
  @Input() sliderWeb: Object;
  @Input() sliderMobile: Object;
  @Input() isSlider: boolean;
  @Input() showArrows: boolean;
  @Output() action = new EventEmitter();
  @Input() Class: string;

  @ViewChild('slickModal', { static: false })
  slickModal: SlickCarouselComponent;

  private subscription: Subscription = new Subscription();
  @ViewChild('templateCategories', { static: false })
  templateCategories: TemplateRef<any>;
  @ViewChild('templateDialogAssured', { static: false })
  templateAssured: TemplateRef<any>;
  urlshorten: string = '';
  url: string;
  identification: string;
  enableCopy: boolean = true;
  formLink: FormGroup;
  plu: string;
  business: string;
  date: any;
  idCustomerForm: FormGroup;
  showForm = false;
  showFormCustomer = true;
  reference: boolean;
  numberPattern = '^(0|[0-9][0-9]*)$';
  template: any;
  classButtonCopy: string;
  classButtonRefer: string;
  classButtonBuy: string;
  classButtonFacebook: string;
  classButtonTwitter: string;
  classButtonWhatsapp: string;
  classButtonShare: string;
  tokenInfo: any;
  idClicker: string;
  buttonReferir: any;
  ngOnInit() {
    this.getDate();

    if (localStorage.getItem('ACCESS_TOKEN') !== null) {
      this.identification = this.token.userInfo().identification;
    }

    this.idCustomerForm = this.fb.group({
      identification: [
        '',
        [
          Validators.required,
          Validators.pattern(this.numberPattern),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    dotClass: 'slick-dots orange',
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: false,
    arrows: true,
  };

  public nextStep() {
    this.showForm = !this.showForm;
    this.showFormCustomer = !this.showFormCustomer;
    this.saveLink('assured');
  }

  buy() {
    let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (iOS) {
      window.location.assign(this.urlshorten);
    } else {
      window.open(this.urlshorten, '_blank');
    }
  }

  next() {
    this.slickModal.slickNext();
  }

  prev() {
    this.slickModal.slickPrev();
  }

  public backStep() {
    this.reference = !this.reference;
    this.showForm = !this.showForm;
  }

  openShare() {
    this.action.emit(event);
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

  public showReference() {
    this.reference = !this.reference;
    // this.idCustomerForm.controls.identification.setValue('');
    this.idCustomerForm.reset();
  }

  /* To copy Text from Textbox */
  public copyInputMessage(inputElement: any) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.openSnackBar('Se ha copiado el link al portapapeles', 'Cerrar');
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

  /**
   * Obtiene la fecha actual
   */

  public getDate() {
    let today = new Date();
    let date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    let time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    this.date = date + ' ' + time;
  }

  /**
   * Metodo para dalvar los links generados
   */

  public saveLink(param?: string) {
    let data = {
      link: this.url,
      identification: this.identification,
      plu: this.plu,
      business: this.business,
      creationDate: this.date,
      identificationcustomer: this.idCustomerForm.controls.identification.value,
    };
    this.subscription = this.links
      .saveLink(data)
      .subscribe((resp: ResponseService) => {
        let splice = resp.objectResponse.link.split('//');
        this.urlshorten = 'https://' + splice[1];
        this.enableCopy = false;

        if (param === 'assured') {
          if (resp.state === 'Error') {
            this.openSnackBar(resp.userMessage, 'cerrar');
            this.showForm = false;
            this.showFormCustomer = true;
          }
        }
      });
  }

  /**
   * Metodo para salvar los links reference
   */

  public saveLinkReference() {
    let data = {
      link: this.url,
      identification: this.identification,
      plu: this.plu,
      business: this.business,
      creationDate: this.date,
      identificationcustomer: this.idCustomerForm.controls.identification.value,
    };
    this.subscription = this.links
      .saveLink(data)
      .subscribe((resp: ResponseService) => {
        if (resp.state === 'Error') {
          this.openSnackBar(resp.userMessage, 'cerrar');
        } else {
          this.openSnackBar(resp.userMessage, 'cerrar');
          // this.idCustomerForm.controls.identificacion.setValue('');
          this.dialog.dismiss();
        }
      });
  }

  /**
   * Metodo para abrir la modal con el producto seleccionado
   *
   */

  public dataCategory(category) {
    let token = localStorage.getItem('ACCESS_TOKEN');
    if (token !== null && category.business !== 'clickam') {
      this.tokenInfo = this.token.userInfo();
      this.idClicker = this.tokenInfo.idclicker;
      this.showFormCustomer = true;
      this.showForm = false;
      this.urlshorten = '';
      this.reference = false;
      const dataCategoryUrl = category.link;
      this.url = `${dataCategoryUrl}`;
      setTimeout(() => {
        this.saveLink();
      }, 500);
      this.idCustomerForm.controls.identification.setValue('');
      this.idCustomerForm.reset();
      this.formShareLink();
      const title = category.description;
      const id = category.id;
      const img = category.imageurlweb;
      const showClose = false;
      const showCloseIcon = true;
      const showProduct = true;
      const showshowTitle = false;
      const buttonClose = 'Cerrar';
      const infoaditional = category.infoaditional;
      this.plu = category.description;
      this.business = category.idbusiness;
      const bussinessType = category.business;
      const home = true;
      this.classButtonCopy =
        `gtmClicLightboxCopiarLink${bussinessType}${category.description}`
          .replace(/\s/g, '')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
      this.classButtonRefer =
        `gtmClicLightboxReferir${bussinessType}${category.description}`
          .replace(/\s/g, '')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
      this.classButtonBuy =
        `gtmClicLightboxComprar${bussinessType}${category.description}`
          .replace(/\s/g, '')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
      this.classButtonShare =
        `gtmClicLightboxCompartir${bussinessType}${category.description}`
          .replace(/\s/g, '')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
      this.classButtonFacebook =
        `gtmClicLightboxIconoFacebook${bussinessType}${category.description}`
          .replace(/\s/g, '')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
      this.classButtonTwitter =
        `gtmClicLightboxIconoTwitter${bussinessType}${category.description}`
          .replace(/\s/g, '')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
      this.classButtonWhatsapp =
        `gtmClicLightboxIconoWhatsApp${bussinessType}${category.description}`
          .replace(/\s/g, '')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
      this.buttonReferir = category;

      const template = this.templateCategories;

      let dialogref = this.dialog.open(DialogComponent, {
        data: {
          title,
          template,
          showClose,
          showCloseIcon,
          infoaditional,
          img,
          showProduct,
          showshowTitle,
          buttonClose,
          id,
          home,
        },
      });

      dialogref.afterDismissed().subscribe(() => {
        this.enableCopy = true;
      });
    }
    if (category.business === 'clickam' && !!token) {
      window.location.replace(category.link);
    }
  }

  private formShareLink() {
    this.formLink = this.fb.group({
      link: [this.url],
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
