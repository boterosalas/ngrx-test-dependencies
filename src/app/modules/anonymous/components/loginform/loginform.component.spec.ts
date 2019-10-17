import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginformComponent } from "./loginform.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { AppMaterialModule } from "src/app/modules/shared/app-material/app-material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, RouterOutlet, Router } from "@angular/router";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AuthService } from "src/app/services/auth.service";
import { of, Observable, throwError } from "rxjs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe("LoginformComponent", () => {
  let component: LoginformComponent;
  let fixture: ComponentFixture<LoginformComponent>;

  const mockAuthService = jasmine.createSpyObj("AuthService", ["login"]);

  const dataUser = {
    state: "Success",
    userMessage: null,
    objectResponse:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInVzZXJOYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInJvbGUiOiJDTElDS0VSIiwiZXhwIjoxNTcxODY2MDgwLCJpc3MiOiJwcmFjdGluY2FuZXRjb3JlLmNvbSIsImF1ZCI6IkVzdHVkaWFudGVzIn0.UJahw9VBALxwYizSTppjGJYnr618EKlaFW-d3YLugnU"
  };

  const dataUserInvalid = {
    state: "Error",
    userMessage: null,
    objectResponse:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc…VzIn0.Bcsm-qVHHtRcLlQae_5tVwGpgbPQJkCEQ97ZbwRxz_4"
  };

  const InvalidRquest = {
    state: "Error",
    error:{
      userMessage: 'Internal server error'
    }
  }


  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginformComponent],
      imports: [
        TranslateModule,
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
        TranslateModule.forRoot({}),
      ],
      providers: [
        { provide: Router, useValue: mockRouter},
        TranslateService,
        { provide: AuthService, useValue: mockAuthService }
      ],
      schemas: [
        // NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
    mockAuthService.login.and.returnValue(of(dataUser));
  }));

  beforeEach(() => {
    
  localStorage.setItem(
    "ACCESS_TOKEN",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInVzZXJOYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInJvbGUiOiJDTElDS0VSIiwiZXhwIjoxNTcxODY2MDgwLCJpc3MiOiJwcmFjdGluY2FuZXRjb3JlLmNvbSIsImF1ZCI6IkVzdHVkaWFudGVzIn0.UJahw9VBALxwYizSTppjGJYnr618EKlaFW-d3YLugnU"
  );
    fixture = TestBed.createComponent(LoginformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("remove white space password", () => {
    component.loginForm.controls.Password.setValue("12 3456789");
    component.removewhiteSpace();
    expect(component.loginForm.controls.Password.value).toBe("123456789");
  });

  it("remove white space email", () => {
    component.loginForm.controls.Username.setValue("dav id.betancur@pragma.com.co");
    component.removewhiteSpaceEmail();
    expect(component.loginForm.controls.Username.value).toBe("david.betancur@pragma.com.co");
  });
  

  it("login valid", () => {
    component.isSubmitted = true;
    component.loginForm.controls.Username.setValue("test@test.com");
    component.loginForm.controls.Password.setValue("123456789");
    component.login();
    expect(component.loginForm.invalid).toBeFalsy();
    expect(mockAuthService.login).toHaveBeenCalled();
  });

  it("Login invalid", () => {
    component.isSubmitted = false;
    component.loginForm.controls.Username.setValue("");
    component.loginForm.controls.Password.setValue("");
    component.login();
    expect(component.loginForm.invalid).toBeTruthy();
  });

  describe("Login invalid", () => {
    beforeEach(function() {
      mockAuthService.login.and.returnValue(of(dataUserInvalid));
    });

    it("Login invalid", () => {
      component.isSubmitted = true;
      component.loginForm.controls.Username.setValue(
        "david.betancur@pragma.com.co"
      );
      component.loginForm.controls.Password.setValue("123456");
      component.login();
      expect(mockAuthService.login).toHaveBeenCalled();
    });
  });

  describe("invalid request", () => {
    beforeEach(function() {
      mockAuthService.login.and.returnValue(throwError(InvalidRquest));
    });

    it("invalid request", () => {
      component.isSubmitted = true;
      component.loginForm.controls.Username.setValue("t@gmail.com");
      component.loginForm.controls.Password.setValue("123123");
      component.login();
      expect(mockAuthService.login).toHaveBeenCalled();
    });
  });
});
