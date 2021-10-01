import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ConfigurationsComponent } from './configurations.component';

describe('ConfigurationsComponent', () => {
  let component: ConfigurationsComponent;
  let fixture: ComponentFixture<ConfigurationsComponent>;
  const mockAuthService = jasmine.createSpyObj('AuthService', ['getPermisionByUser']);
  const mockUserService = jasmine.createSpyObj('UserService', ['getPermision', 'savePermision', 'deleteUserAdmin', 'addUserAdmin']);
  let responseUser = [
    {
      userid: 1,
      idmenu: 1,
      menu: 'Any',
      permission: false,
    },
  ];

  let respPermision = {
    state: 'Success',
    userMessage: 'Success',
    objectResponse: [
      {
        userid: 1,
        rolid: 3,
        rolcode: 'ADMIN',
        issuperadmin: false,
        fullname: 'Alejandro Pc',
        permissions: [
          {
            menuid: 1,
            value: false,
          },
        ],
      },
      {
        userid: 2,
        rolid: 3,
        rolcode: 'SUPERADMIN',
        issuperadmin: true,
        fullname: 'Andres Acosta',
        permissions: [
          {
            menuid: 1,
            value: true,
          },
        ],
      },
    ],
  };

  let respSavePermision = {
    state: 'Success',
    userMessage: 'Permiso guardado',
    objectResponse: null,
  };

  let respDeleteAdmin = {
    state: 'Success',
    userMessage: 'Admin eliminado',
    objectResponse: null,
  };

  let respAddAdmin = {
    state: 'Success',
    userMessage: 'Admin agregado',
    objectResponse: null,
  };

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigurationsComponent],
      imports: [
        AppMaterialModule,
        TranslateModule.forRoot({}),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        NgxDaterangepickerMd,
        SharedModule,
        MatSlideToggleModule,
        ReactiveFormsModule,
        FormsModule,
        NgxMaterialTimepickerModule,
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
        { provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: mockUserService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    mockAuthService.getPermisionByUser.and.returnValue(of(responseUser));
    mockUserService.getPermision.and.returnValue(of(respPermision));
    mockUserService.savePermision.and.returnValue(of(respSavePermision));
    mockUserService.deleteUserAdmin.and.returnValue(of(respDeleteAdmin));
    mockUserService.addUserAdmin.and.returnValue(of(respAddAdmin));
  }));

  beforeEach(() => {
    localStorage.setItem(
      'ACCESS_TOKEN',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInVzZXJOYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInJvbGUiOiJDTElDS0VSIiwiZXhwIjoxNTcxODY2MDgwLCJpc3MiOiJwcmFjdGluY2FuZXRjb3JlLmNvbSIsImF1ZCI6IkVzdHVkaWFudGVzIn0.UJahw9VBALxwYizSTppjGJYnr618EKlaFW-d3YLugnU'
    );
    fixture = TestBed.createComponent(ConfigurationsComponent);
    component = fixture.componentInstance;
    // component.userId = "1"
    // component.role = "SUPERADMIN"
    // component.servicios = respPermision.objectResponse
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    //component.getPermisionByUserService()
    expect(mockAuthService.getPermisionByUser).toHaveBeenCalled();
    //component.getPermisionService()
    expect(mockUserService.getPermision).toHaveBeenCalled();
  });

  describe('functions', () => {
    it('get Permission Value false', () => {
      component.getPermissionValue(respPermision.objectResponse[0], 1);
      expect(component.getPermissionValue).toBeTruthy();
    });
    it('get Permission Value true', () => {
      component.getPermissionValue(respPermision.objectResponse[1], 1);
      expect(component.getPermissionValue).toBeTruthy();
    });

    it('change permission checked true', () => {
      const event = { checked: true };
      component.changePermission(event, 0, 1);
      expect(component.disableBoton).not.toBeTruthy();
    });
    it('change permission checked false', () => {
      const event2 = { checked: false };
      component.changePermission(event2, 1, 1);
      expect(component.disableBoton).not.toBeTruthy();
    });

    it('open ConfirmPassword', () => {
      component.openConfirmPassword(1);
      expect(component.openConfirmPassword).toBeTruthy();
    });
    it('delete Admin Service', () => {
      component.adminFormDelete.controls.Password.setValue('C123456');
      component.deleteAdminService();
      expect(mockUserService.deleteUserAdmin).toHaveBeenCalled();
    });

    it('open addNewAdmin', () => {
      component.addNewAdmin();
      expect(component.addNewAdmin).toBeTruthy();
    });
    it('add User Admin', () => {
      component.dataAddAdmin.controls.name.setValue('Alejandro');
      component.dataAddAdmin.controls.password.setValue('C123456');
      component.dataAddAdmin.controls.email.setValue('alejandro@gmail.com');
      component.addAdminService();
      expect(mockUserService.addUserAdmin).toHaveBeenCalled();
    });
  });

  // describe("change permission", () => {

  // })

  // describe("open Confirm Password", () => {

  // })

  // describe("add New Admin", () => {

  // })

  // it('saveeraser', () => {
  //   component.saveeraser();
  //   expect(mockUserService.savePermision).toHaveBeenCalled();
  // })
});
