import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { UntypedFormGroup, Validators, UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { ResponseService } from 'src/app/interfaces/response';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { UtilsService } from 'src/app/services/utils.service';
import decode from 'jwt-decode';
import { LinksService } from 'src/app/services/links.service';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';
declare var dataLayer: any;
declare const google: any;
declare const FB: any;

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.scss'],
})
export class LoginformComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('googleBtn') googleBtn: ElementRef;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: UntypedFormBuilder,
    private loading: LoaderService,
    private utils: UtilsService,
    private link: LinksService,
    @Inject(PLATFORM_ID) private platformId: object,
  ) { }

  private subscription: Subscription = new Subscription();

  loginForm: UntypedFormGroup;
  isSubmitted = false;
  emailPattern = '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}';
  loggedIn: boolean;

  ngOnInit() {
    this.loginForm = this.fb.group({
      Username: ['', [Validators.required, Validators.pattern(this.emailPattern), Validators.maxLength(64)]],
      Password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    });
  }

  ngAfterViewInit(): void {
    this.googleInit();
    this.fbInit();
  }

  fbInit() {
    (<any>window).fbAsyncInit = function () {
      FB.init({
        appId: '470948245156151',
        cookie: true,
        xfbml: true,
        version: 'v15.0'
      });
      FB.getLoginStatus(function (response) {
        console.log(response);
        if (response.status === 'connected') {
          FB.logout();
        }
      });
      FB.AppEvents.logPageView();

    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  fbLogin() {
    FB.login((response) => {
      console.log('response', response)
      if (response.authResponse) {
        FB.api('/me?fields=email,name,picture', (res) => {
          console.log('res', res)
        })
      }
    }, {
      scope: 'email',
      return_scopes: true
    })
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: environment.GOOGLE_SIGNIN,
      callback: this.handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: 'outline', size: 'large', width: '100%' } // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }

  handleCredentialResponse(response: any) {
    console.log('Encoded JWT ID token: ' + response.credential);
  }



  /**
   * Metodo para loguearse
   * @params recibe Password y Username
   */

  public login() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const loginData = {
      Password: btoa(this.loginForm.value.Password),
      Username: this.loginForm.value.Username,
    };

    this.loading.show();

    this.subscription = this.authService.login(loginData).subscribe(
      (resp: ResponseService) => {
        this.loading.hide();
        if (resp.state === 'Success') {
          setTimeout(() => {
            this.getAmount();
          }, 500);
          localStorage.setItem('ACCESS_TOKEN', resp.objectResponse.token);
          localStorage.setItem('REFRESH_TOKEN', resp.objectResponse.refreshToken);
          this.utils.hideloginForm();
          this.routeBased();
          if (isPlatformBrowser(this.platformId)) {
            dataLayer.push({
              event: 'pushEventGA',
              categoria: 'IniciarSesion',
              accion: 'ClicLightboxIniciar',
              etiqueta: 'IniciarSesionExitoso',
            });

            dataLayer.push({
              event: 'pushEventGA',
              categoria: 'Inicio',
              accion: 'ClicLateral',
              etiqueta: this.loginForm.value.Username,
            });
          }
        } else {
          Swal.fire({
            title: 'Login inválido',
            text: resp.userMessage,
            type: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonClass: 'accept-login-alert-error',
          });
        }
      },
      (error) => {
        this.loading.hide();
        Swal.fire({
          title: error.statusText,
          text: error.error.userMessage,
          type: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonClass: 'accept-forgot-alert-invalid',
        });
      }
    );
  }

  @HostListener('over')
  hideLogin() {
    this.utils.hideloginForm();
  }

  @HostListener('over')
  showRegister() {
    this.utils.showRegisterForm();
  }

  @HostListener('over')
  showForgot() {
    this.utils.showForgot();
  }

  @HostListener('over')
  showActivate() {
    this.utils.showActivate();
  }

  /** Al momento de hacer login determina la ruta por el perfil de usuario */

  private routeBased() {
    const token = localStorage.getItem('ACCESS_TOKEN');
    const tokenDecode = decode(token);
    if (tokenDecode.role === 'CLICKER') {
      if (window.location.toString().includes('url')) {
        this.router.navigateByUrl(window.location.toString());
      } else {
        this.router.navigate(['/inicio']);
      }
      this.authService.isLogged$.next(true);
    }
    if (tokenDecode.role === 'ADMIN' || tokenDecode.role === 'SUPERADMIN') {
      localStorage.clear();
    }

    if (tokenDecode.role === 'PARTNER' || tokenDecode.role === 'PARTNER-CASHIER') {
      this.router.navigate(['/partner']);
      this.authService.isLogged$.next(true);
      if (tokenDecode.role === 'PARTNER-CASHIER') {
        this.authService.getRole$.next('PARTNER-CASHIER');
      } else {
        this.authService.getRole$.next('PARTNER');
      }
    }
  }

  public getAmount() {
    this.subscription = this.link.getAmount().subscribe((amount) => {
      localStorage.setItem('Amount', amount.amountsCommission);
      localStorage.setItem('AmonuntReferred', amount.amountsReferred);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
