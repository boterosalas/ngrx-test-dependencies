import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError, BehaviorSubject, Observable } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { JwtModule } from '@auth0/angular-jwt';
import { MasterDataService } from 'src/app/services/master-data.service';
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { PaymentInfoComponent } from './payment-info.component';
import { HomeComponent } from 'src/app/modules/anonymous/pages/home/home.component';
// import { SocialAuthService } from '@abacritt/angularx-social-login';

class MockUserService {
  userInfo$ = new BehaviorSubject<any>({
    userId: '721',
    identification: '1002546856',
    firstNames: 'David',
    lastNames: 'Betancur',
    cellphone: '3000000000',
  });

  response = {
    state: 'Success',
    userMessage: 'actualizado',
    objectResponse: null,
  };

  update = {
    state: 'Success',
    userMessage: 'actualizado',
    objectResponse: null,
  };

  uploadFiles() {
    const response = new Observable((res) => {
      res.next(this.response);
    });
    return response;
  }

  updateUser() {
    const update = new Observable((res) => {
      res.next(this.update);
    });
    return update;
  }
}

class MockUserServiceError {
  userInfo$ = new BehaviorSubject<any>({});

  response = {
    state: 'Error',
    userMessage: 'Error',
    objectResponse: null,
  };

  update = {
    state: 'Error',
    userMessage: 'Error',
    objectResponse: null,
  };

  uploadFiles() {
    const response = new Observable((res) => {
      res.next(this.response);
    });
    return response;
  }

  updateUser() {
    const update = new Observable((res) => {
      res.next(this.update);
    });
    return update;
  }
}

describe('PaymentInfoComponent', () => {
  let component: PaymentInfoComponent;
  let fixture: ComponentFixture<PaymentInfoComponent>;

  const mockMasterDataService = jasmine.createSpyObj('MasterDataService', ['getDepartments', 'getBanks']);
  let socialAuthServiceMock = jasmine.createSpyObj('socialAuthService', ['authState', 'initState', 'refreshAuthToken', 'signIn', 'signOut']);

  const dataDepartments = {
    state: 'Success',
    userMessage: '',
    objectResponse: [
      {
        Id: 1,
        code: '01',
        description: 'Bolivar',
        municipalities: [
          {
            Id: 1,
            code: '01',
            description: 'Turbaco',
            idDeparment: 1,
          },
          {
            Id: 2,
            code: '02',
            description: 'Cartagena',
            idDeparment: 1,
          },
        ],
      },
      {
        Id: 2,
        code: '02',
        description: 'Antioquia',
        municipalities: [
          {
            Id: 3,
            code: '03',
            description: 'Medellín',
            idDeparment: 2,
          },
          {
            Id: 4,
            code: '04',
            description: 'Bello',
            idDeparment: 2,
          },
        ],
      },
    ],
  };

  const dataBanks = {
    state: 'Success',
    userMessage: '',
    objectResponse: [
      {
        Id: 1,
        code: 'BANCOLOMBIA',
        description: ' Bancolombia',
      },
      {
        Id: 2,
        code: 'DAVIVIENDA',
        description: ' Davivienda',
      },
    ],
  };

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
      fileRUT:
        'iVBORw0KGgoAAAANSUhEUgAAACAAAAAqCAIAAABdg87FAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAySURBVFhH7c0xDQAgAAQx/Jt+JHRiILka6NljBVRABVRABVRABVRABVRABVRABfR7sF3ODrEiRHEThAAAAABJRU5ErkJggg==',
      bank: 'Bancolombia',
      typeBankAccount: 'Ahorros',
      bankAccountNumber: 'MTIzNDU2Nzg5',
      receiveCommunications: true,
      address: 'Calle 2 #55-56',
    },
    userMessage: null,
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PaymentInfoComponent, TruncatePipe],
        imports: [
          TranslateModule,
          AppMaterialModule,
          FormsModule,
          ReactiveFormsModule,
          HttpClientTestingModule,
          BrowserAnimationsModule,
          MatPasswordStrengthModule,
          TranslateModule.forRoot({}),
          RouterTestingModule.withRoutes([{ path: 'inicio', component: HomeComponent }]),
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
          // { provide: SocialAuthService, useValue: { ...socialAuthServiceMock, authState: new Observable() } },
          { provide: MasterDataService, useValue: mockMasterDataService },
          { provide: UserService, useClass: MockUserService },
          { provide: UserService, useClass: MockUserServiceError },
        ],
      }).compileComponents();
      mockMasterDataService.getDepartments.and.returnValue(of(dataDepartments));
      mockMasterDataService.getBanks.and.returnValue(of(dataBanks));
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentInfoComponent);
    component = fixture.componentInstance;
    component.filteredDepartments = new Observable<any>();
    fixture.detectChanges();
    // component.phone = '123456789';
    // component.name = 'David';
    // component.lastName = 'Tets';
    component.departmentCode = '20';
    component.cityCode = '1';
    component.externalForm.controls.bank.setValue('Bancolombia');
    component.externalForm.controls.numberAccount.setValue('123456789');
    component.externalForm.controls.typeAccount.setValue('ahorros');
    // component.externalForm.controls.address.setValue('calle falsa 123');
    // component.externalForm.controls.department.setValue('Antioquia');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get Banks', () => {
    component.getBanks();
    expect(mockMasterDataService.getBanks).toHaveBeenCalled();
  });

  it('displayDepartment', () => {
    component.displayDepartment('Antioquia');
    expect(component.displayDepartment).not.toBeUndefined();
  });

  it('onFileChangeFiles rut', () => {
    const mockFile = new File([''], 'Rut.jpg', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };
    component.onFileChangeFiles(mockEvt, 'Rut');
    expect(component.onFileChangeFiles).not.toBeNull();
  });

  it('onFileChangeFiles BankCertificate', () => {
    const mockFile = new File([''], 'BankCertificate.jpg', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };
    component.onFileChangeFiles(mockEvt, 'BankCertificate');
    expect(component.onFileChangeFiles).not.toBeNull();
  });

  it('onFileChangeFiles IdentificationCard1', () => {
    const mockFile = new File([''], 'IdentificationCard1.jpg', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };
    component.onFileChangeFiles(mockEvt, 'IdentificationCard1');
    expect(component.onFileChangeFiles).not.toBeNull();
  });

  it('onFileChangeFiles IdentificationCard2', () => {
    const mockFile = new File([''], 'IdentificationCard2.jpg', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };
    component.onFileChangeFiles(mockEvt, 'IdentificationCard2');
    expect(component.onFileChangeFiles).not.toBeNull();
  });
});
