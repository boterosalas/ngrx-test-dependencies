import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionsComponent } from './commissions.component';
import { TranslateModule } from "@ngx-translate/core";
import { AppMaterialModule } from "src/app/modules/shared/app-material/app-material.module";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { JwtModule } from "@auth0/angular-jwt";
import { NgxDaterangepickerMd, LocaleService, LOCALE_CONFIG } from 'ngx-daterangepicker-material';
import { MatDatepickerModule, MatDialog, MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnonymousModule } from 'src/app/modules/anonymous/anonymous.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { config } from 'process';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';
import { LinksService } from 'src/app/services/links.service';
import { of } from 'rxjs';
moment.locale('es');
describe('CommissionsComponent', () => {
  let component: CommissionsComponent;
  let fixture: ComponentFixture<CommissionsComponent>;
  const mockDialog = jasmine.createSpyObj("MatDialog", ["open", "closeAll", "afterAllClosed"]);
  const mockUserService = jasmine.createSpyObj("UserService", [
    "getExportNewsExcel", "getAllNews"
  ]);
  const mockLinksService = jasmine.createSpyObj("LinksService", [
    "updateStatusCommissionFile"
  ]);
  const updateStatusCommissionFile = {
    state: "Success",
    userMessage: 'se ha enviado un correo a test@h.com',
    objectResponse: [
    ]
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
              return localStorage.getItem("ACCESS_TOKEN");
            },
            throwNoTokenError: true,
            whitelistedDomains: [],
            blacklistedRoutes: []
          }
        })
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [
        { provide: LOCALE_CONFIG, useValue: config },
        {
          provide: LocaleService,
          useClass: LocaleService,
          deps: [LOCALE_CONFIG]
        },
        { provide: MatDialog, useValue: mockDialog },
        { provide: UserService, useValue: mockUserService },
        { provide: LinksService, useValue: mockLinksService },
      ]
    })
      .compileComponents();
    mockDialog.afterAllClosed.and.returnValue(of(updateStatusCommissionFile));
  }));

  beforeEach(() => {
    //mockUserService.getAllNews.and.returnValue(of(repsDatos))
    //mockUserService.getExportNewsExcel.and.returnValue(of(updateStatusCommissionFile))
    mockLinksService.updateStatusCommissionFile.and.returnValue(of(updateStatusCommissionFile))
    fixture = TestBed.createComponent(CommissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    // let start = moment();
    // let end = moment("12-01-2020");
    // component.dateForm.controls.dateRange.setValue({ startDate: start, endDate: end });
    const mockFile = new File([""], "name.xlsx", { type: "text/html" });
    const mockEvt = { target: { files: [mockFile] } };
    component.handleFileInput(mockEvt, "rejected")
    expect(mockLinksService.updateStatusCommissionFile).toHaveBeenCalled();
    // component.getKPI();
    // component.getReportExcel();
    //expect(mockUserService.getExportNewsExcel).toHaveBeenCalled();
    //component.pagination({ previousPageIndex: 1, pageIndex: 0, pageSize: 20, length: 5 });
    //expect(mockUserService.getAllNews).toHaveBeenCalled();
  });

});
