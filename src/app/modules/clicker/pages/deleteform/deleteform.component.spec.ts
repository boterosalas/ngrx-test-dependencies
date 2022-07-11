import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule } from '@ngx-translate/core';
import { SocialAuthService } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';

import { DeleteformComponent } from './deleteform.component';

describe('DeleteformComponent', () => {
  let component: DeleteformComponent;
  let fixture: ComponentFixture<DeleteformComponent>;
  const dialogMock = {
    close: () => {},
    beforeClosed: () => {},
  };
  const mockDialog = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);
  let socialAuthServiceMock = jasmine.createSpyObj('socialAuthService', ['authState', 'initState', 'refreshAuthToken', 'signIn', 'signOut']);
beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteformComponent, TruncatePipe],
      imports: [
        TranslateModule.forRoot({}),
        ReactiveFormsModule,
        AppMaterialModule,
        FormsModule,
        HttpClientTestingModule,
        AppMaterialModule,
        MatPasswordStrengthModule,
        BrowserAnimationsModule,
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
      providers: [
        { provide: SocialAuthService, useValue: { ...socialAuthServiceMock, authState: new Observable() } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MatDialog, useValue: mockDialog },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.cancelDelete();
    component.checkSurvey();
    component.deleteAccount();
    component.changeValue('Dato');
  });
});
