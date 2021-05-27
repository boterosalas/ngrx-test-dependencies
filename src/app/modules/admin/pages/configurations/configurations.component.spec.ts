import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material';
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
import { UserService } from "src/app/services/user.service";

import { ConfigurationsComponent } from './configurations.component';

describe('ConfigurationsComponent', () => {
  let component: ConfigurationsComponent;
  let fixture: ComponentFixture<ConfigurationsComponent>;
  const mockAuthService = jasmine.createSpyObj("AuthService", [
    "getPermisionByUser"
  ]);
  const mockUserService = jasmine.createSpyObj("UserService", [
    "getPermision", "savePermision", "deleteUserAdmin", "addUserAdmin"
  ]);
  let responseUser = [{
    userid: 1,
    idmenu: 1,
    menu: "Any",
    permission: false
  }]

  let respPermision = {
    state: "Success",
    userMessage: "Success",
    objectResponse: [{
      userid: 1,
      rolid: 3,
      rolcode: "ADMIN",
      issuperadmin: false,
      fullname: "Alejandro Pc",
      permissions: [{
        menuid: 1,
        value: false
      }]
    }]
  }

  let respSavePermision = {
    state: "Success",
    userMessage: "Permiso guardado",
    objectResponse: null
  }

  let respDeleteAdmin = {
    state: "Success",
    userMessage: "Admin eliminado",
    objectResponse: null
  }

  let respAddAdmin = {
    state: "Success",
    userMessage: "Admin agregado",
    objectResponse: null
  }
  
  beforeEach(async(() => {
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
            whitelistedDomains: [],
            blacklistedRoutes: []
          }
        }),

      ],
      providers: [{ provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: mockUserService }],
      schemas: [NO_ERRORS_SCHEMA],

    })
      .compileComponents();
    //mockAuthService.getUsersAdmin.and.returnValue(of(respuestaArray));
    mockAuthService.getPermisionByUser.and.returnValue(of(responseUser));
    mockUserService.getPermision.and.returnValue(of(respPermision));
    mockUserService.savePermision.and.returnValue(of(respSavePermision));
    mockUserService.deleteUserAdmin.and.returnValue(of(respDeleteAdmin));
    mockUserService.addUserAdmin.and.returnValue(of(respAddAdmin));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('change permission', () => {
    component.servicios = respPermision.objectResponse
    const event = { checked: true }
    component.changePermission(event, 0, 1);
    expect(component.disableBoton).not.toBeTruthy()
  })
  it('saveeraser', () => {
    component.saveeraser();
    expect(mockUserService.savePermision).toHaveBeenCalled();
  })
  // it('change permission', () => {
  //   const event = { checked: true }
  //   component.changePermission(event, 0, 1);
  //   expect(component.disableBoton).not.toBeTruthy()
  // })
});
