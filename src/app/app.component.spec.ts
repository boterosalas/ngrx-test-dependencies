import {
  HttpClientTestingModule} from "@angular/common/http/testing";
import { async, TestBed, ComponentFixture } from "@angular/core/testing";
import {
  TranslateModule,
  TranslateService
} from "@ngx-translate/core";
import { AppComponent } from "./app.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";
import { JwtModule } from '@auth0/angular-jwt';
import { BnNgIdleService } from 'bn-ng-idle';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { SwUpdate, ServiceWorkerModule } from '@angular/service-worker';

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
        RouterTestingModule.withRoutes([]),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFireMessagingModule,
        ServiceWorkerModule.register('', {enabled: false}),
        AngularFireModule.initializeApp({
          apiKey: "AIzaSyBLEXtXZGfMEm6dLHtngNa_HWgEjjrk-14",
          authDomain: "test-push-notification-633a0.firebaseapp.com",
          databaseURL: "https://test-push-notification-633a0.firebaseio.com",
          projectId: "test-push-notification-633a0",
          storageBucket: "test-push-notification-633a0.appspot.com",
          messagingSenderId: "374253972065",
          appId: "1:374253972065:web:96a6651d3a2f816451d820",
          measurementId: "G-BESRDNSPL1"
        }),
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem('ACCESS_TOKEN');
            },
            throwNoTokenError: true,
            whitelistedDomains: [],
            blacklistedRoutes: []
          }
        })
      ],
      providers: [TranslateService, BnNgIdleService, SwUpdate],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    // translate = TestBed.get(TranslateService);
    // http = TestBed.get(HttpTestingController);
  }));

  it("should create the app", async(() => {
    localStorage.setItem('ACCESS_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInVzZXJOYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInJvbGUiOiJDTElDS0VSIiwiZXhwIjoxNTcxODY2MDgwLCJpc3MiOiJwcmFjdGluY2FuZXRjb3JlLmNvbSIsImF1ZCI6IkVzdHVkaWFudGVzIn0.UJahw9VBALxwYizSTppjGJYnr618EKlaFW-d3YLugnU');
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
