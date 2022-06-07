import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
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
declare var dataLayer: any;

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.scss'],
})
export class LoginformComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private loading: LoaderService,
    private utils: UtilsService,
    private link: LinksService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  private subscription: Subscription = new Subscription();

  loginForm: FormGroup;
  isSubmitted = false;
  emailPattern = '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}';

  ngOnInit() {
    this.loginForm = this.fb.group({
      Username: ['', [Validators.required, Validators.pattern(this.emailPattern), Validators.maxLength(64)]],
      Password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    });
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
        // const origin = window.location.origin;
        // window.location.replace(`${origin}/inicio`);
      }
      this.authService.isLogged$.next(true);
    }
    if (tokenDecode.role === 'ADMIN' || tokenDecode.role === 'SUPERADMIN') {
      localStorage.clear();
    }
    if (tokenDecode.role === 'PARTNER') {
      this.router.navigate(['/partner']);
      this.authService.isLogged$.next(true);
      this.authService.getRole$.next('PARTNER');
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
