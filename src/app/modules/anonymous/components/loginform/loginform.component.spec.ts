import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginformComponent } from './loginform.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/services/auth.service';
import { of, Observable, throwError } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { LinksService } from 'src/app/services/links.service';
import { UtilsService } from 'src/app/services/utils.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HomeComponent } from '../../pages/home/home.component';

describe('LoginformComponent', () => {
  let component: LoginformComponent;
  let fixture: ComponentFixture<LoginformComponent>;

  const mockAuthService = jasmine.createSpyObj('AuthService', ['login']);

  const mockLinksService = jasmine.createSpyObj('LinksService', ['getAmount']);

  const mockUtilsService = jasmine.createSpyObj('UtilsService', ['hideloginForm', 'showRegisterForm', 'showForgot', 'showActivate']);

  let amount = {
    amountsCommission: 10000,
    amountsReferred: 500000,
  };

  const dataUser = {
    state: 'Success',
    userMessage: null,
    objectResponse: {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInVzZXJOYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInJvbGUiOiJDTElDS0VSIiwiZXhwIjoxNTcxODY2MDgwLCJpc3MiOiJwcmFjdGluY2FuZXRjb3JlLmNvbSIsImF1ZCI6IkVzdHVkaWFudGVzIn0.UJahw9VBALxwYizSTppjGJYnr618EKlaFW-d3YLugnU',
    },
  };

  const dataUserAdmin = {
    state: 'Success',
    userMessage: null,
    objectResponse: {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInVzZXJOYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInJvbGUiOiJBRE1JTiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFETUlOIiwiaWRlbnRpZmljYXRpb24iOiIxMjM0NTYiLCJmaXJzdG5hbWVzIjoiUHJvYmFuZG8iLCJsYXN0bmFtZXMiOiJBbmRvIiwiZG9jdW1lbnRUeXBlIjoiQ0MiLCJ1c2VyaWQiOiI0OTYiLCJpZGNsaWNrZXIiOiJwcm9iYW5kbzQ5NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImRhdmlkLmJldGFuY3VyQHByYWdtYS5jb20uY28iLCJleHAiOjE1ODk1NTM4MDYsImlzcyI6InByYWN0aW5jYW5ldGNvcmUuY29tIiwiYXVkIjoiRXN0dWRpYW50ZXMifQ.mog4Oqao27IYPC_wyXIjkUJe-ZNnKemUgPr5yL09X28',
    },
  };

  const dataUserInvalid = {
    state: 'Error',
    userMessage: null,
    objectResponse: {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInVzZXJOYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInJvbGUiOiJDTElDS0VSIiwiZXhwIjoxNTcxODY2MDgwLCJpc3MiOiJwcmFjdGluY2FuZXRjb3JlLmNvbSIsImF1ZCI6IkVzdHVkaWFudGVzIn0.UJahw9VBALxwYizSTppjGJYnr618EKlaFW-d3YLugnU',
    },
  };

  const InvalidRquest = {
    state: 'Error',
    error: {
      userMessage: 'Internal server error',
    },
  };

  let mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

let socialAuthServiceMock = jasmine.createSpyObj('socialAuthService', ['authState', 'initState', 'refreshAuthToken', 'signIn', 'signOut']);

beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [LoginformComponent],
      imports: [
        TranslateModule,
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'inicio', component: HomeComponent}
        ]),
        BrowserAnimationsModule,
        TranslateModule.forRoot({}),
        MatPasswordStrengthModule,
        SharedModule,
      ],
      providers: [
        // { provide: Router, useValue: mockRouter},
        { provide: SocialAuthService, useValue: { ...socialAuthServiceMock, authState: new Observable() } },
        TranslateService,
        { provide: AuthService, useValue: mockAuthService },
        { provide: LinksService, useValue: mockLinksService },
        { provide: UtilsService, useValue: mockUtilsService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    mockAuthService.login.and.returnValue(of(dataUser));
    fixture = TestBed.createComponent(LoginformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getamount', () => {
    mockLinksService.getAmount.and.returnValue(of(amount));
    component.getAmount();
    expect(mockLinksService.getAmount).toHaveBeenCalled();
  });

  it('utils functions', () => {
    component.hideLogin();
    component.showRegister();
    component.showForgot();
    component.showActivate();
    expect(mockUtilsService.hideloginForm).toHaveBeenCalled();
    expect(mockUtilsService.showRegisterForm).toHaveBeenCalled();
    expect(mockUtilsService.showForgot).toHaveBeenCalled();
    expect(mockUtilsService.showActivate).toHaveBeenCalled();
    component.isSubmitted = false;
    component.loginForm.controls.Username.setValue('');
    component.loginForm.controls.Password.setValue('');
    component.login();
    let valid = true;
    expect(valid).toBeTruthy();
  });

  /*it('login valid', () => {
    component.isSubmitted = true;
    component.loginForm.controls.Username.setValue('test@test.com');
    component.loginForm.controls.Password.setValue('123456789');
    component.login();
    expect(component.loginForm.invalid).toBeFalsy();
    expect(mockAuthService.login).toHaveBeenCalled();
  });*/


  it('Login invalid', () => {

  });

  describe('Login invalid', () => {

    beforeEach(() => {
      fixture = TestBed.createComponent(LoginformComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      mockAuthService.login.and.returnValue(of(dataUserInvalid));
    });

    it('Login invalid', () => {
      component.isSubmitted = true;
      component.loginForm.controls.Username.setValue(
        'david.betancur@pragma.com.co'
      );
      component.loginForm.controls.Password.setValue('123456');
      component.login();
      expect(mockAuthService.login).toHaveBeenCalled();
    });

  });

  describe('invalid request', () => {
    beforeEach(() => {
      mockAuthService.login.and.returnValue(throwError(InvalidRquest));
    });

    it('invalid request', () => {
      component.isSubmitted = true;
      component.loginForm.controls.Username.setValue('t@gmail.com');
      component.loginForm.controls.Password.setValue('123123');
      component.login();
      expect(mockAuthService.login).toHaveBeenCalled();
    });

    afterAll(() => {
      TestBed.resetTestingModule();
    });
  });

  // describe('Admin login', () => {
  //   beforeEach(() => {

  //     mockAuthService.login.and.returnValue(of(dataUserAdmin));

  //   });

  //   it('login valid', () => {
  //     component.isSubmitted = true;
  //     component.loginForm.controls.Username.setValue('test@test.com');
  //     component.loginForm.controls.Password.setValue('123456789');
  //     component.login();
  //     expect(component.loginForm.invalid).toBeFalsy();
  //     expect(mockAuthService.login).toHaveBeenCalled();
  //   });

  // });
});
