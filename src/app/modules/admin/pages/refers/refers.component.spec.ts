import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

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

  const mockLinksService = jasmine.createSpyObj("LinksService", ["getReportReferral", "getAmount", "saveAmountCommission", "saveAmountReferred", "getReportReferral"]);

  const report = {
    state: "Success",
    userMessage: "se ha enviado un correo",
    objectResponse: []
  };

  const reportError = {
    state: "Error",
    userMessage: "No se ha enviado un correo",
    objectResponse: []
  };

  const saveCommision = {
    state: "Success",
    userMessage: "se ha guardado",
    objectResponse: []
  };

  const saveCommisionError = {
    state: "Error",
    userMessage: "Ha ocurrido un error",
    objectResponse: []
  };

  let amount = {
    amountsCommission: 10000,
    amountsReferred: 500000
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefersComponent ],
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
              return localStorage.getItem("ACCESS_TOKEN");
            },
            throwNoTokenError: true,
            whitelistedDomains: [],
            blacklistedRoutes: []
          }
        })],
        providers: [
          { provide: LinksService, useValue: mockLinksService },
          { provide: LOCALE_CONFIG, useValue: config },
          {
            provide: LocaleService,
            useClass: LocaleService,
            deps: [LOCALE_CONFIG]
          }
        ],
        schemas: [
          NO_ERRORS_SCHEMA
        ]
    })
    .compileComponents();
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
    component.saveCommission();
    expect(mockLinksService.saveAmountCommission).toHaveBeenCalled();
  });
  
  it('save refered', () => {
    mockLinksService.saveAmountReferred.and.returnValue(of(saveCommision));
    component.saveRefered();
    expect(mockLinksService.saveAmountReferred).toHaveBeenCalled();
  });
  
  it('save comission Error', () => {
    mockLinksService.saveAmountCommission.and.returnValue(of(saveCommisionError));
    component.saveCommission();
    expect(mockLinksService.saveAmountCommission).toHaveBeenCalled();
  });
  
  it('save refered Error', () => {
    mockLinksService.saveAmountReferred.and.returnValue(of(saveCommisionError));
    component.saveRefered();
    expect(mockLinksService.saveAmountReferred).toHaveBeenCalled();
  });
  

  it("export Report", () => {
    mockLinksService.getReportReferral.and.returnValue(of(report));
    component.dateRange = {
      email: "david@test.com",
      start: "Sat 20Dec 2007 202019 2000:00:00 20GMT-0500",
      end: "Sat 20Dec 2007 202019 2000:00:00 20GMT-0500"
    };
    component.dateForm.controls.dateRange.setValue({startDate: null});
    const nativeElement = fixture.nativeElement;
    const input = nativeElement.querySelector("#date");
    input.dispatchEvent(new Event("click"));
    const nativeElementDate = fixture.nativeElement;
    const dateStart = nativeElementDate.querySelector(".today");
    dateStart.dispatchEvent(new Event("click"));
    const nativeElementbtn = fixture.nativeElement;
    const btn = nativeElementbtn.querySelector(".btn");
    btn.dispatchEvent(new Event("click"));
    fixture.detectChanges();
    component.exportRefers();
    expect(mockLinksService.getReportReferral).toHaveBeenCalled();
  });

  it("export Report Error", () => {
    mockLinksService.getReportReferral.and.returnValue(of(reportError));
    component.dateRange = {
      email: "david@test.com",
      start: "Sat 20Dec 2007 202019 2000:00:00 20GMT-0500",
      end: "Sat 20Dec 2007 202019 2000:00:00 20GMT-0500"
    };
    // component.dateForm.controls.dateRange.setValue({startDate: null});
    const nativeElement = fixture.nativeElement;
    const input = nativeElement.querySelector("#date");
    input.dispatchEvent(new Event("click"));
    const nativeElementDate = fixture.nativeElement;
    const dateStart = nativeElementDate.querySelector(".today");
    dateStart.dispatchEvent(new Event("click"));
    const nativeElementbtn = fixture.nativeElement;
    const btn = nativeElementbtn.querySelector(".btn");
    btn.dispatchEvent(new Event("click"));
    fixture.detectChanges();
    component.exportRefers();
    expect(mockLinksService.getReportReferral).toHaveBeenCalled();
  });

});
