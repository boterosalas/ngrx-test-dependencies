import { HttpClientTestingModule } from '@angular/common/http/testing';
import { componentFactoryName } from '@angular/compiler';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { BannerComponent } from 'src/app/modules/shared/components/banner/banner.component';
import { ContentService } from 'src/app/services/content.service';
import { LoadFormFileComponent } from '../../components/load-form-file/load-form-file.component';

import { NotificationDetailComponent } from './notification-detail.component';

describe('NotificationDetailComponent', () => {
  let component: NotificationDetailComponent;
  let fixture: ComponentFixture<NotificationDetailComponent>;

  const mockContentService = jasmine.createSpyObj('ContentService', ['saveNotificationAdmin', 'getNotificationDetailAdmin']);

  let response = {
    state: 'Success',
    userMessage: 'Se han guardado los cambios satisfactoriamente',
    objectResponse: null,
  };

  let responseNotification = {
    state: 'Success',
    userMessage: 'Se han guardado los cambios satisfactoriamente',
    objectResponse: { 
      title: 'Prueba',
      content: 'Contenido de la prueba',
      filter: 'prueba',
      datepublish: '20T:12:00'
     },
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NotificationDetailComponent, BannerComponent, LoadFormFileComponent],
        imports: [
          FormsModule,
          ReactiveFormsModule,
          RouterTestingModule,
          HttpClientTestingModule,
          TranslateModule.forRoot({}),
          AppMaterialModule,
          AngularEditorModule,
          NgxDaterangepickerMd,
          NgxMaterialTimepickerModule,
          BrowserAnimationsModule,
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
        providers: [
          { provide: ContentService, useValue: mockContentService }
        ],
        schemas: [
          NO_ERRORS_SCHEMA
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.idNotification = 1;
    expect(component).toBeTruthy();
  });

  it('on file change bad file', () => {
    const mockFile = new File([''], 'name.jpg', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };
    component.onFileChangeNotification(mockEvt);
    expect(component.onFileChangeNotification).not.toBeNull();
  });

  it('on file change file', () => {
    const mockFile = new File([''], 'name.xlsx', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };
    component.validFormat = true;
    component.nameFileNotification = 'prueba.xls';
    component.onFileChangeNotification(mockEvt);
    expect(component.onFileChangeNotification).not.toBeNull();
  });

  it('save notification', () => {
    mockContentService.saveNotificationAdmin.and.returnValue(of(response));
    component.saveNotification();
    expect(mockContentService.saveNotificationAdmin).toHaveBeenCalled();
  });

  it('get notification', () => {
    mockContentService.getNotificationDetailAdmin.and.returnValue(of(responseNotification));
    component.getNotification();
    expect(mockContentService.getNotificationDetailAdmin).toHaveBeenCalled();
  });

});
