import { HomeComponent } from "./home.component";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {
  TranslateModule
} from "@ngx-translate/core";
import { AppMaterialModule } from "src/app/modules/shared/app-material/app-material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from 'src/app/services/user.service';
import { of, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const mockUserService= jasmine.createSpyObj("UserService", ["activateProfile"]);
  const mockAuthService = jasmine.createSpyObj("AuthService", ["login", "isLoggedIn"]);
  const mockUtilsService = jasmine.createSpyObj("UtilsService", ["showRegisterForm"]);

  const dataUser = {
    state: "Success",
    userMessage: null,
    objectResponse:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc…VzIn0.Bcsm-qVHHtRcLlQae_5tVwGpgbPQJkCEQ97ZbwRxz_4"
  };

  let data = {
    "state": "Success",
    "userMessage": "El usuario ha sido activado satisfactoriamente",
    "objectResponse": true
}

  let dataError = {
    "state": "Error",
    "userMessage": "El usuario ya esta activado",
    "objectResponse": true
}

let invalidRquest = {
  state: "Error",
  error:{
    userMessage: 'Internal server error'
  }
}


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        TranslateModule,
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
        TranslateModule.forRoot({})
      ],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: UtilsService, useValue: mockUtilsService }
        // AuthService
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
    mockAuthService.isLoggedIn.and.returnValue(false);
    mockUserService.activateProfile.and.returnValue(of(data));
    mockUtilsService.showRegisterForm.and.returnValue({});
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
    expect(mockAuthService.isLoggedIn).toHaveBeenCalled();
  });

  it('open register', () => {
    component.openRegister();
    expect(mockUtilsService.showRegisterForm).toHaveBeenCalled();
  });

  describe('Error activation', () => {

    beforeEach(() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      mockUserService.activateProfile.and.returnValue(of(dataError));
      mockAuthService.isLoggedIn.and.returnValue(false);
    });

    it('error activation', () => {
      component.ngOnInit();
      component.activateUser();
      expect(mockAuthService.isLoggedIn).toHaveBeenCalled();
      expect(mockUserService.activateProfile).toHaveBeenCalled();
    });
  });

  describe('invalid request', () => {

    beforeEach(() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      mockUserService.activateProfile.and.returnValue(throwError(invalidRquest));
      mockAuthService.isLoggedIn.and.returnValue(false);
    });

    it('invalid request', () => {
      component.ngOnInit();
      component.activateUser();
      expect(mockAuthService.isLoggedIn).toHaveBeenCalled();
      expect(mockUserService.activateProfile).toHaveBeenCalled();
    });
  });

  describe('is loged', () => {

    beforeEach(() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      mockAuthService.login.and.returnValue(of(dataUser));
      mockAuthService.isLoggedIn.and.returnValue(true);
    });

    it('is loged', () => {
      component.ngOnInit();
      expect(mockAuthService.isLoggedIn).toHaveBeenCalled();
    });
  });
  
});
