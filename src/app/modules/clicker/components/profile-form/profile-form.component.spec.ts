import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFormComponent } from './profile-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule, UntypedFormBuilder } from '@angular/forms';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MasterDataService } from 'src/app/services/master-data.service';
import { of } from 'rxjs/internal/observable/of';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { UserService } from 'src/app/services/user.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';
// import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HomeComponent } from 'src/app/modules/anonymous/pages/home/home.component';

class MockUserService extends UserService {

  userInfo$ = new BehaviorSubject<any>({
    firstNames: 'David',
    identification: '1002546856',
    lastNames: 'Betancur',
    cellphone: '3000000000',
  });
}

describe('ProfileFormComponent', () => {
  let component: ProfileFormComponent;
  let fixture: ComponentFixture<ProfileFormComponent>;

  const mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
  let socialAuthServiceMock = jasmine.createSpyObj('socialAuthService', ['authState', 'initState', 'refreshAuthToken', 'signIn', 'signOut']);

  const mockUserService = jasmine.createSpyObj('UserService', [
    'getuserdata',
    'getStatusVerification',
    'changeBankInformation',
    'uploadFiles',
    'getDocuments'
  ]);

  const mockMasterDataService = jasmine.createSpyObj('MasterDataService', ['getDepartments', 'getBanks']);

  const dataUserC = {
    managedpayments: true,
    isemployeeuser: true,
  };

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

  const department = {
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
  };

  const city = {
    Id: 3,
    code: '03',
    description: 'Medellín',
    idDeparment: 2,
  };

  const banks = [{ Id: 1, code: '01', description: 'BANCO AGRARIO' }];

  const resp = {
    state: 'Success',
    userMessage: 'se ha actualizado el usuario',
    objectResponse: [],
  };

  const ErrorUptade = {
    state: 'Success',
    userMessage: 'No se ha actualizado el usuario',
    objectResponse: [],
  };

  const getStatusVerification = {
    state: 'Success',
    userMessage: null,
    objectResponse: [
      { id: 4252, code: 'NOTVERIFIED', value: 'No verificada' },
      { id: 4253, code: 'INPROGRESS', value: 'En proceso de verificación' },
      { id: 4254, code: 'VERIFIED', value: 'Cuenta Verificada' },
      { id: 4255, code: 'REJECTED', value: 'Cuenta rechazada' },
    ],
  };

  const changeBankInformation = {
    state: 'Success',
    userMessage: 'Los datos fueron guardados.',
    objectResponse: null,
  };

  const respUploadFiles = {
    state: 'Success',
    userMessage: 'se ha guardado el archivo',
    objectResponse: null,
  };

  const previewImg = {
    state: 'Success',
    userMessage: null,
    objectResponse: {
      base64: '',
      path: '20210810145930_1124587893_BankCertificate.jpg',
      extension: '.jpg'
    }
  };

  const previewpdf = {
    state: 'Success',
    userMessage: null,
    objectResponse: {
      base64: '',
      path: '20210810145930_1124587893_BankCertificate.jpg',
      extension: '.pdf'
    }
  };

  const previewError = {
    state: 'Error',
    userMessage: 'No existe el documento',
    objectResponse: null
  };

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileFormComponent, DialogEditComponent, TruncatePipe],
      imports: [
        TranslateModule.forRoot({}),
        ReactiveFormsModule,
        AppMaterialModule,
        FormsModule,
        HttpClientTestingModule,
        AppMaterialModule,
        MatPasswordStrengthModule,
        BrowserAnimationsModule,
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
        // { provide: SocialAuthService, useValue: { ...socialAuthServiceMock, authState: new Observable() } },
        { provide: MatDialogRef, useValue: mockDialog },
        { provide: MasterDataService, useValue: mockMasterDataService },
        { provide: UserService, useClass: MockUserService },
      ],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [DialogEditComponent],
        },
      })
      .compileComponents();
    mockMasterDataService.getDepartments.and.returnValue(of(dataDepartments));
    mockUserService.getuserdata.and.returnValue(of(dataUserC));
    mockMasterDataService.getBanks.and.returnValue(of(banks));
    mockUserService.getStatusVerification.and.returnValue(of(getStatusVerification));
    mockUserService.changeBankInformation.and.returnValue(of(changeBankInformation));
    mockUserService.uploadFiles.and.returnValue(of(respUploadFiles));
    mockUserService.getDocuments.and.returnValue(of(previewImg));
  }));

  beforeEach(() => {
    localStorage.setItem(
      'ACCESS_TOKEN',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInVzZXJOYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInJvbGUiOiJDTElDS0VSIiwiZXhwIjoxNTcxODY2MDgwLCJpc3MiOiJwcmFjdGluY2FuZXRjb3JlLmNvbSIsImF1ZCI6IkVzdHVkaWFudGVzIn0.UJahw9VBALxwYizSTppjGJYnr618EKlaFW-d3YLugnU'
    );
    fixture = TestBed.createComponent(ProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.name = 'David';
    component.lastName = 'Betancur';
    component.email = 'test@test.com';
    component.phone = '3005490912';
    component.id = '12345';
    component.address = 'calle falsa 123';
    component.department = 'Antioquia';
    component.municipality = 'Bello';
    component.bank = 'Bancolombia';
    component.bankAccountNumber = '12345678';
    component.typeBankAccount = 'Ahorros';
    component.userId = '0000';
    component.isEmployee = true;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get user data', () => {
    const service = fixture.debugElement.injector.get(UserService);
    spyOn(service, 'getuserdata').and.returnValue(of(dataUserC));
    component.getUserData();
    expect(service.getuserdata).toHaveBeenCalled();
  });

  it('update account', () => {
    const service = fixture.debugElement.injector.get(UserService);
    spyOn(service, 'changeBankInformation').and.returnValue(of(changeBankInformation));
    spyOn(service, 'updateUser').and.returnValue(of(resp));
    component.updateAccount();
    expect(service.changeBankInformation).toHaveBeenCalled();
    expect(service.updateUser).toHaveBeenCalled();
  });

  it('change address', () => {
    const service = fixture.debugElement.injector.get(UserService);
    spyOn(service, 'updateUser').and.returnValue(of(resp));
    component.changeAddress();
    expect(service.updateUser).toHaveBeenCalled();
  });

  it('update User', () => {
    const service = fixture.debugElement.injector.get(UserService);
    spyOn(service, 'updateUser').and.returnValue(of(resp));
    component.editUser();
    expect(service.updateUser).toHaveBeenCalled();
  });

  it('showAccount', () => {
    const service = fixture.debugElement.injector.get(UserService);
    spyOn(service, 'getBankAccountNumber').and.returnValue(of(resp));
    component.showAccount();
    expect(service.getBankAccountNumber).toHaveBeenCalled();
  });

  it('getStatusVerification', () => {
    const service = fixture.debugElement.injector.get(UserService);
    spyOn(service, 'getStatusVerification').and.returnValue(of(getStatusVerification));
    component.getStatusVerification('Tu cuenta entrará en estado de verificación pronto');
    expect(service.getStatusVerification).toHaveBeenCalled();
  });

  it('editName', () => {
    component.editName();
    expect(mockDialog.open).toBeTruthy();
  });

  it('editAccount', () => {
    component.editAccount();
    expect(mockDialog.open).toBeTruthy();
  });

  it('editCell', () => {
    component.editCell();
    expect(mockDialog.open).toBeTruthy();
  });

  it('editAddress', () => {
    component.editAddres();
    expect(mockDialog.open).toBeTruthy();
  });

  it('select city', () => {
    // component.cityCode = "03";
    component.selectCity(city);
    fixture.detectChanges();
    expect(component.cityCode).toBeDefined();
  });

  it('select selectDepartment', () => {
    const fb = new UntypedFormBuilder();
    component.addressForm = fb.group({
      department: ['Antioquia'],
      city: ['Medellin'],
      address: ['calle 123'],
    });
    component.selectDepartment(department);
    expect(component.addressForm.valid).toBeTruthy();
  });

  it('on file change trip valid ced 1', () => {
    const mockFile = new File([''], 'name.jpg', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };

    const service = fixture.debugElement.injector.get(UserService);
    spyOn(service, 'uploadFiles').and.returnValue(of(respUploadFiles));
    component.onFileChangeFiles(mockEvt, 'IdentificationCard1');
    expect(service.uploadFiles).toHaveBeenCalled();
    expect(component.showErrorCed1).toBeFalsy();
    expect(component.showErrorFormatCed1).toBeFalsy();
  });

  it('on file change trip valid ced 2', () => {
    const mockFile = new File([''], 'name.jpg', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };

    const service = fixture.debugElement.injector.get(UserService);
    spyOn(service, 'uploadFiles').and.returnValue(of(respUploadFiles));
    component.onFileChangeFiles(mockEvt, 'IdentificationCard2');
    expect(service.uploadFiles).toHaveBeenCalled();
    expect(component.showErrorCed2).toBeFalsy();
    expect(component.showErrorFormatCed2).toBeFalsy();
  });

  it('on file change trip valid cert', () => {
    const mockFile = new File([''], 'name.jpg', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };

    const service = fixture.debugElement.injector.get(UserService);
    spyOn(service, 'uploadFiles').and.returnValue(of(respUploadFiles));
    component.onFileChangeFiles(mockEvt, 'BankCertificate');
    expect(service.uploadFiles).toHaveBeenCalled();
    expect(component.showErrorCert).toBeFalsy();
    expect(component.showErrorFormatCert).toBeFalsy();
  });

  it('preview img', () => {
    mockUserService.getDocuments.and.returnValue(of(previewImg));
    component.previewDocument('rut');
    expect(mockDialog.open).toBeTruthy();
  });

  it('preview pdf', () => {
    mockUserService.getDocuments.and.returnValue(of(previewpdf));
    component.previewDocument('rut');
    expect(mockDialog.open).toBeTruthy();
  });

  it('preview error', () => {
    mockUserService.getDocuments.and.returnValue(of(previewError));
    component.previewDocument('rut');
    expect(mockDialog.open).toBeTruthy();
  });

});
