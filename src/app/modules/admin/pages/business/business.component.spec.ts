import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessComponent } from './business.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { ContentService } from 'src/app/services/content.service';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AdminModule } from '../../admin.module';

describe('BusinessComponent', () => {
  let component: BusinessComponent;
  let fixture: ComponentFixture<BusinessComponent>;

  const mockContentService = jasmine.createSpyObj('ContentService', ['businessExcel', 'saveActiveBusiness', 'getAllBusiness', 'importSellerFile']);

  const allBusiness = [
    {
      id: 1,
      code: 'exito',
      imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-exito.svg',
      infoaditional: 'Hasta 9.6% de ganancia',
      description: 'Almacenes Éxito',
      orderby: 1,
      active: false,
    },
    {
      id: 14,
      code: 'movil-exito',
      imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-movil-exito.svg',
      infoaditional: 'Ahora 10% de comisión',
      description: 'Móvil Éxito',
      orderby: 5,
      active: true,
    },
    {
      id: 3,
      code: 'seguros',
      imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-seguros.svg',
      infoaditional: 'Hasta $32.000 de ganancia',
      description: 'Seguros Éxito',
      orderby: 3,
      active: true,
    },
    {
      id: 4,
      code: 'viajes',
      imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-viajes.svg',
      infoaditional: 'Hasta $40.000 de ganancia',
      description: 'Viajes Éxito',
      orderby: 4,
      active: true,
    },
    {
      id: 5,
      code: 'wesura',
      imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-wesura.svg',
      infoaditional: 'Hasta 12.000 de ganancia',
      description: 'Wesura',
      orderby: 6,
      active: true,
    },
  ];

  const saveActive = {
    state: 'Success',
    userMessage: 'se ha activado el negocio',
    objectResponse: [],
  };

  const errorFile = {
    state: 'Error',
    userMessage: 'Formato no permitido',
    objectResponse: null
  };

  const successFile = {
    state: 'Success',
    userMessage: null,
    objectResponse: [
      10003,
    ]
  };

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        AdminModule,
        TranslateModule.forRoot(),
        AppMaterialModule,
        HttpClientTestingModule,
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
      providers: [{ provide: ContentService, useValue: mockContentService }],
    }).compileComponents();
    mockContentService.getAllBusiness.and.returnValue(of(allBusiness));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(mockContentService.getAllBusiness).toHaveBeenCalled();
  });

  it('activate business', () => {
    mockContentService.saveActiveBusiness.and.returnValue(of(saveActive));
    const data = {
      idbusiness: 1,
      value: true,
    };
    component.activateBusiness(data);
    expect(mockContentService.saveActiveBusiness).toHaveBeenCalled();
  });

  it('export bussiness Success', () => {
    const data = {
      state: 'Success',
      userMessage: 'Al terminar de procesar el archivo se enviará un correo',
    };
    mockContentService.businessExcel.and.returnValue(of(data));
    component.exportBusiness();
    expect(mockContentService.businessExcel).toHaveBeenCalled();
  });

  it('export bussiness error', () => {
    const data = { state: 'Error', userMessage: 'Ha ocurrido un error' };
    mockContentService.businessExcel.and.returnValue(of(data));
    component.exportBusiness();
    expect(mockContentService.businessExcel).toHaveBeenCalled();
  });

  it('on file change', () => {
    mockContentService.importSellerFile.and.returnValue(of(successFile));
    const mockFile = new File([''], 'name.xlsx', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };
    component.onFileChange(mockEvt);
    expect(component.onFileChange).not.toBeNull();
  });

  it('on file change error', () => {
    mockContentService.importSellerFile.and.returnValue(of(errorFile));
    const mockFile = new File([''], 'name.jpg', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };
    component.onFileChange(mockEvt);
    expect(component.onFileChange).not.toBeNull();
  });

});
