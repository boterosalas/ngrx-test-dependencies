import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {async, TestBed} from '@angular/core/testing';
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {AppComponent} from './app.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';


// const TRANSLATIONS_ES = require('../assets/i18n/es.json');


describe('AppComponent', () => {
  // let translate: TranslateService;
  // let http: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({}),
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        TranslateService
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    }).compileComponents();
    // translate = TestBed.get(TranslateService);
    // http = TestBed.get(HttpTestingController);
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
