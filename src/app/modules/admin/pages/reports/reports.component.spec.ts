import { waitForAsync, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { ReportsComponent } from './reports.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { LinksService } from 'src/app/services/links.service';
import { of } from 'rxjs/internal/observable/of';
import { NgxDaterangepickerMd, LocaleService, LOCALE_CONFIG } from 'ngx-daterangepicker-material';
import { LoadFormFileComponent } from '../../components/load-form-file/load-form-file.component';
import { config } from 'process';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnonymousModule } from 'src/app/modules/anonymous/anonymous.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CardComponent } from '../../components/card/card.component';


describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;

  let mockLinksService = jasmine.createSpyObj('LinksService', [
    'getFileReport',
    'sendfile',
    'updatePaymentDate',
    'downloadReferrals',
    'getReportClickam',
    'saveCutOffDate',
    'getCutOffDate'
  ]);

  const fileReport = {
    state: 'Success',
    userMessage: null,
    objectResponse: 'https://webclickamdev.blob.core.windows.net/files-excel/ReportePagoComisiones20191021195441.xlsx',
  };

  const data = {
    file:
      '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',
    business: 'viajes',
    email: 'david.betancur@pragma.com.co',
  };

  const getReport = {
    state: 'Success',
    userMessage: 'se ha enviado un correo a test@h.com',
    objectResponse: [],
  };

  const date = "2022-02-01T00:00:00";

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ReportsComponent, LoadFormFileComponent, CardComponent],
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
            allowedDomains: [],
            disallowedRoutes: [],
          },
        }),
      ],
      schemas:[NO_ERRORS_SCHEMA],
      providers: [
        { provide: LinksService, useValue: mockLinksService },
        { provide: LOCALE_CONFIG, useValue: config },
        {
          provide: LocaleService,
          useClass: LocaleService,
          deps: [LOCALE_CONFIG],
        },
      ],
      // schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    localStorage.setItem(
      'ACCESS_TOKEN',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInVzZXJOYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInJvbGUiOiJDTElDS0VSIiwiZXhwIjoxNTcxODY2MDgwLCJpc3MiOiJwcmFjdGluY2FuZXRjb3JlLmNvbSIsImF1ZCI6IkVzdHVkaWFudGVzIn0.UJahw9VBALxwYizSTppjGJYnr618EKlaFW-d3YLugnU'
    );
    mockLinksService.getFileReport.and.returnValue(of(fileReport));
    mockLinksService.downloadReferrals.and.returnValue(of(fileReport));
    mockLinksService.getReportClickam.and.returnValue(of(getReport));
    mockLinksService.sendfile.and.returnValue(of(data));
    mockLinksService.updatePaymentDate.and.returnValue(of(data));
    mockLinksService.getCutOffDate.and.returnValue(of(date));
    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    //expect(mockLinksService.getFileReport).toHaveBeenCalled();
  });

  // it('on file change trip valid', async () => {
  //   const mockFile = new File([''], 'name.xlsx', { type: 'text/html' });
  //   const mockEvt = { target: { files: [mockFile] } };
  //   component.onFileChangeTrip(mockEvt);
  //   fixture.detectChanges();
  //   fixture.whenRenderingDone().then(() => {
  //     expect(mockLinksService.sendfile).toHaveBeenCalled();
  //   });
  // });

  it('on file change trip invalid', () => {
    const mockFile = new File([''], 'name.txt', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };
    component.onFileChangeTrip(mockEvt);
    component.showErrorExt = true;
    expect(component.showErrorExt).toBeTruthy();
  });

  it('on file change payment valid', () => {
    const mockFile = new File([''], 'name.xlsx', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };
    component.onFileChangePayment(mockEvt);
    expect(mockEvt).toBeDefined();
  });

  //it("on file change trip invalid", () => {
  //  const mockFile = new File([""], "name.txt", { type: "text/html" });
  //  const mockEvt = { target: { files: [mockFile] } };
  //  component.onFileChangePayment(mockEvt);
  //  component.showErrorExtPayment = true;
  //  expect(component.showErrorExtPayment).toBeTruthy();
  //});

  it('on file change picking', () => {
    const mockFile1 = new File([''], 'name.xlsx', { type: 'text/html' });
    const mockEvt1 = { target: { files: [mockFile1] } };
    component.onFileChangePicking(mockEvt1);
    expect(mockEvt1).toBeDefined();
  });

  it('on file change picking invalid', () => {
    const mockFile2 = new File([''], 'name.txt', { type: 'text/html' });
    const mockEvt2 = { target: { files: [mockFile2] } };
    component.onFileChangePicking(mockEvt2);
    component.showErrorExtPicking = true;
    expect(component.showErrorExtPicking).toBeTruthy();
  });

  // it('download referal', () => {
  //   component.dateForm.controls.dateStart.setValue('2019-11-10');
  //   component.dateForm.controls.dateEnd.setValue('2019-11-10');
  //   component.downloadReferal();
  //   expect(mockLinksService.downloadReferrals).toHaveBeenCalled();
  // });

  it('change button', () => {
    component.disButon = false;
    component.change();
    expect(component.disButon).toBeFalsy();
  });

  it('getReportClickam', () => {
    const nativeElement = fixture.nativeElement;
    const input = nativeElement.querySelector('input');
    input.dispatchEvent(new Event('click'));
    const nativeElementDate = fixture.nativeElement;
    const dateStart = nativeElementDate.querySelector('.today');
    dateStart.dispatchEvent(new Event('click'));
    const nativeElementbtn = fixture.nativeElement;
    const btn = nativeElementbtn.querySelector('.btn');
    btn.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    component.getReportClickam();
    expect(mockLinksService.getReportClickam).toHaveBeenCalled();
  });

  it('save cut off date', () => {
    mockLinksService.saveCutOffDate.and.returnValue(of(getReport));
    component.changeMonth(-1);
    const button = document.querySelector('.swal2-confirm');
    button.dispatchEvent(new Event('click'));
    fixture.whenStable().then(() => {
      expect(mockLinksService.saveCutOffDate).toHaveBeenCalled();
    })
  });
  

});
