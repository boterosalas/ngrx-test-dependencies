import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryComponent } from './library.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ShareModule } from 'ngx-sharebuttons';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';

describe('LibraryComponent', () => {
  let component: LibraryComponent;
  let fixture: ComponentFixture<LibraryComponent>;
  const mockDialog = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);
  const mockContentService = jasmine.createSpyObj('ContentService', ['getVideosImage', 'setContentImgVi', 'getBusiness', 'downloadF']);
  const audit = {
    state: 'success',
    userMessage: 'se ha enviado un correo',
    objectResponse: [{}],
  };
beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LibraryComponent],
      imports: [
        SharedModule,
        TranslateModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        ShareModule,
        AppMaterialModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
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
      providers: [{ provide: MatDialog, useValue: mockDialog }],
    }).compileComponents();
    mockContentService.getVideosImage.and.returnValue(of(audit));
    mockContentService.getBusiness.and.returnValue(of(audit));
    mockContentService.downloadF.and.returnValue(of(audit));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.dataReal = [{ dataR: true }, { dataR: false }];
    component.dataRealVideo = [{ dataR: true }, { dataR: false }];
    component.loadDelete();
    expect(component.active).toBeFalsy();
  });
  it('should set step ', () => {
    component.setStep(2, { id: 1 });
    expect(component.step).toBe(2);
    component.returnAcordeon();
    expect(component.visibleStepMobile).toBeFalsy();
    component.setStepMovil('Datos', { id: 1 });
    expect(component.visibleStepMobile).toBeTruthy();
    component.viewerPhoto({ id: 1, url: 'http:example.jpg' });
    expect(mockDialog.open).toHaveBeenCalled();
  });
  it('add test', () => {
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
    component.downloadFile();
    component.downloadVideo({ id: 1 });
    component.download('string', 'video/mp4');
    component.download('string', 'image/jpg');
    component.download('string', 'application/zip');
    component.dataReal = [
      { id: 1, dataR: true },
      { id: 2, dataR: false },
    ];
    component.dataRealVideo = [
      { id: 1, dataR: true },
      { id: 2, dataR: false },
    ];
    component.downloadFiles();
    component.dataReal = [
      { id: 1, dataR: false },
      { id: 2, dataR: false },
    ];
    component.dataRealVideo = [
      { id: 1, dataR: true },
      { id: 2, dataR: false },
    ];
    component.downloadFiles();
    component.dataReal = [
      { id: 1, dataR: true },
      { id: 2, dataR: false },
    ];
    component.dataRealVideo = [
      { id: 1, dataR: false },
      { id: 2, dataR: false },
    ];
    component.downloadFiles();
  });
});
