import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { JwtModule } from '@auth0/angular-jwt';
import { UtilsService } from 'src/app/services/utils.service';
// import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Observable } from 'rxjs';
import { HomeComponent } from '../../pages/home/home.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  const mockUtilsService = jasmine.createSpyObj('UtilsService', ['showRegisterForm', 'hideMenu']);
  let socialAuthServiceMock = jasmine.createSpyObj('socialAuthService', ['authState', 'initState', 'refreshAuthToken', 'signIn', 'signOut']);

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MenuComponent],
      imports: [
        AppMaterialModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({}),
        RouterTestingModule.withRoutes([
          { path: 'inicio', component: HomeComponent}
        ]),
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
        { provide: UtilsService, useValue: mockUtilsService },
        // { provide: SocialAuthService, useValue: { ...socialAuthServiceMock, authState: new Observable() } }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    mockUtilsService.showRegisterForm.and.returnValue(true);
    mockUtilsService.hideMenu.and.returnValue(true);
  }));

  beforeEach(() => {
    localStorage.setItem(
      'ACCESS_TOKEN',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInVzZXJOYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInJvbGUiOiJDTElDS0VSIiwiZXhwIjoxNTcxODY2MDgwLCJpc3MiOiJwcmFjdGluY2FuZXRjb3JlLmNvbSIsImF1ZCI6IkVzdHVkaWFudGVzIn0.UJahw9VBALxwYizSTppjGJYnr618EKlaFW-d3YLugnU'
    );
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('open register', () => {
    component.openRegister();
    expect(mockUtilsService.showRegisterForm).toHaveBeenCalled();
  });

  it('hide menu', () => {
    component.hideMenu();
    expect(mockUtilsService.hideMenu).toHaveBeenCalled();
  });
});
