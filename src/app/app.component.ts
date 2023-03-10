import { Component, OnInit, ViewChild, TemplateRef, HostListener, OnDestroy, Inject, PLATFORM_ID, OnChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationStart, NavigationEnd, Routes, ActivatedRoute } from '@angular/router';
import { UtilsService } from './services/utils.service';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { ContentService } from './services/content.service';
import { TokenService } from './services/token.service';
declare var dataLayer: any;
import { PopupComponent } from './modules/shared/components/popup/popup.component';
import { isPlatformBrowser, Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import decode from 'jwt-decode';
import { onMainContentChange } from './animations/animations';
import { OnboardingSwiperComponent } from './modules/shared/components/onboarding-swiper/onboarding-swiper.component';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ModalGenericComponent } from './modules/shared/components/modal-generic/modal-generic.component';
import { ResponseService } from './interfaces/response';
import { MasterDataService } from './services/master-data.service';
import { UpdateService } from './services/update.service';
import { ReviewClickamComponent } from './modules/shared/components/review-clickam/review-clickam.component';
import Swal from 'sweetalert2';
import { PreviousRouteService } from './services/previous-route.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [onMainContentChange],
})
export class AppComponent implements OnInit, OnDestroy {
  name = 'Clickam';
  public onSideNavChange: boolean;

  @ViewChild('templateCardLogin, TemplateCardRegister, TemplateCardForgot, templateCardActivate', {
    static: false,
  })
  template: TemplateRef<any>;
  isHome: boolean;
  internal: boolean;
  showLoginForm: boolean;
  showRegisterForm: boolean;
  showForgotForm: boolean;
  showActivateForm: boolean;
  isOpen = false;
  isOpenMenu = false;
  private subscription: Subscription = new Subscription();
  innerWidth: number;
  showAnimation1: boolean;
  showAnimation2: boolean;
  isLoggedIn: any;
  firstName: string;
  lastName: string;
  email: string;
  userInfo: any;
  onboardingViwed: boolean = false;
  managedPayments: boolean;
  isEmployee: boolean;
  role: string;
  classPage: string;
  location: Location;
  timeout: any;
  newTerms: boolean;
  acceptTerms: boolean = null;
  @ViewChild('templateTerms', { static: false })
  templateTerms: TemplateRef<any>;
  newTermsHTML = false;
  stepTerms = true;
  activateButton = false;
  contentTerminos: any;
  contentTerminosPJ: any;
  contentProteccion: any;
  contentTransparencia: any;
  contentPrograma: any;
  textTerminos: any;
  textTerminosPJ: any;
  textProteccion: any;
  textTransparencia: any;
  textPrograma: any;
  hideFH = false;
  rateapp = false;
  openRegister: boolean = true;
  idPopup: any;
  idCampaign: number;
  slowConection = false;
  documentType: string;
  popups: any[] = [];

  constructor(
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private utils: UtilsService,
    public auth: AuthService,
    private user: UserService,
    private content: ContentService,
    private token: TokenService,
    private sw: UpdateService,
    private dialog: MatDialog,
    location: Location,
    private personalInfo: MasterDataService,
    @Inject(PLATFORM_ID) private platformId: object,
    private previousRouteService: PreviousRouteService
  ) {
    this.sw.checkForUpdates();

    if (isPlatformBrowser(this.platformId)) {
      translate.setDefaultLang('es');
      translate.use('es');
    }

    this.subscription = router.events.subscribe((url: any) => {
      if (url instanceof NavigationStart) {
        if (this.role === 'PARTNER' && url.url !== '/partner') {
          this.router.navigate(['/partner']);
        }

        if (isPlatformBrowser(this.platformId)) {
          dataLayer.push({
            event: 'pageview',
            virtualPageURL: url.url,
          });
        }

        const splitUrl = url.url.split('/');
        if (splitUrl[1] === 'url') {
          this.hideFH = true;
        } else {
          this.hideFH = false;
        }
        dataLayer.push({
          event: 'pageview',
          virtualPageURL: url.url,
        });
      } else if (url instanceof NavigationEnd && this.role === 'CLICKER') {
        clearTimeout(this.timeout);
        this.triggerPopup();
      }
    });

    this.isLoggedIn = this.auth.isLoggedIn();

    this.subscription = this.router.events.subscribe(() => {
      const urlLocation = location.prepareExternalUrl(location.path());
      const SplitLocation = urlLocation.split('/');
      this.classPage = SplitLocation[1];
    });

    this.subscription = this.route.queryParams.subscribe((params) => {
      if (!!params.campaign) {
        localStorage.setItem('campaign', params.id);
        this.saveVisitCampaign(parseInt(params.id));
      }
      if (params.register === 'true') {
        this.utils.showRegisterForm();
      }
    });
  }

  ngOnInit() {
    this.initService();
    this.showAnimation1 = true;
    if (isPlatformBrowser(this.platformId)) {
      this.innerWidth = window.innerWidth;
    }
    this.showLoginForm = true;
    this.showRegisterForm = false;
    this.showForgotForm = false;
    this.showActivateForm = false;

    this.subscription = this.utils.change.subscribe((isOpen) => {
      this.isOpen = isOpen;
      this.showRegisterForm = false;
      this.showLoginForm = true;
      this.showForgotForm = false;
      this.showActivateForm = false;
    });

    this.subscription = this.utils.changeMenu.subscribe((isOpenMenu) => {
      this.isOpenMenu = isOpenMenu;
    });

    this.subscription = this.utils.changeRegister.subscribe((isOpenRegister) => {
      this.isOpen = isOpenRegister;
      this.showRegisterForm = true;
      this.showLoginForm = false;
      this.showForgotForm = false;
      this.showActivateForm = false;
    });

    this.subscription = this.utils.showForgotFormEmit.subscribe((isOpenForgot) => {
      this.isOpen = isOpenForgot;
      this.showRegisterForm = false;
      this.showLoginForm = false;
      this.showActivateForm = false;
      this.showForgotForm = true;
    });

    this.subscription = this.utils.showActivateFormEmit.subscribe((isOpenActivate) => {
      this.isOpen = isOpenActivate;
      this.showActivateForm = true;
      this.showRegisterForm = false;
      this.showLoginForm = false;
      this.showForgotForm = false;
    });

    this.windowWidth();
    this.getUserData();
    this.review();
  }

  public saveVisitCampaign(id: number) {
    this.subscription = this.user.saveVisitCampaign(id).subscribe();
  }

  public getTerms() {
    this.personalInfo.getTerms().subscribe((resp: any) => {
      this.contentTerminos = resp.objectResponse[0].sectionvalue;
      this.contentProteccion = resp.objectResponse[1].sectionvalue;
      this.contentTransparencia = resp.objectResponse[2].sectionvalue;
      this.contentPrograma = resp.objectResponse[3].sectionvalue;
      this.contentTerminosPJ = resp.objectResponse[4].sectionvalue;
      this.textTerminos = resp.objectResponse[0].sectiontitle;
      this.textProteccion = resp.objectResponse[1].sectiontitle;
      this.textTransparencia = resp.objectResponse[2].sectiontitle;
      this.textPrograma = resp.objectResponse[3].sectiontitle;
      this.textTerminosPJ = resp.objectResponse[4].sectiontitle;
    });
  }

  public termsAndConditions() {
    const template = this.templateTerms;
    const title = '';
    const id = 'newTerms';
    this.dialog.open(ModalGenericComponent, {
      disableClose: true,
      data: {
        title,
        id,
        template,
      },
    });
  }

  public showTerms() {
    this.stepTerms = false;
    this.newTermsHTML = true;
  }

  public logout() {
    this.stepTerms = true;
    this.newTermsHTML = false;
    this.activateButton = false;
    this.utils.logout();
    this.dialog.closeAll();
  }

  public acceptTermsCheck(buttonState: MatCheckboxChange) {
    if (buttonState.checked === true) {
      this.activateButton = true;
    } else {
      this.activateButton = false;
    }
  }

  public sendReferalsTerm() {
    this.user.saveUserAcceptTermsReferrals().subscribe((resp: ResponseService) => {
      this.stepTerms = true;
      this.newTermsHTML = false;
      this.activateButton = false;
      this.dialog.closeAll();
      this.newTerms = true;
    });
  }

  /**
   * Sigue la secuencia para abrir las modales
   */
  showModalsSecuence() {
    if (!this.onboardingViwed && this.role === 'CLICKER') {
      this.dialog
        .open(OnboardingSwiperComponent, { panelClass: 'panel-class-onboarding' })
        .afterClosed()
        .subscribe(() => {
          this.user.saveOnboarding(true).subscribe();
          this.onboardingViwed = true;
        });
    }
  }

  public review() {
    this.auth.rate$.subscribe((resp) => {
      if (resp && this.onboardingViwed === true && this.role === 'CLICKER' && this.innerWidth < 600 && !this.rateapp) {
        this.dialog
          .open(ReviewClickamComponent, {
            width: '350px',
          })
          .afterClosed()
          .subscribe(() => {
            this.user.rateapp(true).subscribe();
          });
      }
    });
  }

  public getPopUps() {
    if (this.auth.isLoggedIn() && this.newTerms && this.onboardingViwed) {
      this.content.getPopup().subscribe((resp) => {
        this.popups = resp;
        this.triggerPopup();
      });
    }
  }

  triggerPopup() {
    const locationHref = location.href;
    const routeSplit = locationHref.split('/');
    const currentRoute = `/${routeSplit[routeSplit.length - 1]}`;
    const popupsToshow = this.popups.filter((popup: any) => !popup.new && popup.seccion === currentRoute);
    popupsToshow.length > 0 && this.openPopUp(popupsToshow);
  }

  public openPopUp(popupsToshow: any) {
    this.dialog.open(PopupComponent, {
      data: [
        ...popupsToshow,
      ],
      panelClass: 'transversal-popup',
    });
  }

  public saveVisitOffer(idoffer) {
    const token = localStorage.getItem('ACCESS_TOKEN');
    const tokenDecode = decode(token);
    const userId = tokenDecode.userid;
    this.content.saveVisitOffer({ idoffer, userId }).subscribe();
  }

  public hideLogin() {
    this.isOpen = !this.isOpen;
    this.showLoginForm = true;
    this.showRegisterForm = false;
    this.showForgotForm = false;
    this.showActivateForm = false;
  }

  public showRegister() {
    this.showRegisterForm = true;
    this.showLoginForm = false;
    this.showForgotForm = false;
    this.showActivateForm = false;
  }

  public showLogin() {
    this.showRegisterForm = false;
    this.showForgotForm = false;
    this.showLoginForm = true;
    this.showActivateForm = false;
  }

  public showForgot() {
    this.showForgotForm = true;
    this.showRegisterForm = false;
    this.showLoginForm = false;
    this.showActivateForm = false;
  }

  public showActivate() {
    this.showForgotForm = false;
    this.showRegisterForm = false;
    this.showLoginForm = false;
    this.showActivateForm = true;
  }

  public getUserData() {
    this.subscription = this.auth.getRole$.subscribe((role) => {
      this.role = role;
      if (role === 'CLICKER' || role === 'ADMIN' || role === 'SUPERADMIN') {
        this.email = this.token.userInfo().userName;
        this.documentType = this.token.userInfo().documentType;
        this.subscription = this.user.getuserdata().subscribe((user) => {
          this.onboardingViwed = user.onboardingviewed;
          this.rateapp = user.rateapp;
          this.firstName = user.firstnames;
          this.lastName = user.lastnames;
          this.managedPayments = user.managedpayments;
          this.isEmployee = user.isemployeegrupoexito;
          this.newTerms = user.accepttermsreferrals;
          if (!this.newTerms && role === 'CLICKER') {
            this.getTerms();
            this.termsAndConditions();
          }
          this.showModalsSecuence();
          this.getPopUps();
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('over')
  hideMenu() {
    this.utils.hideMenu();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = event.target.innerWidth;
    this.windowWidth();
  }

  public windowWidth() {
    if (this.innerWidth > 600) {
      this.showAnimation1 = true;
      this.showAnimation2 = false;
    }
    if (this.innerWidth < 600) {
      this.showAnimation1 = false;
      this.showAnimation2 = true;
    }
  }

  initService() {
    const conn = (navigator as any).connection;
    if (conn) {
      const effectiveType = conn.effectiveType;
      const getConection = localStorage.getItem('conection');
      if (effectiveType !== '4g' && getConection !== '4g') {
        localStorage.setItem('conection', effectiveType);
        Swal.fire({
          html: "<i class='tio-wifi_off purple-text f-48'></i> <h3>Ups!</h3> <p class='purple-text f-19'>No tienes acceso a internet o tu se??al es d??bil. Revisa tu conexi??n.</p>",
          confirmButtonText: 'Continuar',
          confirmButtonClass: 'continue',
          allowOutsideClick: false,
        });
      }
    }
  }
}
