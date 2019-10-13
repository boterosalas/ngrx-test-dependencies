import { HttpClient } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { async, TestBed, ComponentFixture } from "@angular/core/testing";
import {
  TranslateLoader,
  TranslateModule,
  TranslateService
} from "@ngx-translate/core";
import { AppComponent } from "./app.component";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

// const TRANSLATIONS_ES = require('../assets/i18n/es.json');

describe("AppComponent", () => {
  // let translate: TranslateService;
  // let http: HttpTestingController;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({}),
        RouterTestingModule.withRoutes([])
      ],
      providers: [TranslateService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    // translate = TestBed.get(TranslateService);
    // http = TestBed.get(HttpTestingController);
  }));

  it("should create the app", async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  describe("header", () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it("hide login", () => {
      component.hideLogin();
      component.isOpen = true;
      component.showLoginForm = false;
      component.showRegisterForm = false;
      component.showForgotForm = false;
      expect(component.isOpen).toBeTruthy();
      expect(component.showLoginForm).toBeFalsy();
      expect(component.showRegisterForm).toBeFalsy();
      expect(component.showForgotForm).toBeFalsy();
    });

    it("showRegister", () => {
      component.showRegisterForm = true;
      component.showLoginForm = false;
      component.showForgotForm = false;
      component.showRegister();
      expect(component.showRegisterForm).toBeTruthy();
      expect(component.showLoginForm).toBeFalsy();
      expect(component.showForgotForm).toBeFalsy();
    });

    it("showLogin", () => {
      component.showLoginForm = true;
      component.showRegisterForm = false;
      component.showForgotForm = false;
      component.showLogin();
      expect(component.showLoginForm).toBeTruthy();
      expect(component.showRegisterForm).toBeFalsy();
      expect(component.showForgotForm).toBeFalsy();
    });

    it("showForgot", () => {
      component.showForgotForm = true;
      component.showLoginForm = false;
      component.showRegisterForm = false;
      component.showForgot();
      expect(component.showLoginForm).toBeFalsy();
      expect(component.showRegisterForm).toBeFalsy();
      expect(component.showForgotForm).toBeTruthy();
    });
  });
});
