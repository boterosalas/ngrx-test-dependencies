import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentLibraryComponent } from './content-library.component';

import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxDaterangepickerMd, LocaleService, LOCALE_CONFIG } from 'ngx-daterangepicker-material';
import { MatDatepickerModule, MatDialog, MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnonymousModule } from 'src/app/modules/anonymous/anonymous.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import Swal from 'sweetalert2';
import { ContentService } from 'src/app/services/content.service';
import { of } from 'rxjs';
describe('ContentLibraryComponent', () => {
  let component: ContentLibraryComponent;
  let fixture: ComponentFixture<ContentLibraryComponent>;
  const mockDialog = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);
  const mockContentService = jasmine.createSpyObj('ContentService', ['getVideosImage', 'setContentImgVi', 'deleteContent']);
  const audit = {
    state: 'success',
    userMessage: 'se ha enviado un correo',
    objectResponse: [{}],
  };
  beforeEach(async(() => {
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
            whitelistedDomains: [],
            blacklistedRoutes: [],
          },
        }),
      ],

      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: ContentService, useValue: mockContentService },
      ],
    }).compileComponents();
    mockContentService.getVideosImage.and.returnValue(of(audit));
    mockContentService.setContentImgVi.and.returnValue(of(audit));
    //deleteContent
    mockContentService.deleteContent.and.returnValue(of(audit));
  }));

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
    component.onFileChangeFilesCont(mockEvt, 'ced');
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
