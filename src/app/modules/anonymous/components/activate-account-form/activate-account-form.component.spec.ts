import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateAccountFormComponent } from './activate-account-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';
import { of, throwError, from } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import Swal from 'sweetalert2';
import { UtilsService } from 'src/app/services/utils.service';
import { HomeComponent } from '../../pages/home/home.component';
describe('ActivateAccountFormComponent', () => {
  let component: ActivateAccountFormComponent;
  let fixture: ComponentFixture<ActivateAccountFormComponent>;
  const mockAuthService = jasmine.createSpyObj('AuthService', ['sendActivation']);
  const mockUtilsService = jasmine.createSpyObj('UtilsService', ['showloginForm', 'hideloginForm']);
  const Success = {
    state: 'Success',
    userMessage: null,
  };
  const ErrorService = {
    state: 'Error',
    userMessage: null,
  };

  const InvalidRquest = {
    state: 'Error',
    error: {
      userMessage: 'Internal server error',
    },
  };
beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ActivateAccountFormComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot({}),
        HttpClientTestingModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        RouterTestingModule.withRoutes([
          { path: 'inicio', component: HomeComponent}
        ]),
        SharedModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem('ACCESS_TOKEN');
            },
            throwNoTokenError: true,
            allowedDomains: [],
            disallowedRoutes: [],
          },
        }),
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UtilsService, useValue: mockUtilsService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    mockAuthService.sendActivation.and.returnValue(of(Success));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('hide activated', () => {
    component.hideActivate();
    expect(mockUtilsService.showloginForm).toHaveBeenCalled();
  });
  it('should activated account', () => {
    spyOn(Swal, 'fire').and.returnValue(
      Promise.resolve<any>({
        title: 'Se ha enviado un email',
        text: 'Su cuenta ha sido activada',
        confirmButtonText: 'Aceptar',
        confirmButtonClass: 'accept-forgot-alert-success',
        type: 'success',
      })
    );
    component.activateForm.controls.email.setValue('david.betancourt@pragma.com.co');
    component.activateAccount();

    expect(mockAuthService.sendActivation).toHaveBeenCalled();
  });
  describe('invalid code', () => {
    beforeEach(function () {
      mockAuthService.sendActivation.and.returnValue(of(ErrorService));
    });
    it('should show error in account', () => {
      spyOn(Swal, 'fire').and.returnValue(
        Promise.resolve<any>({
          title: 'Ups algo salió mal',
          text: 'Codigo invalido',
          confirmButtonText: 'Aceptar',
          confirmButtonClass: 'accept-forgot-alert-error',
          type: 'error',
        })
      );
      component.activateAccount();
      expect(mockAuthService.sendActivation).toHaveBeenCalled();
    });
  });
  describe('invalid request activated', () => {
    beforeEach(function () {
      mockAuthService.sendActivation.and.returnValue(throwError(InvalidRquest));
    });

    it('actived account invalid request', () => {
      spyOn(Swal, 'fire').and.returnValue(
        Promise.resolve<any>({
          title: 'Ups algo salió mal',
          text: 'Error en el sistema intenta mas tarde',
          confirmButtonText: 'Aceptar',
          confirmButtonClass: 'accept-forgot-alert-error',
          type: 'error',
        })
      );
      component.activateAccount();
      component.activateForm.controls.email.setValue(1);
      expect(mockAuthService.sendActivation).toHaveBeenCalled();
    });
  });
});
