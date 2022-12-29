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

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.scss'],
})
export class LoginformComponent implements OnInit, OnDestroy {
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

  /**
   * Metodo para loguearse
   * @params recibe Password y Username
   */

  public loginHandle() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const loginData = {
      Password: btoa(this.loginForm.value.Password),
      Username: this.loginForm.value.Username,
    };
    this.login(loginData);
  }
  
  login(loginData: any) {
    this.loading.show();
    this.subscription = this.authService.login(loginData).subscribe({
      next: (resp: ResponseService) => {
        this.loading.hide();
        if (resp.state === 'Success') {
          setTimeout(() => {
            this.link.getAmount();
          }, 500);
          localStorage.setItem('ACCESS_TOKEN', resp.objectResponse.token);
          localStorage.setItem('REFRESH_TOKEN', resp.objectResponse.refreshToken);
          this.utils.hideloginForm();
          this.authService.routeBased();
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
      error: (error) => {
        this.loading.hide();
        Swal.fire({
          title: error.statusText,
          text: error.error.userMessage,
          type: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonClass: 'accept-forgot-alert-invalid',
        });
      }
    });
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
