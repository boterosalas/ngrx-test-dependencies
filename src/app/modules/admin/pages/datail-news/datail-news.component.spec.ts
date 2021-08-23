/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { DatailNewsComponent } from './datail-news.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDatepickerModule, MatDialog, MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxPaginationModule } from 'ngx-pagination';
import { AnonymousModule } from 'src/app/modules/anonymous/anonymous.module';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { JwtModule } from '@auth0/angular-jwt';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

describe('DatailNewsComponent', () => {
  let component: DatailNewsComponent;
  let fixture: ComponentFixture<DatailNewsComponent>;
  const mockDialog = jasmine.createSpyObj('MatDialog', ['open', 'closeAll', 'afterAllClosed']);
  const mockUserService = jasmine.createSpyObj('UserService', ['getNoveltyById', 'setStatus', 'saveNewNovelty', 'getNewNovelties']);

  const respDatos = {
    consecutive: '000001',
    name: 'Santiago Teran',
    cellphone: '3224981267',
    idclicker: 'santer457',
    identification: '12121212',
    email: 'hamil@unicauca.edu.co',
    urlImage: '',
    id: '1',
    statusnovelty: 'Pendiente',
    datenovelty: '2020-02-04',
    businessdescription: 'Haceb',
    date: '2021-02-25',
    documenturl: 'http/archivo.jpg',
    code: '12223444',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  };

  const listNotes = [
    {
      type: 1,
      state: 'Solucionado',
      text: 'nota de novedad',
      adminName: 'Eisner Puerta Carrillo',
      date: '2021-08-13T01:47:29.277Z',
    },
    {
      type: 0,
      state: 'Solucionado',
      text: 'Cambio de estado',
      adminName: 'Eisner Puerta Carrillo',
      date: '2021-08-13T01:47:42.827Z',
    },
    {
      type: 0,
      state: 'Solucionado',
      text: 'Respuesta de la solución',
      adminName: 'Eisner Puerta Carrillo',
      date: '2021-08-13T01:49:41.380Z',
    },
    {
      type: 0,
      state: 'En revisión',
      text: '',
      adminName: 'Yeferson ',
      date: '2021-08-18T16:38:27.130Z',
    },
  ];

  const dataResp = {
    state: 'Success',
  };

  const data = {
    element: {
      id: 1,
      documenturl: 'http/archivo.jpg',
      statusnovelty: 'Pendiente',
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatailNewsComponent],
      imports: [
        TranslateModule.forRoot(),
        AnonymousModule,
        AppMaterialModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        SharedModule,
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
        { provide: MatDialog, useValue: mockDialog },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compileComponents();
    mockUserService.getNoveltyById.and.returnValue(of(respDatos));
    mockUserService.setStatus.and.returnValue(of(dataResp));
    mockUserService.getNewNovelties.and.returnValue(of(listNotes));
    mockUserService.saveNewNovelty.and.returnValue(of(dataResp));

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatailNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.getNoveltyById('1');
    expect(mockUserService.getNoveltyById).toHaveBeenCalled();
  });

  it('save changes', () => {
    component.currentNovelty = respDatos;
    component.initForm();
    component.saveChanges();
    expect(mockUserService.setStatus).toHaveBeenCalled();
    component.onChangeSelected('Pendiente');
  });

  it('image not data', () => {
    component.currentNovelty = respDatos;
    component.image = '';
    component.viewerImage();
    expect(mockDialog.open).toBeTruthy();
  });

  it('get notes', () => {
    component.listNovelties = listNotes;  
    component.currentNovelty = respDatos;
    component.getNovelties();
    expect(mockUserService.getNewNovelties).toHaveBeenCalled();
    expect(component.listNovelties.length).toBeGreaterThan(1);
  });

  it('save new novelty', () => {
    component.currentNovelty = respDatos;
    component.updateNovelty({
      idnovelty: respDatos.id,
      description: 'nota de prueba',
      statusnovelty: respDatos.statusnovelty,
      typenewnovelty: false,
    });
    expect(mockUserService.setStatus).toHaveBeenCalled();
  });
});
