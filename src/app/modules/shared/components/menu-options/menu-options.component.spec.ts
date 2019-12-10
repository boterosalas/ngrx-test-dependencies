import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOptionsComponent } from './menu-options.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/services/auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UtilsService } from 'src/app/services/utils.service';
import { JwtModule } from '@auth0/angular-jwt';

describe('MenuOptionsComponent', () => {
  let component: MenuOptionsComponent;
  let fixture: ComponentFixture<MenuOptionsComponent>;

  // const mockAuthService = jasmine.createSpyObj("AuthService", ["getMenu$"]);
  const mockUtilsService = jasmine.createSpyObj("UtilsService", ["showRegisterForm", "hideMenu"]);

  let menuAnymous = {
    "state": "Success",
    "userMessage": null,
    "objectResponse": [
        {
            "name": "Click Academy",
            "route": "click-academy"
        },
        {
            "name": "Ofertas",
            "route": "ofertas"
        },
        {
            "name": "Inicio",
            "route": "/"
        }
    ]
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuOptionsComponent ],
      imports: [
        RouterTestingModule.withRoutes([]),
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem("ACCESS_TOKEN");
            },
            throwNoTokenError: true,
            whitelistedDomains: [],
            blacklistedRoutes: []
          }
        }),
        HttpClientTestingModule
      ],
      providers: [
        // { provide: AuthService, useValue: mockAuthService },
        { provide: UtilsService, useValue: mockUtilsService }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
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


});
