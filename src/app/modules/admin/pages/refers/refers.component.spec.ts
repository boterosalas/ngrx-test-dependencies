import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefersComponent } from './refers.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDaterangepickerMd, LOCALE_CONFIG, LocaleService } from 'ngx-daterangepicker-material';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { config } from 'process';
import { LinksService } from 'src/app/services/links.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';

describe('RefersComponent', () => {
  let component: RefersComponent;
  let fixture: ComponentFixture<RefersComponent>;

  const mockLinksService = jasmine.createSpyObj('LinksService', [
    'getReportReferral',
    'getAmount',
    'saveAmountCommission',
    'saveAmountReferred',
    'getReportReferral',
  ]);

  const report = {
    state: 'Success',
    userMessage: 'se ha enviado un correo',
    objectResponse: [],
  };

  const reportError = {
    state: 'Error',
    userMessage: 'No se ha enviado un correo',
    objectResponse: [],
  };

  const saveCommision = {
    state: 'Success',
    userMessage: 'se ha guardado',
    objectResponse: [],
  };

  const saveCommisionError = {
    state: 'Error',
    userMessage: 'Ha ocurrido un error',
    objectResponse: [],
  };

  let amount = {
    amountsCommission: 10000,
    amountsReferred: 500000,
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RefersComponent],
      imports: [
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        AppMaterialModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        NgxDaterangepickerMd,
        SharedModule,
        RouterTestingModule.withRoutes([]),
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
        { provide: LinksService, useValue: mockLinksService },
        { provide: LOCALE_CONFIG, useValue: config },
        {
          provide: LocaleService,
          useClass: LocaleService,
          deps: [LOCALE_CONFIG],
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    mockLinksService.getAmount.and.returnValue(of(amount));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(mockLinksService.getAmount).toHaveBeenCalled();
    expect(component).toBeTruthy();
  });

  it('save comission', () => {
    mockLinksService.saveAmountCommission.and.returnValue(of(saveCommision));
    component.saveCommission('');
    expect(mockLinksService.saveAmountCommission).toHaveBeenCalled();
  });



  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
