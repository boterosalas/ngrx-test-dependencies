/* import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlComponent } from './url.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/services/auth.service';
import { LinksService } from 'src/app/services/links.service';
import { UtilsService } from 'src/app/services/utils.service';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
localStorage.setItem(
  'ACCESS_TOKEN',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInVzZXJOYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInJvbGUiOiJDTElDS0VSIiwiZXhwIjoxNTcxODY2MDgwLCJpc3MiOiJwcmFjdGluY2FuZXRjb3JlLmNvbSIsImF1ZCI6IkVzdHVkaWFudGVzIn0.UJahw9VBALxwYizSTppjGJYnr618EKlaFW-d3YLugnU'
);
describe('UrlComponent', () => {
  let component: UrlComponent;
  let fixture: ComponentFixture<UrlComponent>;
  let mockLinksService = jasmine.createSpyObj('LinksService', ['getUrl', 'getUrlWidget']);
  let authSvcMock = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'getProfile', 'userInfo$']);
  let utilsSvcMock = jasmine.createSpyObj('UtilsService', ['showloginForm']);
  let userSvcMock = jasmine.createSpyObj('userSvc', ['getProfile']);
  const response = {
    objectResponse: 'www.prueba.com',
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UrlComponent],
        imports: [
          AppMaterialModule,
          HttpClientTestingModule,
          TranslateModule.forRoot({}),
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
        providers: [
          { provide: LinksService, useValue: mockLinksService },
          { provide: AuthService, useValue: authSvcMock },
          { provide: UserService, useValue: userSvcMock },
          { provide: UtilsService, useValue: utilsSvcMock },
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
      mockLinksService.getUrl.and.returnValue(of(response));
      mockLinksService.getUrlWidget.and.returnValue(of(response));
     // utilsSvcMock = { ...utilsSvcMock, ...{ change: { subscribe: jasmine.createSpy('change subscribe') } } };
    //  authSvcMock.userInfo$.and.returnValue({});
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.getUrl();
    component.exist = {
      id: 1,
      code: 'exito_widget',
      url: 'https://www.exito.com',
    };
    expect(mockLinksService.getUrl).toHaveBeenCalled();
  });
}); */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlComponent } from './url.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { LinksService } from 'src/app/services/links.service';
localStorage.setItem(
  'ACCESS_TOKEN',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInVzZXJOYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInJvbGUiOiJDTElDS0VSIiwiZXhwIjoxNTcxODY2MDgwLCJpc3MiOiJwcmFjdGluY2FuZXRjb3JlLmNvbSIsImF1ZCI6IkVzdHVkaWFudGVzIn0.UJahw9VBALxwYizSTppjGJYnr618EKlaFW-d3YLugnU'
);
describe('UrlComponent', () => {
  let component: UrlComponent;
  let fixture: ComponentFixture<UrlComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UrlComponent],
      imports: [
        RouterTestingModule,
        AppMaterialModule,
        HttpClientTestingModule,
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
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
