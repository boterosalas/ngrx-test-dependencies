import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogImagePlayerComponent } from './dialog-image-player.component';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs/internal/observable/of';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContentService } from 'src/app/services/content.service';
import { UtilsService } from 'src/app/services/utils.service';
// import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Observable } from 'rxjs';
import { HomeComponent } from 'src/app/modules/anonymous/pages/home/home.component';

describe('DialogCategoryComponent', () => {
  let component: DialogImagePlayerComponent;
  let fixture: ComponentFixture<DialogImagePlayerComponent>;

  const mockContentService = jasmine.createSpyObj('ContentService', ['addCategory', 'downloadF']);
  let socialAuthServiceMock = jasmine.createSpyObj('socialAuthService', ['authState', 'initState', 'refreshAuthToken', 'signIn', 'signOut']);
  const dialogMock = {
    close: () => {},
  };

  const resp = {
    state: 'Success',
    userMessage: 'se ha actualizado el email',
    objectResponse: [],
  };

  const audit = {
    state: 'success',
    userMessage: 'se ha enviado un correo',
    objectResponse: [{}],
  };

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DialogImagePlayerComponent, TruncatePipe],
      imports: [
        TranslateModule.forRoot(),
        AppMaterialModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'inicio', component: HomeComponent}
        ]),
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule,
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
      providers: [
        UtilsService,
        // { provide: SocialAuthService, useValue: { ...socialAuthServiceMock, authState: new Observable() } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: ContentService, useValue: mockContentService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    mockContentService.addCategory.and.returnValue(of(resp));
    mockContentService.downloadF.and.returnValue(of(audit));
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(DialogImagePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onNoClick', () => {
    component.onNoClick();
    expect(component).toBeTruthy();
  });

  it('download file', () => {
    component.downloadFile();
    expect(mockContentService.downloadF).toHaveBeenCalled();
  });


});
