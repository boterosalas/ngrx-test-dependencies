import { waitForAsync, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { MenuOptionsComponent } from './menu-options.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/services/auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UtilsService } from 'src/app/services/utils.service';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
// import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HomeComponent } from 'src/app/modules/anonymous/pages/home/home.component';

describe('MenuOptionsComponent', () => {
  let component: MenuOptionsComponent;
  let fixture: ComponentFixture<MenuOptionsComponent>;

  const mockUtilsService = jasmine.createSpyObj('UtilsService', ['showRegisterForm', 'hideMenu']);
  let socialAuthServiceMock = jasmine.createSpyObj('socialAuthService', ['authState', 'initState', 'refreshAuthToken', 'signIn', 'signOut']);

  let menuAnymous = {
    state: 'Success',
    userMessage: null,
    objectResponse: [
      {
        name: 'Click Academy',
        route: 'click-academy',
      },
      {
        name: 'Ofertas',
        route: 'ofertas',
      },
      {
        name: 'Inicio',
        route: '/',
      },
    ],
  };

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MenuOptionsComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'inicio', component: HomeComponent}
        ]),
        TranslateModule.forRoot(),
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
        HttpClientTestingModule,
      ],
      providers: [
        // { provide: AuthService, useValue: mockAuthService },
        // { provide: SocialAuthService, useValue: { ...socialAuthServiceMock, authState: new Observable() } },
        { provide: UtilsService, useValue: mockUtilsService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    // mockAuthService.getMenu$.and.returnValue(of(true));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('hide menu', () => {
    component.hideMenu();
    expect(mockUtilsService.hideMenu).toHaveBeenCalled();
  });

  it('hide sidenav', () => {
    spyOn(component.hideSidenav, 'emit');
    component.hide();
    expect(component.hideSidenav.emit).toHaveBeenCalled();
  });

  it('go to terms', inject([Router], (router: Router) => {
    spyOn(router, 'navigate').and.stub();
    component.goTerms();
    expect(router.navigate).toHaveBeenCalledWith(['/terminos-y-condiciones']);
  }));
});
