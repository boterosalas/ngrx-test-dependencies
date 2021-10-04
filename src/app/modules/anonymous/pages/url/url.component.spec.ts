import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlComponent } from './url.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { AnonymousModule } from '../../anonymous.module';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/services/auth.service';
import { LinksService } from 'src/app/services/links.service';
import { UtilsService } from 'src/app/services/utils.service';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';

describe('UrlComponent', () => {
  let component: UrlComponent;
  let fixture: ComponentFixture<UrlComponent>;
  const authSvcMock = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'getProfile']);
  const linkSvcMock = jasmine.createSpyObj('LinksService', ['getUrl', 'getUrlWidget']);
  let utilsSvcMock = jasmine.createSpyObj('UtilsService', ['showloginForm']);
  const userSvcMock = jasmine.createSpyObj('userSvc', ['getProfile']);
  const response = {
    Status: 'Success',
    objectResponse: {},
  };

  beforeEach(

    waitForAsync(() => {
      utilsSvcMock = {...utilsSvcMock,    ...{ change: { subscribe: jasmine.createSpy('change subscribe') } }}
      TestBed.configureTestingModule({
        declarations: [UrlComponent],
        imports: [
          TranslateModule.forRoot(),
          AnonymousModule,
          HttpClientTestingModule,
          NoopAnimationsModule,
          RouterTestingModule.withRoutes([]),
          AppMaterialModule,
          BrowserAnimationsModule,
          SharedModule,
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
          { provide: AuthService, useValue: authSvcMock },
          { provide: LinksService, useValue: linkSvcMock },
          { provide: UserService, useValue: userSvcMock },
          { provide: UtilsService, useValue: utilsSvcMock },
        ],
      }).compileComponents();
      //utilsSvcMock.change.and.returnValue(of(true));
      linkSvcMock.getUrl.and.returnValue(of(response));
      linkSvcMock.getUrlWidget.and.returnValue(of(response));
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
