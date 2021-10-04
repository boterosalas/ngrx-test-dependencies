import { Component, OnInit, HostListener, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { trigger, state, style, transition, animate, group } from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';
import decode from 'jwt-decode';
import { ContentService } from 'src/app/services/content.service';
import { distinctUntilChanged } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { LinksService } from 'src/app/services/links.service';
import { MessagingService } from 'src/app/shared/messaging.service';
import { Meta } from '@angular/platform-browser';
import { MasterDataService } from 'src/app/services/master-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewBusinessFormComponent } from '../../components/new-business-form/new-business-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('openClose', [
      state('in', style({ height: '*', opacity: 0 })),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),

        group([animate(300, style({ height: 0 })), animate('600ms ease-in-out', style({ transform: 'translateY(-1000px)' }))]),
      ]),
    ]),
    trigger('simpleFadeAnimation', [
      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [style({ opacity: 0 }), animate(600)]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave', animate(600, style({ opacity: 0 }))),
    ]),
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  showLoginForm: boolean;
  showRegisterForm: boolean;
  showForgotForm: boolean;
  isOpen = false;
  private subscription: Subscription = new Subscription();
  email: string;
  bussiness: Array<any> = [];
  bussinessClicker: Array<any> = [];
  sliderMobile: any;
  sliderMobileOffers: any;
  sliderWeb: any;
  offersMobile: any;
  offersWeb: any;
  isEmployee: any;
  @ViewChild('templateBusiness', { static: false })
  templateBusiness: TemplateRef<any>;
  @ViewChild('templatePromo', { static: false })
  templatePromo: TemplateRef<any>;
  categories = [];
  managedPayments: boolean;
  role: string;
  userId: any;
  message: any;
  modalHref: string;
  modalAltMobile: string;
  modalAltWeb: string;
  modalHrefMobile: string;
  modalTarget = '_self';
  modalSrcWeb: string;
  modalSrcMobile: string;
  newTerms: boolean;
  acceptTerms: boolean = null;
  @ViewChild('templateTerms', { static: false })
  templateTerms: TemplateRef<any>;
  newTermsHTML = false;
  stepTerms = true;
  activateButton = false;
  amount: any;
  amountReferred: any;
  paymentPending: number;

  contentTerminos: any;
  contentProteccion: any;
  contentTransparencia: any;
  contentPrograma: any;
  textTerminos: any;
  textProteccion: any;
  textTransparencia: any;
  textPrograma: any;
  formData = false;
  sendData = false;
  dateForm: FormGroup;
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private user: UserService,
    private utils: UtilsService,
    public auth: AuthService,
    private content: ContentService,
    private dialog: MatDialog,
    private dialog2: MatDialog,
    private link: LinksService,
    private messagingService: MessagingService,
    private _snackBar: MatSnackBar,
    private metaTagService: Meta,
    private fb: FormBuilder,
    private personalInfo: MasterDataService
  ) {
    /**
     *  Verifica que en la ruta de inicio exista el parametro de email y activa el usuario
     * @param email email
     */
    this.dateForm = this.fb.group({
      description: [null, Validators.required],
    });
    this.subscription = this.route.queryParams.subscribe((params) => {
      if (params.email) {
        this.email = params.email;
        this.activateUser();
      } else {
        if (params.code) {
          localStorage.setItem('idClicker', params.code);
          this.openRegister();
          this.generateLink(params.code);
        } else {
          router.navigate(['/']);
        }
      }
    });
  }
  public generateLink(dataEmail: any) {
    const idClicker = dataEmail;
    const formData: FormData = new FormData();
    formData.append('idClicker', idClicker);
    formData.append('type', 'Visit');
    this.content.setClick(formData).subscribe();
  }
  ngOnInit() {
    this.metaTagService.addTags([
      {
        name: 'keywords',
        content: 'clickam, exito.com, carulla.com, seguros, referidos, viajes, cashback ',
      },
      {
        name: 'description',
        content:
          'Clickam es una plataforma marketplace de marketing de afiliados, donde ganarás dinero por referir y comprar. Aumenta el tráfico de tu negocio con afiliados. Una idea Grupo Éxito.  Exito - Carulla - Haceb - SURA - Puntos Colombia - Viajes Éxito - Nequi.',
      },
    ]);

    this.routeBased();
    this.getBussiness();
    this.getBussinessClicker();
    this.getOffers();
    this.getUserDataUser();
    this.getAmount();
    this.amount = localStorage.getItem('Amount');
    this.amountReferred = localStorage.getItem('AmonuntReferred');
    this.getTerms();
  }

  getTerms() {
    this.personalInfo.getTerms().subscribe((resp: any) => {
      this.contentTerminos = resp.objectResponse[0].sectionvalue;
      this.contentProteccion = resp.objectResponse[1].sectionvalue;
      this.contentTransparencia = resp.objectResponse[2].sectionvalue;
      this.contentPrograma = resp.objectResponse[3].sectionvalue;
      this.textTerminos = resp.objectResponse[0].sectiontitle;
      this.textProteccion = resp.objectResponse[1].sectiontitle;
      this.textTransparencia = resp.objectResponse[2].sectiontitle;
      this.textPrograma = resp.objectResponse[3].sectiontitle;
    });
  }
  public getUserDataUser() {
    this.subscription = this.auth.getRole$.subscribe((role) => {
      this.role = role;
      if (role === 'CLICKER' || role === 'ADMIN' || role === 'SUPERADMIN') {
        this.subscription = this.user.getuserdata().subscribe((user) => {
          this.isEmployee = user.isEmployeeGrupoExito;
          this.managedPayments = user.managedPayments;
          this.getInfomonth();
          if (role === 'CLICKER') {
            this.newTerms = user.acceptTermsReferrals;
            if (this.newTerms === true) {
              this.showModalPayment();
            }
          }
        });
      }
      // const interval = setInterval(() => {
      //   this.showModalPayment();
      //   if (this.paymentPending > 10000) {
      //     clearInterval(interval);
      //   }
      // }, 3000);

      if (role === 'CLICKER') {
        const token = localStorage.getItem('ACCESS_TOKEN');
        const tokenDecode = decode(token);
        this.userId = tokenDecode.userid;
        this.messagingService.requestPermission(this.userId);
        this.messagingService.receiveMessage();
        this.message = this.messagingService.currentMessage;
      }
    });
  }

  /**
   * Metodo para activar el usuario
   * @param email email
   */

  public activateUser() {
    this.subscription = this.user.activateProfile(this.email).subscribe(
      (user: any) => {
        if (user.state === 'Success') {
          Swal.fire({
            title: 'Activación exitosa',
            text: user.userMessage,
            type: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonClass: 'accept-activation-alert-success',
          }).then(() => {
            this.router.navigate(['/inicio']);
          });
        } else {
          Swal.fire({
            title: 'Activación errónea',
            text: user.userMessage,
            type: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonClass: 'accept-activation-alert-error',
          }).then(() => {
            this.router.navigate(['/inicio']);
          });
        }
      },
      (error) => {
        Swal.fire({
          title: error.statusText,
          text: error.error,
          type: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonClass: 'accept-activation-alert-invalid',
        }).then(() => {
          this.router.navigate(['/inicio']);
        });
      }
    );
  }

  public getAmount() {
    this.subscription = this.link.getAmount().subscribe((amount) => {
      localStorage.setItem('Amount', amount.amountsCommission);
      localStorage.setItem('AmonuntReferred', amount.amountsReferred);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener('over')
  openRegister() {
    this.utils.showRegisterForm();
  }

  @HostListener('over')
  sliderOffers() {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token === null) {
      this.utils.showloginForm();
    }
  }

  private routeBased() {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token !== null) {
      const tokenDecode = decode(token);
      if (tokenDecode.role === 'ADMIN' || tokenDecode.role === 'SUPERADMIN') {
        this.router.navigate(['/dashboard']);
        this.auth.getRole$.next('ADMIN');
      }
    }
  }

  public getBussiness() {
    this.subscription = this.content
      .getBusiness()
      .pipe(distinctUntilChanged())
      .subscribe((bussiness) => {
        this.bussiness = bussiness;
      });
  }

  public getBussinessClicker() {
    this.subscription = this.auth.isLogged$.subscribe((val) => {
      const token = localStorage.getItem('ACCESS_TOKEN');
      if (!!val || token !== null) {
        this.subscription = this.content.getBusinessClicker().subscribe((bussiness) => {
          this.bussinessClicker = bussiness;
        });
      }
    });
  }

  public getOffers() {
    this.subscription = this.content.getOffersbyType({ id: 'OFERTA', admin: false }).subscribe((resp) => {
      this.offersWeb = resp;
    });
    this.subscription = this.content.getOffersbyType({ id: 'CARROUSEL', admin: false }).subscribe((resp) => {
      this.sliderWeb = resp;
    });
  }

  public bussinessNavigation(bussiness) {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token === null) {
      this.utils.showloginForm();
    }

    const params = {
      id: bussiness.id,
      code: bussiness.code,
      infoAditional: bussiness.infoaditional,
      imageurl: bussiness.imageurl,
      description: bussiness.description,
    };
    this.router.navigate([
      '/bussiness',
      {
        id: params.id,
        code: params.code,
        infoAditional: params.infoAditional,
        imageurl: params.imageurl,
        description: params.description,
      },
    ]);
  }

  public openRegisterBusiness() {
    this.dialog.open(NewBusinessFormComponent);
  }

  private showModalPayment() {
    if (
      this.role === 'CLICKER' &&
      this.managedPayments === false &&
      this.isEmployee === false &&
      this.newTerms === true &&
      this.paymentPending >= 10000
    ) {
      Swal.fire({
        title: '¡Registra tus datos bancarios!',
        text: `Recuerda que para recibir el pago de tus comisiones , debes registrar tus datos bancarios. (Tienes comisiones pendientes por $${this.paymentPending})`,
        type: 'info',
        showCancelButton: true,
        showCloseButton: true,
        allowEscapeKey: false,
        allowOutsideClick: false,
        confirmButtonText: 'Ingresar datos',
        cancelButtonText: 'Ahora no',
        confirmButtonClass: 'payment-success',
        cancelButtonClass: 'payment-cancel',
        customClass: 'paymentData',
      }).then((resp) => {
        if (resp.value === true) {
          this.router.navigate(['/mi-perfil', 'pagos']);
        }
      });
    }
  }



  /**
   * Metodo para obtener el resumen del mes generados
   */

  public getInfomonth() {
    this.subscription = this.link.getReports().subscribe((resume: any) => {
      this.paymentPending = resume.money.paymentPending;
    });
  }

  public saveProposal() {
    const datos = {
      message: this.dateForm.controls.description.value,
    };
    this.user.saveFeedback(datos).subscribe((resp) => {
      this.sendData = true;
      this.dateForm.reset();
    });
  }
  public cerrarForm() {
    this.formData = false;
    this.sendData = false;
    this.dateForm.reset();
  }
  public openForm() {
    this.formData = true;
  }
}
