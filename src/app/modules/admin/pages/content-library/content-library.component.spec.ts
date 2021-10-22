import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentLibraryComponent } from './content-library.component';

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
import Swal from 'sweetalert2';
import { ContentService } from 'src/app/services/content.service';
import { of } from 'rxjs';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';

describe('ContentLibraryComponent', () => {
  let component: ContentLibraryComponent;
  let fixture: ComponentFixture<ContentLibraryComponent>;
  const mockDialog = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);
  const mockContentService = jasmine.createSpyObj('ContentService', ['getVideosImage', 'getBusiness', 'setContentImgVi', 'deleteContent']);
  const audit = {
    state: 'success',
    userMessage: 'se ha enviado un correo',
    objectResponse: [{}],
  };

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

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ContentLibraryComponent],
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

        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: MatDialog, useValue: mockDialog },
          { provide: ContentService, useValue: mockContentService },
        ],
      }).compileComponents();
      mockContentService.getBusiness.and.returnValue(of(allBusiness));
      mockContentService.getVideosImage.and.returnValue(of(audit));
      mockContentService.setContentImgVi.and.returnValue(of(audit));
      //deleteContent
      mockContentService.deleteContent.and.returnValue(of(audit));
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.deleteEvery();

    component.viewerPhoto('url');
    expect(mockDialog.open).toHaveBeenCalled();
    component.viewerVideo('url');
    expect(mockDialog.open).toHaveBeenCalled();
    spyOn(Swal, 'fire').and.returnValue(
      Promise.resolve<any>({
        text: 'Extensión erronea',
        type: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonClass: 'accept-activation-alert-error',
      })
    );
    component.getExtension('archivo.jpg', 20000);
    expect(component.validFormat).toBeTruthy();
    component.getExtension('archivo.xls', 20000);
    expect(component.validFormat).toBeFalsy();
    component.getExtension('archivo.jpg', 20000000);
    expect(component.validFormat).toBeFalsy();
    component.getExtension('archivo.mp4', 80000000);
    expect(component.validFormat).toBeFalsy();
    component.id = '1';
    component.nameFileCont = 'archivo.jpg';
    component.fileCont = 'base64';
    component.saveFormat();
    component.dataReal = [{ dataR: true }, { dataR: false }];
    component.dataRealVideo = [{ dataR: true }, { dataR: false }];
    component.loadDelete();
    expect(component.active).toBeTruthy;
  });

  it('new file', () => {
    const mockFile = new File([''], 'name.jpg', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };
    component.onFileChangeFilesCont(mockEvt);
    expect(mockEvt).toBeDefined();
    component.dataReal = [
      { id: 1, dataR: true },
      { id: 2, dataR: false },
    ];
    component.dataRealVideo = [
      { id: 1, dataR: true },
      { id: 2, dataR: false },
    ];
    component.selectAll();
    component.selectAllVideosImg = 'Deseleccionar todo';
    component.dataReal = [
      { id: 1, dataR: true },
      { id: 2, dataR: false },
    ];
    component.dataRealVideo = [
      { id: 1, dataR: true },
      { id: 2, dataR: false },
    ];
    component.selectAll();

    expect(component.active).toBeFalsy();

    component.cancelDelete();
    expect(mockDialog.closeAll).toHaveBeenCalled();
    component.dataReal = [
      { id: 1, dataR: true },
      { id: 2, dataR: false },
    ];
    component.dataRealVideo = [
      { id: 1, dataR: true },
      { id: 2, dataR: false },
    ];
    component.deleteVideos();
    expect(mockContentService.deleteContent).toHaveBeenCalled();
  });
});
