import { Component, OnInit, HostListener, OnDestroy, ViewChild, TemplateRef, Inject, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { trigger, state, style, transition, animate, group } from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';
import decode from 'jwt-decode';
import { ContentService } from 'src/app/services/content.service';

import { MatDialog } from '@angular/material/dialog';
import { LinksService } from 'src/app/services/links.service';
import { MessagingService } from 'src/app/shared/messaging.service';
import { Meta } from '@angular/platform-browser';
import { MasterDataService } from 'src/app/services/master-data.service';
import { UntypedFormBuilder } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { TokenService } from 'src/app/services/token.service';
import { ClickamerWayComponent } from '../../components/clickamer-way/clickamer-way.component';
import { NgNavigatorShareService } from 'ng-navigator-share';

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
  offersWeb: any;
  topProducts: any;
  isEmployee: any;
  @ViewChild('templatePromo', { static: false })
  templatePromo: TemplateRef<any>;
  managedPayments: boolean = true;
  hasminimuncommission: boolean = false;
  role: string;
  userId: any;
  message: any;
  modalTarget = '_self';
  newTerms: boolean;
  acceptTerms: boolean = null;
  @ViewChild('templateTerms', { static: false })
  templateTerms: TemplateRef<any>;
  @ViewChild('templateClickamWay', { static: false })
  templateClickamWay: TemplateRef<any>;
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

  modalHref: string;
  modalAltMobile: string;
  modalAltWeb: string;
  modalHrefMobile: string;
  modalSrcWeb: string;
  modalSrcMobile: string;
  url: string;
  imageWay: string;
  textWay: string;
  titleWay: string;
  urlWhatsapp: string;
  direction = 'row';
  directionMobile = 'column-reverse';
  firstBuy:string;

  showWay = true;
  nameButton: string;
  path: string;
  dialogWay: any;

  @ViewChild('templateTestimonials', { static: true })
  templateTestimonials: TemplateRef<any>;

  testimonials = [];

  slideConfig = {
    slidesToShow: 6,
    slidesToScroll: 1,
    dots: false,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    arrows: false,
    lazyLoad: 'ondemand',
    swipeToSlide: true,
    variableWidth: true,
  };

  slideConfigProductsLogged = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    dotClass: 'slick-dots orange',
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: false,
    arrows: false,
    variableWidth: false,
    lazyLoad: 'ondemand',
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          variableWidth: false,
          dots: true,
        },
      },
    ],
  };

  slideConfigTestimonials = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    dotClass: 'slick-dots orange',
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: false,
    arrows: false,
    variableWidth: false,
    lazyLoad: 'ondemand',
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          dots: true,
          autoplay: true,
          autoplaySpeed: 5000,
        },
      },
    ],
  };

  missions = [];

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private user: UserService,
    private utils: UtilsService,
    public auth: AuthService,
    private content: ContentService,
    private dialog: MatDialog,
    private link: LinksService,
    private messagingService: MessagingService,
    private metaTagService: Meta,
    private fb: UntypedFormBuilder,
    private personalInfo: MasterDataService,
    @Inject(PLATFORM_ID) private platformId: object,
    private token: TokenService,
    public ngNavigatorShareService: NgNavigatorShareService,
  ) {
    
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
          if (params.widget) {
            this.utils.showloginForm();
          }
        }
      }
    });
    this.ngNavigatorShareService = ngNavigatorShareService;
  }

  public generateLink(dataEmail?: any) {
    const idClicker = dataEmail;
    const formData: FormData = new FormData();
    formData.append('idClicker', idClicker);
    formData.append('type', 'Visit');
    this.content.setClick(formData).subscribe();
  }

  public generateUrl() {
    if (this.token.user && this.token.user.idclicker !== undefined) {
      const domain = document.location.origin;
      this.urlWhatsapp = encodeURI(`${domain}/inicio?code=${this.token.user.idclicker.replace(' ', '%20')}`);
      this.url = encodeURI(`${domain}/inicio?code=${this.token.user.idclicker}`);
    }
  }

  public copyLink(inputElement: any) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.utils.openSnackBar('Se ha copiado el link al portapapeles', 'Cerrar');
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
    this.getOffers();
    this.getUserDataUser();
    this.getAmount();
    this.amount = localStorage.getItem('Amount');
    this.amountReferred = localStorage.getItem('AmonuntReferred');
    this.getTerms();
    this.getTestimoniesUser();
    this.getBussiness();
    this.getFirstBuy();
  }

  public getTestimoniesUser() {
    this.subscription = this.user.getTestimoniesUser().subscribe((testimoniesUser) => {
      this.testimonials = testimoniesUser.withPhoto;
    });
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

  public getBussiness() {
    this.subscription = this.content.getBusiness().subscribe((bussiness) => {
      this.bussiness = bussiness;
    });
  }

  public getUserDataUser() {
    this.subscription = this.auth.getRole$.subscribe((role) => {
      this.generateUrl();
      this.role = role;
      if (role === 'CLICKER' || role === 'ADMIN' || role === 'SUPERADMIN') {
        this.subscription = this.user.getuserdata().subscribe((user) => {
          this.isEmployee = user.isemployeegrupoexito;
          this.managedPayments = user.managedpayments;
          this.hasminimuncommission = user.hasminimuncommission;
          if (role === 'CLICKER') {
            this.getMissions();
            this.newTerms = user.accepttermsreferrals;
            if (this.newTerms === true) {
              this.showModalPayment();
            }
          }
        });
      }
      if (isPlatformBrowser(this.platformId)) {
        const interval = setInterval(() => {
          this.showModalPayment();
          if (this.paymentPending > 10000) {
            clearInterval(interval);
          }
        }, 3000);
      }

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

  public getOffers() {
    this.subscription = this.content.getOffersbyType({ id: 'OFERTA', admin: false }).subscribe((resp) => {
      this.topProducts = resp;
    });

    this.subscription = this.content.getOffersbyType({ id: 'CARROUSEL', admin: false }).subscribe((resp) => {
      this.offersWeb = resp;
    });
  }

  public bussinessNavigation(bussiness) {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (!token) {
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
        text: `Recuerda que para recibir el pago de tus recompensas , debes registrar tus datos bancarios. (Tienes recompensas pendientes por $${this.paymentPending})`,
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

  public getInfomonth() {
    this.subscription = this.link.getReports().subscribe((resume: any) => {
      this.paymentPending = resume.money.paymentPending;
    });
  }

  public getMissions() {
    this.subscription = this.content.getMissions().subscribe((mission) => {
      this.missions = mission;
    });
  }

  public modalWay(position: any, mission: any) {
    const template = this.templateClickamWay;
    const title = 'EL CAMINO DEL CLICKAMER';
    const id = 'way';
    const { detail, code } = mission;

    this.dialogWay = this.dialog.open(ClickamerWayComponent, {
      width: '700px',
      panelClass: 'waypad',
      data: {
        title,
        id,
        template,
      },
    });

    this.dialogWay.beforeClosed().subscribe(() => {
      this.getMissions();
    });

    switch (position) {
      case 0:
        this.direction = 'row';
        this.imageWay = '/assets/img/way/ingresaste.png';
        this.titleWay = 'Ingresaste a Clickam';
        this.textWay = detail;
        this.showWay = false;
        this.saveMission(code);
        break;

      case 1:
        this.direction = 'row';
        this.imageWay = '/assets/img/way/registro.png';
        this.titleWay = 'Completaste tu registro';
        this.textWay = detail;
        this.showWay = true;
        this.nameButton = 'Mi perfil';
        this.path = 'mi-perfil';
        break;

      case 2:
        this.direction = 'row-reverse';
        this.imageWay = '/assets/img/way/extension.png';
        this.titleWay = 'Aprendiste sobre la extensión de Chrome';
        this.textWay = detail;
        this.showWay = true;
        this.saveMission(code);
        this.nameButton = 'Instalar Extensión';
        this.path = '';
        break;

      case 3:
        this.direction = 'row-reverse';
        this.imageWay = '/assets/img/way/compra.png';
        this.titleWay = 'Realizaste tu primera compra (¡Que rico ahorrar!)';
        this.textWay = detail;
        this.showWay = true;
        this.saveMission(code);
        this.nameButton = 'Conocer Aliados';
        this.path = '/negocios';
        break;

      case 4:
        this.direction = 'row';
        this.imageWay = '/assets/img/way/amigo.png';
        this.titleWay = 'Tienes un amigo que ahora hace parte de Clickam';
        this.textWay = detail;
        this.showWay = true;
        this.saveMission(code);
        this.nameButton = 'Invitar Amigos';
        this.path = '/referidos';
        break;

      case 5:
        this.direction = 'row-reverse';
        this.imageWay = '/assets/img/way/refiere.png';
        this.titleWay = 'Referiste tu primer producto de forma exitosa';
        this.textWay = detail;
        this.showWay = true;
        this.saveMission(code);
        this.nameButton = 'Conoce los Reportes';
        this.path = '/reportes';
        break;

      default:
        this.imageWay = '/assets/img/way/ingresaste.png';
        this.titleWay = '';
        this.textWay = '';
        break;
    }
  }

  public share(url: string) {
    this.ngNavigatorShareService
      .share({
        title: '',
        text: '',
        url: url,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public routeWay() {
    if (this.path !== '') {
      this.router.navigate([this.path]);
      this.dialogWay.close();
    } else {
      window.open('https://chrome.google.com/webstore/detail/clickam-cashback/jnfdngchdoaemojfkecanhlfgelofibh?authuser=1', '_blank');
    }
  }

  public saveMission(mission: string) {
    this.subscription = this.content.saveMission(mission).subscribe();
  }

  public logros() {
    this.saveMission('GAMIFICATION');
    setTimeout(() => {
      this.router.navigate(['/logros']);
    }, 500);
  }

  public openPollDesktop() {
    window.open('https://app.useberry.com/t/pQwhtanaO13W/', '_blank');
  }

  public openPollMobile() {
    window.open('https://app.useberry.com/t/5HXrwyTwDN1c/', '_blank');
  }

  public openVideo() {
    window.open('https://youtube.com/shorts/5DSLlSCwJiw?feature=share', '_blank');
  }

  getFirstBuy() {
    this.subscription = this.user.getFirstBuy().subscribe((firstBuy: any) => {
      this.firstBuy = firstBuy.value;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
