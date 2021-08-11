import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterformComponent } from './registerform.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { JwtModule } from '@auth0/angular-jwt';
import { MasterDataService } from 'src/app/services/master-data.service';
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { UtilsService } from 'src/app/services/utils.service';
import { MatDialog } from '@angular/material';

describe('RegisterformComponent', () => {
  let component: RegisterformComponent;
  let fixture: ComponentFixture<RegisterformComponent>;

  const mockUserService = jasmine.createSpyObj('UserService', ['idType', 'registerUser']);
  const mockMasterService = jasmine.createSpyObj('MasterDataService', ['getTerms', 'setTerms']);
  const mockDialog = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);

  const mockUtilsService = jasmine.createSpyObj('UtilsService', ['showloginForm']);

  const idType = [
    {
      id: 1,
      value: 'Cédula de ciudadania',
    },
    {
      id: 2,
      value: 'Cédula de extranjería',
    },
    {
      id: 3,
      value: 'NIT',
    },
  ];

  const register = {
    state: 'Success',
    objectResponse: {
      userId: 0,
      Email: 'eisner.puerta@pragma.com.co',
      FirstNames: 'Eisner',
      LastNames: 'Puerta Carrillo',
      Identification: '1050955208',
      Cellphone: '3105009039',
      Password: 'RXBjMTUyNygpOw==',
      IdType: 1,
      department: 'Antioquia',
      municipality: 'Medellin',
      stateId: 1,
      state: '',
      isEmployeeGrupoExito: false,
      verified: false,
      fileIdentificationCard1:
        'iVBORw0KGgoAAAANSUhEUgAAACAAAAAqCAIAAABdg87FAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAySURBVFhH7c0xDQAgAAQx/Jt+JHRiILka6NljBVRABVRABVRABVRABVRABVRABfR7sF3ODrEiRHEThAAAAABJRU5ErkJggg==',
      fileIdentificationCard2:
        'iVBORw0KGgoAAAANSUhEUgAAACAAAAAqCAIAAABdg87FAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAySURBVFhH7c0xDQAgAAQx/Jt+JHRiILka6NljBVRABVRABVRABVRABVRABVRABfR7sF3ODrEiRHEThAAAAABJRU5ErkJggg==',
      fileBankCertificate:
        'iVBORw0KGgoAAAANSUhEUgAAACAAAAAqCAIAAABdg87FAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAySURBVFhH7c0xDQAgAAQx/Jt+JHRiILka6NljBVRABVRABVRABVRABVRABVRABfR7sF3ODrEiRHEThAAAAABJRU5ErkJggg==',
      // fileRut:
      //   "iVBORw0KGgoAAAANSUhEUgAAACAAAAAqCAIAAABdg87FAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAySURBVFhH7c0xDQAgAAQx/Jt+JHRiILka6NljBVRABVRABVRABVRABVRABVRABfR7sF3ODrEiRHEThAAAAABJRU5ErkJggg==",
      bank: 'Bancolombia',
      typeBankAccount: 'Ahorros',
      bankAccountNumber: 'MTIzNDU2Nzg5',
      receiveCommunications: true,
      address: 'Calle 2 #55-56',
    },
    userMessage: null,
  };

  const registerInvalid = {
    state: 'Error',
    userMessage: null,
  };

  const InvalidRquest = {
    state: 'Error',
    error: {
      userMessage: 'Internal server error',
    },
  };

  let mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  let validateEmployeeSuccess = {
    state: 'Success',
    userMessage: null,
    objectResponse: true,
  };

  let validateEmployeeFail = {
    state: 'Success',
    userMessage: null,
    objectResponse: false,
  };
  let responseTerms = {
    Status: 'Success',
    objectResponse: [
      {
        sectionValue: 'Contenido',
        sectionTitle: 'Title',
      },
      {
        sectionValue: 'Contenido',
        sectionTitle: 'Title',
      },
      {
        sectionValue: 'Contenido',
        sectionTitle: 'Title',
      },
      {
        sectionValue: 'Contenido',
        sectionTitle: 'Title',
      },
    ],
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterformComponent],
      imports: [
        TranslateModule,
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatPasswordStrengthModule,
        SharedModule,
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot({}),
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
        { provide: MasterDataService, useValue: mockMasterService },
        { provide: UserService, useValue: mockUserService },
        { provide: UtilsService, useValue: mockUtilsService },
        { provide: Router, useValue: mockRouter },
        { provide: MatDialog, useValue: mockDialog },
      ],
    }).compileComponents();
    mockMasterService.getTerms.and.returnValue(of(responseTerms));
    mockUserService.idType.and.returnValue(of(idType));
    mockUserService.registerUser.and.returnValue(of(register));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterformComponent);
    component = fixture.componentInstance;
    window['dataLayer'] = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(mockUserService.idType).toHaveBeenCalled();
  });

  it('next step register id 1', () => {
    component.registerForm.controls.idType.setValue('1');
    component.registerForm.controls.id.setValue('123456789');
    expect(component.acceptTerms).toBeFalsy();
  });

  it('next step register id 2', () => {
    component.registerForm.controls.idType.setValue('2');
    expect(component.acceptTerms).toBeFalsy();
  });

  it('next step register id 3', () => {
    component.registerForm.controls.idType.setValue('3');
    expect(component.acceptTerms).toBeFalsy();
  });

  it('accept terms', () => {
    component.acceptTermsCheck();
    expect(component.acceptTerms).toBeTruthy();
  });

  describe('register clicker', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(RegisterformComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('next step register id 1', () => {
      component.registerForm.controls.idType.setValue('1');
      component.registerForm.controls.id.setValue('123456789');
      expect(component.showRegisterForm).toBeTruthy();
    });

    it('next step register id 2', () => {
      component.registerForm.controls.idType.setValue('2');
      expect(component.showRegisterForm).toBeTruthy();
    });

    it('next step register id 3', () => {
      component.registerForm.controls.idType.setValue('3');
      expect(component.showRegisterForm).toBeTruthy();
    });
  });

  it('register form', () => {
    component.registerForm.controls.email.setValue('david.betancur@pragma.com.co');
    component.registerForm.controls.name.setValue('David');
    component.registerForm.controls.lastName.setValue('Betancur');
    component.registerForm.controls.id.setValue('1');
    component.registerForm.controls.phone.setValue('30000000000');
    component.registerForm.controls.password.setValue('123456');
    component.registerForm.controls.idType.setValue('CC');
    component.register();
    expect(mockUserService.registerUser).toHaveBeenCalled();
  });

  it('accept Modal', () => {
    component.acceptModal();
    component.acceptTerms = true;
    expect(component.acceptTerms).toBeTruthy();
  });

  it('hide register', () => {
    component.hideRegister();
    expect(mockUtilsService.showloginForm).toHaveBeenCalled();
  });

  it('show term', () => {
    component.termsAndConditions();
    expect(mockDialog.open).toHaveBeenCalled();
  });

  describe('register invalid', () => {
    beforeEach(() => {
      window['dataLayer'] = [];
      mockUserService.registerUser.and.returnValue(of(registerInvalid));
    });

    it('register invalid', () => {
      component.register();
      expect(mockUserService.registerUser).toHaveBeenCalled();
    });
  });

  describe('invalid request', () => {
    beforeEach(function () {
      mockUserService.registerUser.and.returnValue(throwError(InvalidRquest));
    });

    it('invalid request', () => {
      component.register();
      expect(mockUserService.registerUser).toHaveBeenCalled();
    });
  });
});
