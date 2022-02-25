/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { DatailNewsComponent } from './datail-news.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { ContentService } from 'src/app/services/content.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('DatailNewsComponent', () => {
  let component: DatailNewsComponent;
  let fixture: ComponentFixture<DatailNewsComponent>;
  const mockDialog = jasmine.createSpyObj('MatDialog', ['open', 'closeAll', 'afterAllClosed']);
  const mockUserService = jasmine.createSpyObj('UserService', [
    'getNoveltyById',
    'setStatus',
    'saveNewNovelty',
    'getNewNovelties',
    'getNoveltiesById',
    'saveBusinessNovelty'
  ]);
  const mockContentService = jasmine.createSpyObj('ContentService', ['getAllBusiness']);
  const mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open', 'closeAll', 'afterAllClosed']);

  let mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  const respDatos = {
    consecutive: '000001',
    name: 'Santiago Teran',
    cellphone: '3224981267',
    idclicker: 'santer457',
    identification: '12121212',
    email: 'hamil@unicauca.edu.co',
    urlImage: 'http/archivo.jpg',
    id: '1',
    statusnovelty: 'Pendiente',
    datenovelty: '2020-02-04',
    businessdescription: 'Haceb',
    date: '2021-02-25',
    documenturl: 'http/archivo.jpg',
    code: '12223444',
    objectResponse: {
      random: 'asd'
    },
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  };

  const respDatosError = { state: 'error' };

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

  const moreNovelites = [
    {
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
    },
    {
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
    },
    {
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
  const businesses = [
    {
      id: 69,
      code: "negocio69",
      image: null,
      imageurl: "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/20220218113151.svg",
      infoaditional: "Hasta 2%",
      description: "Mis aliados",
      orderby: 0,
      active: true,
      placeholder: "cedula",
      urlquerystring: "{0}utm_source=clickam&utm_medium=referral&utm_campaign={1}",
      excelcommission: false,
      vtexcommission: false,
      tabtablecommission: "aliados",
      icondashboard: "20220218113151.svg",
      icondashboardimage: null,
      iconstory: "20220218113151.svg",
      iconstoryimage: null,
      about: null,
      urlproducts: null,
      hasproduct: false,
      tips: [],
      terms: [],
      categories: [
        {
          id: 80,
          idbusiness: 0,
          idcategory: 2
        }
      ],
      arraycategories: null
    }
  ]
  const event = {
    value: {
      id: 3
    },
    target: {
      file: {
        lastModified: 1645645709697,
        name: "prob-prob4_3.pdf",
        size: 211120,
        type: "application/pdf",
        webkitRelativePath: "",
      }
    }
  }
  beforeEach(waitForAsync(() => {
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
        RouterTestingModule,
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
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: UserService, useValue: mockUserService },
        { provide: MatSnackBar, useValue: mockSnackBar },
      ],
    }).compileComponents();
    mockUserService.getNoveltyById.and.returnValue(of(respDatos));
    mockUserService.setStatus.and.returnValue(of(dataResp));
    mockUserService.getNewNovelties.and.returnValue(of(listNotes));
    mockUserService.saveNewNovelty.and.returnValue(of(dataResp));
    mockUserService.getNoveltiesById.and.returnValue(of(moreNovelites));
    mockUserService.saveBusinessNovelty.and.returnValue(of(dataResp));
    mockContentService.getAllBusiness.and.returnValue(of(businesses));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatailNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.getNoveltyById('1', '0');
    expect(mockUserService.getNoveltyById).toHaveBeenCalled();
    component.currentNovelty = respDatos;
    expect(component.currentNovelty).toEqual(respDatos);
    expect(component.$subcriptionNovelty).toBeTruthy();
    expect(component.$subcriptionParams).toBeTruthy();
    expect(component.$subscriptionGetMoreNovelties).toBeTruthy();
    expect(component.$subscriptionGetNovelties).toBeTruthy();
    expect(component.$subscriptionSaveNote).toBeTruthy();
    expect(component.businesses$).toBeTruthy();
    component.findBusinessInSelect(businesses)
    component.initForm();
    expect(component.dateForm).toBeTruthy();
  });

  it('steps current state "En gestión"', () => {
    component.changeSelecteds('En gestión');
    expect(component.selecteds[0].state).toEqual(2);
    expect(component.selecteds[1].state).toEqual(2);
    expect(component.selecteds[2].state).toEqual(1);
    expect(component.selecteds[3].state).toEqual(0);
    expect(component.selecteds[4].state).toEqual(0);
  });

  it('steps current state "Pendiente"', () => {
    component.changeSelecteds('Pendiente');
    expect(component.selecteds[0].state).toEqual(1);
    expect(component.selecteds[1].state).toEqual(0);
    expect(component.selecteds[2].state).toEqual(0);
    expect(component.selecteds[3].state).toEqual(0);
    expect(component.selecteds[4].state).toEqual(0);
  });

  it('steps current state "Solucionado"', () => {
    component.changeSelecteds('Solucionado');
    expect(component.selecteds[0].state).toEqual(2);
    expect(component.selecteds[1].state).toEqual(2);
    expect(component.selecteds[2].state).toEqual(2);
    expect(component.selecteds[3].state).toEqual(2);
    expect(component.selecteds[4].state).toEqual(2);
  });

  it('steps current state "Pendiente de documentación"', () => {
    component.changeSelecteds('Pendiente de documentación');
    expect(component.selecteds[0].state).toEqual(2);
    expect(component.selecteds[1].state).toEqual(1);
    expect(component.selecteds[2].state).toEqual(0);
    expect(component.selecteds[3].state).toEqual(0);
    expect(component.selecteds[4].state).toEqual(0);
  });

  it('steps current state "Solución parcial"', () => {
    component.changeSelecteds('Solución parcial');
    expect(component.selecteds[0].state).toEqual(2);
    expect(component.selecteds[1].state).toEqual(2);
    expect(component.selecteds[2].state).toEqual(2);
    expect(component.selecteds[3].state).toEqual(1);
    expect(component.selecteds[4].state).toEqual(0);
  });

  it('save changes', () => {
    component.currentNovelty = respDatos;
    component.initForm();
    component.saveChanges();
    expect(mockUserService.setStatus).toHaveBeenCalled();
    expect(mockSnackBar.open).toHaveBeenCalled();
    expect(component.active).toBeTruthy();
    component.onChangeSelected('Pendiente');
  });

  it('image not data', () => {
    component.currentNovelty = respDatos;
    component.image = '';
    component.viewerImage();
    expect(mockDialog.open).toBeTruthy();
  });

  it('dialog view comment', () => {
    component.currentNovelty = respDatos;
    component.viewComment();
    expect(mockDialog.open).toBeTruthy();
  });

  it('get notes', () => {
    component.listNovelties = listNotes;
    component.currentNovelty = respDatos;
    component.getNovelties();
    expect(mockUserService.getNewNovelties).toHaveBeenCalled();
    expect(component.listNovelties.length).toBeGreaterThan(1);
  });

  it('get all novelties by user', () => {
    component.listMoreNovelties = listNotes;
    component.currentNovelty = respDatos;
    component.getMoreNovelties(component.currentNovelty.id);
    expect(mockUserService.getNewNovelties).toHaveBeenCalled();
    expect(component.listMoreNovelties.length).toBeGreaterThan(1);
  });

  it('open pdf', () => {
    component.currentNovelty = respDatos;
    component.openPDForFile();
  });

  it('save new novelty', () => {
    component.currentNovelty = respDatos;
    component.listNovelties = listNotes;
    component.updateNovelty({
      idnovelty: respDatos.id,
      description: 'nota de prueba',
      statusnovelty: respDatos.statusnovelty,
      typenewnovelty: false,
    });
    expect(mockUserService.setStatus).toHaveBeenCalled();
  });
  it('saves business', () => {
    component.id = '1';
    component.saveBusiness(event);
    expect(mockUserService.saveBusinessNovelty).toHaveBeenCalled();
  });
  it('saves the file', () => {
    component.id = '1';
    const mockFile = new File([''], 'name.pdf', { type: 'application/pdf' });
    const mockEvt = { target: { files: [mockFile] } };
    component.onFileChange(mockEvt);
  });

  describe('Errors', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(DatailNewsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      mockUserService.getNoveltyById.and.returnValue(of(respDatosError));
      mockUserService.setStatus.and.returnValue(of(respDatosError));
    });
    it('get novelty error', () => {
      expect(component).toBeTruthy();
      component.getNoveltyById(null, null);
      expect(mockUserService.getNoveltyById).toHaveBeenCalled();
    });

    it('save new novelty error', () => {
      component.currentNovelty = respDatos;
      component.listNovelties = listNotes;
      component.updateNovelty({
        idnovelty: respDatos.id,
        description: 'nota de prueba',
        statusnovelty: respDatos.statusnovelty,
        typenewnovelty: false,
      });
      expect(mockUserService.setStatus).toHaveBeenCalled();
    });

    it('save new changes error', () => {
      component.currentNovelty = respDatos;
      component.initForm();
      expect(component.dateForm).toBeTruthy();
      component.saveChanges();
      expect(mockUserService.setStatus).toHaveBeenCalled();
    });
  });
});
