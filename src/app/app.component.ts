import { Component, OnInit, ViewChild, TemplateRef, HostListener, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { trigger, state, style, transition, group, animate } from '@angular/animations';
import { UtilsService } from './services/utils.service';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { BnNgIdleService } from 'bn-ng-idle';
import Swal from 'sweetalert2';
import { BreakpointObserver } from '@angular/cdk/layout';
import { UserService } from './services/user.service';
import { ContentService } from './services/content.service';
import { TokenService } from './services/token.service';
import { SwUpdate } from '@angular/service-worker';
declare var dataLayer: any;
import { PopupComponent } from './modules/shared/components/popup/popup.component';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import decode from 'jwt-decode';
import { SidenavService } from './services/sidenav.service';
import { onMainContentChange } from './animations/animations';
import { OnboardingSwiperComponent } from './modules/shared/components/onboarding-swiper/onboarding-swiper.component';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ModalGenericComponent } from './modules/shared/components/modal-generic/modal-generic.component';
import { ResponseService } from './interfaces/response';
import { MasterDataService } from './services/master-data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [onMainContentChange],
})
export class AppComponent implements OnInit, OnDestroy {
  // isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Web)
  // .pipe(
  //   map(result => result.matches),
  //   shareReplay()
  // );

  name = 'Angular';
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
  contentProteccion: any;
  contentTransparencia: any;
  contentPrograma: any;
  textTerminos: any;
  textProteccion: any;
  textTransparencia: any;
  textPrograma: any;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private utils: UtilsService,
    public auth: AuthService,
    private user: UserService,
    private content: ContentService,
    private token: TokenService,
    private swUpdate: SwUpdate,
    private dialog: MatDialog,
    location: Location,
    private personalInfo: MasterDataService
  ) {
    // this.sidenavService.sideNavState$.subscribe( res => {
    //   this.onSideNavChange = res;
    // });

    translate.setDefaultLang('es');
    translate.use('es');

    this.subscription = router.events.subscribe((url: any) => {
      if (url instanceof NavigationStart) {
        dataLayer.push({
          event: 'pageview',
          virtualPageURL: url.url,
        });
      } else if (url instanceof NavigationEnd && this.role === 'CLICKER') {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.getPopUps();
        }, 500);
      }
    });

    this.isLoggedIn = this.auth.isLoggedIn();

    this.subscription = this.router.events.subscribe(() => {
      const urlLocation = location.prepareExternalUrl(location.path());
      const SplitLocation = urlLocation.split('/');
      this.classPage = SplitLocation[1];
    });
  }

  ngOnInit() {
    this.showUpdateModal();
    this.showAnimation1 = true;
    this.innerWidth = window.innerWidth;
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
  }

  public getTerms() {
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
          if (!this.newTerms) {
            this.termsAndConditions();
          }
        });
    } 
  }

  /**
   * Abre la modal si hay una nueva version de la app
   */
  public showUpdateModal() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        Swal.fire({
          title: '¡Nueva versión disponible!',
          text: 'Haz clic en el botón aceptar.',
          type: 'info',
          allowEscapeKey: false,
          allowOutsideClick: false,
          confirmButtonText: 'Aceptar',
          confirmButtonClass: 'update-success',
          customClass: 'paymentData',
        }).then(() => {
          window.location.reload();
        });
      });
    } 
  }

  public getPopUps() {
    if (this.auth.isLoggedIn() && this.newTerms && this.onboardingViwed) {
      this.content.getPopup().subscribe((resp) => {
        const locationHref = location.href;
        const routeSplit = locationHref.split('/');
        const currentRoute = '/' + routeSplit[routeSplit.length - 1];

        const popUp = resp.find((x) => !x.new && x.seccion === currentRoute);

        if (popUp) {
          const infoPopUp = {
            imageUrlWeb: popUp.imageurlweb,
            imageUrlMobile: popUp.imageurlmobile,
            textbutton: popUp.textbutton,
            colorbutton: popUp.colorbutton,
            BLink: popUp.link,
          };

          this.openPopUp(infoPopUp);
          this.saveVisitOffer(popUp.id);
        }
      });
    }
  }

  public openPopUp(infoPopUp) {
    this.dialog.open(PopupComponent, {
      data: {
        ...infoPopUp,
      },
      panelClass: 'dynamic-popup',
    });
  }

  public saveVisitOffer(idoffer) {
    const token = localStorage.getItem('ACCESS_TOKEN');
    const tokenDecode = decode(token);
    const userId = tokenDecode.userid;

    this.content.saveVisitOffer({ idoffer, userId }).subscribe((resp) => {});
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
        this.subscription = this.user.getuserdata().subscribe((user) => {
          this.onboardingViwed = user.onBoardingViewed;
          this.firstName = user.firstNames;
          this.lastName = user.lastNames;
          this.managedPayments = user.managedPayments;
          this.isEmployee = user.isEmployeeGrupoExito;
          this.newTerms = user.acceptTermsReferrals;
          if (!this.newTerms) {
            this.getTerms();
          }
          this.showModalsSecuence();
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
}
