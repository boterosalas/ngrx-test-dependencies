import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionsComponent } from './commissions.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from '../../../../modules/shared/app-material/app-material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxDaterangepickerMd, LocaleService, LOCALE_CONFIG } from 'ngx-daterangepicker-material';
import { MatDatepickerModule, MatDialog, MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnonymousModule } from '../../../../modules/anonymous/anonymous.module';
import { SharedModule } from '../../../../modules/shared/shared.module';
import { config } from 'process';
import * as moment from 'moment';
import { UserService } from '../../../../services/user.service';
import { LinksService } from '../../../../services/links.service';
import { ContentService } from '../../../../services/content.service';
import { of } from 'rxjs';
moment.locale('es');
describe('CommissionsComponent', () => {
  let component: CommissionsComponent;
  let fixture: ComponentFixture<CommissionsComponent>;
  const mockDialog = jasmine.createSpyObj('MatDialog', ['open', 'closeAll', 'afterAllClosed']);
  const mockUserService = jasmine.createSpyObj('UserService', ['getExportNewsExcel', 'getAllNews']);
  const mockLinksService = jasmine.createSpyObj('LinksService', [
    'updateStatusCommissionFile',
    'getReportRejected',
    'updateCommission',
    'deleteCommission',
    'deleteCommissionFile',
  ]);
  const mockContentService = jasmine.createSpyObj('ContentService', ['getCommissionsSearch']);

  const getCommissionsSearch = {
    state: 'Success',
    userMessage: null,
    objectResponse: {
      total: 2967,
      commissions: [
        {
          identification: '1050955208',
          firstnames: 'Eisner',
          lastnames: 'Puerta Carrillo',
          email: 'eisner271190@gmail.com',
          cellphone: '3105009039',
          business: 'exito',
          marketplace: 'No',
          CategoryDescription1: 'Tecnologia',
          CategoryDescription2: 'Impresión',
          CategoryDescription3: 'Impresoras',
          CategoryDescription4: '',
          brand: 'HP',
          productname: 'Tinta HP 664 Negra',
          plu: '392372',
          quantity: 1,
          orderid: '1023692972580-01',
          price: 39900.0,
          totalprice: 39900.0,
          commissionvalue: 199.5,
          commissionbusiness: 99.75,
          totalcommission: 299.25,
          commissiongenerationdate: '2021-05-27T15:51:09.093',
          oncreatedate: '2020-04-08T11:49:36.81',
          idlink: 215712,
          paymentdate: null,
          userid: 738,
          id: 11955,
          medium: 'LINK',
          statusorder: 'canceled',
          document: '717777777',
          documenttype: 'C.C',
          firstnamecustomer: 'Victor ',
          lastnamecustomer: 'Ortiz',
          phonecustomer: '+573014313838',
          categorycode1: '34185084',
          categorycode2: '34602478',
          categorycode3: '34185438',
          categorycode4: '',
        },
      ],
    },
  };

  const updateStatusCommissionFile = {
    state: 'Success',
    userMessage: 'se ha enviado un correo a test@h.com',
    objectResponse: [],
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommissionsComponent],
      imports: [
        TranslateModule.forRoot(),
        AnonymousModule,
        AppMaterialModule,
        MatDatepickerModule,
        MatNativeDateModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        SharedModule,
        NgxDaterangepickerMd,
        RouterTestingModule.withRoutes([]),
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem('ACCESS_TOKEN');
            },
            throwNoTokenError: true,
            whitelistedDomains: [],
            blacklistedRoutes: [],
          },
        }),
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: LOCALE_CONFIG, useValue: config },
        {
          provide: LocaleService,
          useClass: LocaleService,
          deps: [LOCALE_CONFIG],
        },
        { provide: MatDialog, useValue: mockDialog },
        { provide: UserService, useValue: mockUserService },
        { provide: LinksService, useValue: mockLinksService },
        { provide: ContentService, useValue: mockContentService },
      ],
    }).compileComponents();
    mockDialog.closeAll.and.returnValue(of(updateStatusCommissionFile));
    mockContentService.getCommissionsSearch.and.returnValue(of(getCommissionsSearch));
  }));

  beforeEach(() => {
    mockLinksService.updateStatusCommissionFile.and.returnValue(of(updateStatusCommissionFile));
    mockLinksService.getReportRejected.and.returnValue(of(updateStatusCommissionFile));
    mockLinksService.updateCommission.and.returnValue(of(updateStatusCommissionFile));
    mockLinksService.deleteCommission.and.returnValue(of(updateStatusCommissionFile));
    mockLinksService.deleteCommissionFile.and.returnValue(of(updateStatusCommissionFile));
    fixture = TestBed.createComponent(CommissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    let start = moment();
    let end = moment('12-01-2020');
    component.dateFormCommission.controls.dateRange.setValue({
      startDate: start,
      endDate: end,
    });
    const mockFile = new File([''], 'name.xlsx', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };
    component.handleFileInput(mockEvt, 'rejected');
    expect(mockLinksService.updateStatusCommissionFile).toHaveBeenCalled();
    component.handleFileInput(mockEvt, 'eliminated');
    expect(mockLinksService.deleteCommissionFile).toHaveBeenCalled();
  });

  describe('export report', () => {
    it('get Report Rejected', () => {
      component.getReportRejected();
      expect(mockLinksService.getReportRejected).toHaveBeenCalled();
    });
  });

  describe('openCommission', () => {
    it('open', () => {
      component.openCommission(getCommissionsSearch.objectResponse.commissions[0]);
      expect(component.currentCommission).toBe(11955);
    });

    it('openConfirm', () => {
      component.openConfirm('rejected-commission');
      expect(component.typeConfirm).toBe('rejected-commission');
    });

    it('updateCommission', () => {
      component.updateCommission();
      expect(mockLinksService.updateCommission).toHaveBeenCalled();
    });

    it('deleteCommission', () => {
      component.deleteCommission();
      expect(mockLinksService.deleteCommission).toHaveBeenCalled();
    });
  });

  describe('pagination', () => {
    it('next', () => {
      component.pagination({ pageIndex: 0, pageSize: 20, length: 5 });
      expect(component.pageIndex).toBe(0);
    });
  });
});
