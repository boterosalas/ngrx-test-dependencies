import { Component, OnInit, OnDestroy, HostListener, ViewChild, TemplateRef, Inject, PLATFORM_ID } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from 'src/app/validators/confirm-password.validator';
import Swal from 'sweetalert2';
import { ResponseService } from 'src/app/interfaces/response';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ConfirmEmailValidator } from 'src/app/validators/confirm-email.validator';
import { UserService } from 'src/app/services/user.service';
import { MasterDataService } from 'src/app/services/master-data.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { ContentService } from 'src/app/services/content.service';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { LinksService } from 'src/app/services/links.service';
declare var dataLayer: any;

@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.scss'],
})
export class RegisterformComponent implements OnInit, OnDestroy {
  isASocialNetworkRegister: boolean = false;
  socialFormIdTypeControl: FormControl;
  socialFormIdControl: FormControl;
  socialFormNameControl: FormControl;
  socialNetworkUser: any;
  constructor(
    private authService: AuthService,
    private fb: UntypedFormBuilder,
    private registerUser: UserService,
    private router: Router,
    private loading: LoaderService,
    private utils: UtilsService,
    private dialog: MatDialog,
    private content: ContentService,
    private link: LinksService,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

  private subscription: Subscription = new Subscription();
  private registerFromSocialNetwork$: Subscription = new Subscription();
  registerForm: UntypedFormGroup;
  showTerms: boolean;
  showRegisterForm: boolean;
  showLoginForm: boolean;
  acceptTerms: boolean = null;
  idUserType = [];
  @ViewChild('templateTerms', { static: false })
  templateTerms: TemplateRef<any>;

  emailPattern = '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}';
  namePattern = '[a-zA-Z0-9 àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+';
  socialPattern = '[a-zA-Z0-9 .-_àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+';
  numberPattern = '^(0|[0-9][0-9]*)$';
  passwordPattern = '(?=.*[a-zA-Z])(?=.*[0-9])';
  msg: string;
  classMsg: string;
  amount: any;
  amountReferred: any;


  showPerson = false;
  showBusiness = false;
  typedc = 'documento';
  business: Object[] = [];

  ngOnInit() {
    this.amount = localStorage.getItem('Amount');
    this.amountReferred = localStorage.getItem('AmonuntReferred');

    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(this.namePattern)]],
        lastName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(this.namePattern)]],
        social: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(this.socialPattern)]],
        idType: ['', Validators.required],
        id: ['', [Validators.required, Validators.maxLength(11), Validators.pattern(this.numberPattern)]],
        phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(this.numberPattern)]],
        business: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(this.emailPattern), Validators.maxLength(64)]],
        confirmEmail: ['', []],
        password: [
          '',
          [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern(new RegExp(this.passwordPattern))],
        ],
        confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        acceptTerms: [null, Validators.required],
      },
      {
        validator: [ConfirmPasswordValidator.MatchPassword, ConfirmEmailValidator.MatchEmail],
      }
    );
    // this.showRegisterForm = true;

    this.getidType();
    this.getBusiness();
  }

  showUser(user) {
    this.showRegisterForm = false;
    this.isASocialNetworkRegister = true;
    this.socialNetworkUser = user;
  }

  public getBusiness() {
    this.subscription = this.content.getBusiness().subscribe((resp) => {
      this.business = resp;
    });
  }

  public termsAndConditions() {
    this.dialog.open(ModalGenericComponent, {
      data: {
        title: '',
        template: this.templateTerms,
      },
    });
  }

  public acceptModal() {
    this.dialog.closeAll();
    this.acceptTerms = true;
    this.registerForm.controls.acceptTerms.setValue(true);
  }

  @HostListener('over')
  hideRegister() {
    this.registerForm.reset();
    if (this.showRegisterForm || this.isASocialNetworkRegister) {
      this.showRegisterForm = false;
      this.isASocialNetworkRegister = false;
    } else {
      this.utils.showloginForm();
    }
  }

  /**
   * Metodo para registrar un usuario
   * @params Email, FirstNames, LastNames, Identification, Cellphone. Password, IdType
   */

  public register() {
    this.loading.show();

    const registerForm = {
      Email: this.registerForm.controls.email.value.toLowerCase(),
      FirstNames: this.registerForm.controls.name.value,
      LastNames: this.registerForm.controls.lastName.value,
      social: this.registerForm.controls.social.value,
      Identification: this.registerForm.controls.id.value,
      Cellphone: this.registerForm.controls.phone.value,
      idbusiness: this.registerForm.controls.business.value === "null" ? null : this.registerForm.controls.business.value,
      Password: btoa(this.registerForm.controls.password.value),
      idReferrer: localStorage.getItem('idClicker'),
      idcampaign: parseInt(localStorage.getItem('campaign')),
      IdType: this.registerForm.controls.idType.value,
      acceptHabeasData: true,
      acceptTerms: true,
    };

    this.subscription = this.registerUser.registerUser(registerForm).subscribe(
      (resp: ResponseService) => {
        this.loading.hide();
        if (resp.state === 'Success') {
          if (isPlatformBrowser(this.platformId)) {
            dataLayer.push({
              event: 'pushEventGA',
              categoria: 'Registro',
              accion: 'ClicContinuar',
              etiqueta: 'RegistroExitoso',
            });
          }

          Swal.fire({
            title: 'Revisa tu correo',
            type: 'info',
            html: `
            <div class="text-center">
            <h3 class="gray f-16">Recuerda ir a la bandeja de entrada de tu correo para activar tu cuenta.</h3>
              <p class="f-11">*Revisa también tu bandeja de correo no deseado</p>
              </div>`,
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonText: 'Volver al inicio',
            confirmButtonClass: 'accept-register-alert-success gtmRegistroClicModalValidacion',
          }).then(() => {
            this.utils.hideloginForm();
          });
        } else {
          Swal.fire({
            title: 'Registro inválido',
            text: resp.userMessage,
            type: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonClass: 'accept-register-alert-error',
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
          confirmButtonClass: 'accept-register-alert-invalid',
        });
      }
    );
  }
  registerFromSocialNetwork(event: any) {
    const { idType, identification, bussinessName, acceptTerms, cellphone } = event;
    const registerForm = {
      email: this.socialNetworkUser.email.toLowerCase(),
      firstNames: this.socialNetworkUser.firstName,
      lastNames: this.socialNetworkUser.lastName,
      social: bussinessName,
      identification: identification,
      cellphone: cellphone,
      // idbusiness: this.registerForm.controls.business.value === "null" ? null : this.registerForm.controls.business.value,
      password: '',
      // idReferrer: localStorage.getItem('idClicker'),
      // idcampaign: parseInt(localStorage.getItem('campaign')),
      idType: idType,
      acceptHabeasData: acceptTerms,
      acceptTerms: acceptTerms,
      socialmedia: this.socialNetworkUser.origin || '',
      token: this.socialNetworkUser.token
    }
    console.log('registerForm', registerForm);
    this.registerFromSocialNetwork$ = this.registerUser.registerUser(registerForm).subscribe((res: any) => {
      console.log('REGISTER', res);
      this.login({
        token: this.socialNetworkUser.token,
        username: this.socialNetworkUser.email.toLowerCase()
      });
    })
  }

  login(data: any) {
    this.loading.show();
    this.subscription = this.authService.login(data).subscribe({
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
              etiqueta: this.socialNetworkUser.email.toLowerCase(),
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
  
  /**
   * check para aceptar terminos y condiciones
   */

  public acceptTermsCheck() {
    this.acceptTerms = !this.acceptTerms;
    if (this.acceptTerms === false) {
      this.registerForm.controls.acceptTerms.setValue(null);
    }
  }

  /**
   * Metodo para listar el tipo de identificacion del usuario
   */

  public getidType() {
    this.subscription = this.registerUser.idType().subscribe((res: ResponseService) => {
      this.idUserType = res.objectResponse;
    });
  }

  public selectId(typeId: string) {
    if (typeId === '3') {
      this.showBusiness = true;
      this.showPerson = false;
      this.registerForm.controls.name.clearValidators();
      this.registerForm.controls.lastName.clearValidators();
      this.registerForm.controls.name.setValue(null);
      this.registerForm.controls.lastName.setValue(null);
      this.typedc = 'nit';
    } else {
      this.showBusiness = false;
      this.showPerson = true;
      this.registerForm.controls.social.clearValidators();
      this.registerForm.controls.social.setValue(null);
      this.typedc = 'documento';
    }
  }

  /**
   * Metodo para validar la fuerza de la contraseña
   * @param event evento
   */

  onStrengthChanged(event) {
    this.subscription = this.registerForm.controls.password.valueChanges.subscribe((resp) => {
      if (resp === '') {
        this.msg = '';
      }
    });
    if (event <= 20) {
      this.msg = 'Contraseña débil';
      this.classMsg = 'weak';
    }
    if (event > 20 && event < 100) {
      this.msg = 'Contraseña aceptable';
      this.classMsg = 'normal';
    }
    if (event >= 100) {
      this.msg = 'Contraseña segura';
      this.classMsg = 'acceptable';
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
