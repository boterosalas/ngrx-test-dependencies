import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsAdminComponent } from './news-admin.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxDaterangepickerMd, LocaleService, LOCALE_CONFIG } from 'ngx-daterangepicker-material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnonymousModule } from 'src/app/modules/anonymous/anonymous.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { config } from 'process';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';
import { LinksService } from 'src/app/services/links.service';
import { of } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
moment.locale('es');

describe('NewsAdminComponent', () => {
  let component: NewsAdminComponent;
  let fixture: ComponentFixture<NewsAdminComponent>;
  const mockDialog = jasmine.createSpyObj('MatDialog', ['open', 'closeAll', 'afterAllClosed']);
  const mockUserService = jasmine.createSpyObj('UserService', ['getExportNewsExcel', 'getAllNews']);
  const mockLinksService = jasmine.createSpyObj('LinksService', ['getkpiNovelties']);
  const getUserExcel = {
    state: 'Success',
    userMessage: 'se ha enviado un correo a test@h.com',
    objectResponse: [],
  };
  const getkpiNovelties = {
    state: 'Success',
    userMessage: null,
    objectResponse: {
      effectiveness: 0.13,
      id: 0,
      totalinprogress: 4,
      totalnovelties: 56,
      totalpending: 45,
      totalsolved: 7,
      totalusers: 4,
    },
  };
  const repsDatos = {
    total: 70,
    novelties: [
      {
        consecutive: '000001',
        name: 'Santiago Teran',
        cellphone: '3224981267',
        idclicker: 'santer457',
        identification: '12121212',
        email: 'hamil@unicauca.edu.co',
        urlImage: '',
        statusnovelty: 'Pendiente',
        datenovelty: '2020-02-04',
        businessdescription: 'Haceb',
        date: '2021-02-25',
        code: '12223444',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      {
        consecutive: '000002',
        name: 'Santiago Teran',
        identification: '12121212',
        idclicker: 'santer457',
        cellphone: '3224981267',
        date: '2021-02-25',
        email: 'hamil@unicauca.edu.co',
        statusnovelty: 'Revision',
        urlImage: 'https://d500.epimg.net/cincodias/imagenes/2018/11/13/lifestyle/1542113135_776401_1542116070_noticia_normal.jpg',
        datenovelty: '2020-02-04',
        businessdescription: 'Haceb',
        code: '12223444',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      {
        consecutive: '000003',
        name: 'Santiago Teran',
        date: '2021-02-25',
        cellphone: '3224981267',
        idclicker: 'santer457',
        identification: '12121212',
        email: 'hamil@unicauca.edu.co',
        statusnovelty: 'Revision',
        urlImage: 'https://d500.epimg.net/cincodias/imagenes/2018/11/13/lifestyle/1542113135_776401_1542116070_noticia_normal.jpg',
        datenovelty: '2020-02-04',
        businessdescription: 'Haceb',
        code: '12223444',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      {
        consecutive: '000004',
        name: 'Santiago Teran',
        cellphone: '3224981267',
        date: '2021-02-25',
        idclicker: 'santer457',
        identification: '12121212',
        urlImage: 'https://d500.epimg.net/cincodias/imagenes/2018/11/13/lifestyle/1542113135_776401_1542116070_noticia_normal.jpg',
        email: 'hamil@unicauca.edu.co',
        statusnovelty: 'Solucionado',
        businessdescription: 'Haceb',
        datenovelty: '2020-02-04',
        code: '12223444',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
    ],
  };
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NewsAdminComponent],
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
        NgxPaginationModule,
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
      ],
    }).compileComponents();
    mockDialog.afterAllClosed.and.returnValue(of(getUserExcel));
  }));

  beforeEach(() => {
    mockUserService.getAllNews.and.returnValue(of(repsDatos));
    mockUserService.getExportNewsExcel.and.returnValue(of(getUserExcel));
    mockLinksService.getkpiNovelties.and.returnValue(of(getkpiNovelties));
    fixture = TestBed.createComponent(NewsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    let start = moment();
    let end = moment('12-01-2020');
    // component.dateForm.controls.dateRange.setValue({ startDate: start, endDate: end });
    expect(mockLinksService.getkpiNovelties).toHaveBeenCalled();
    component.getKPI();
    component.getReportExcel();
    expect(mockUserService.getExportNewsExcel).toHaveBeenCalled();
    component.pagination({
      previousPageIndex: 1,
      pageIndex: 0,
      pageSize: 20,
      length: 5,
    });
    expect(mockUserService.getAllNews).toHaveBeenCalled();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
