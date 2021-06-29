import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { TranslateModule } from "@ngx-translate/core";
import { AppMaterialModule } from "src/app/modules/shared/app-material/app-material.module";
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of, throwError, BehaviorSubject } from "rxjs";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { JwtModule } from "@auth0/angular-jwt";
import { MasterDataService } from "src/app/services/master-data.service";
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { PaymentInfoComponent } from './payment-info.component';

class MockUserService extends UserService {

  userInfo$ = new BehaviorSubject<any>({
    userId: '721',
    identification: '1002546856',
    firstNames: 'David',
    lastNames: 'Betancur',
    cellphone: '3000000000'
  });

}

describe("('PaymentInfoComponent', ", () => {
  let component: PaymentInfoComponent;
  let fixture: ComponentFixture<PaymentInfoComponent>;
  const mockMasterDataService = jasmine.createSpyObj("MasterDataService", [
    "getDepartments",
    "getBanks"
  ]);

  const mockUserService = jasmine.createSpyObj("UserService", [
    "uploadFiles"
  ]);

  const idType = [
    {
      id: 1,
      value: "Cédula de ciudadania"
    },
    {
      id: 2,
      value: "Cédula de extranjería"
    },
    {
      id: 3,
      value: "NIT"
    }
  ];

  const register = {
    state: "Success",
    objectResponse: {
      userId: 0,
      Email: "eisner.puerta@pragma.com.co",
      FirstNames: "Eisner",
      LastNames: "Puerta Carrillo",
      Identification: "1050955208",
      Cellphone: "3105009039",
      Password: "RXBjMTUyNygpOw==",
      IdType: 1,
      department: "Antioquia",
      municipality: "Medellin",
      stateId: 1,
      state: "",
      isEmployeeGrupoExito: false,
      verified: false,
      fileIdentificationCard1:
        "iVBORw0KGgoAAAANSUhEUgAAACAAAAAqCAIAAABdg87FAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAySURBVFhH7c0xDQAgAAQx/Jt+JHRiILka6NljBVRABVRABVRABVRABVRABVRABfR7sF3ODrEiRHEThAAAAABJRU5ErkJggg==",
      fileIdentificationCard2:
        "iVBORw0KGgoAAAANSUhEUgAAACAAAAAqCAIAAABdg87FAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAySURBVFhH7c0xDQAgAAQx/Jt+JHRiILka6NljBVRABVRABVRABVRABVRABVRABfR7sF3ODrEiRHEThAAAAABJRU5ErkJggg==",
      fileBankCertificate:
        "iVBORw0KGgoAAAANSUhEUgAAACAAAAAqCAIAAABdg87FAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAySURBVFhH7c0xDQAgAAQx/Jt+JHRiILka6NljBVRABVRABVRABVRABVRABVRABfR7sF3ODrEiRHEThAAAAABJRU5ErkJggg==",
      // fileRUT:
      //   "iVBORw0KGgoAAAANSUhEUgAAACAAAAAqCAIAAABdg87FAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAySURBVFhH7c0xDQAgAAQx/Jt+JHRiILka6NljBVRABVRABVRABVRABVRABVRABfR7sF3ODrEiRHEThAAAAABJRU5ErkJggg==",
      bank: "Bancolombia",
      typeBankAccount: "Ahorros",
      bankAccountNumber: "MTIzNDU2Nzg5",
      receiveCommunications: true,
      address: "Calle 2 #55-56"
    },
    userMessage: null
  };

  const registerInvalid = {
    state: "Error",
    userMessage: null
  };

  const InvalidRquest = {
    state: "Error",
    error: {
      userMessage: "Internal server error"
    }
  };

  let dataBanks = {
    state: "Success",
    userMessage: "",
    objectResponse: [
      {
        Id: 1,
        code: "BANCOLOMBIA",
        description: " Bancolombia"
      },
      {
        Id: 2,
        code: "DAVIVIENDA",
        description: " Davivienda"
      }
    ]
  };

  let dataDepartments = {
    state: "Success",
    userMessage: "",
    objectResponse: [
      {
        Id: 1,
        code: "01",
        description: "Bolivar",
        municipalities: [
          {
            Id: 1,
            code: "01",
            description: "Turbaco",
            idDeparment: 1
          },
          {
            Id: 2,
            code: "02",
            description: "Cartagena",
            idDeparment: 1
          }
        ]
      },
      {
        Id: 2,
        code: "02",
        description: "Antioquia",
        municipalities: [
          {
            Id: 3,
            code: "03",
            description: "Medellín",
            idDeparment: 2
          },
          {
            Id: 4,
            code: "04",
            description: "Bello",
            idDeparment: 2
          }
        ]
      }
    ]
  };

  let department = {
    Id: 1,
    code: "01",
    description: "Bolivar",
    municipalities: [
      {
        Id: 1,
        code: "01",
        description: "Turbaco",
        idDeparment: 1
      },
      {
        Id: 2,
        code: "02",
        description: "Cartagena",
        idDeparment: 1
      }
    ]
  };

  let mockRouter = {
    navigate: jasmine.createSpy("navigate")
  };

  let validateEmployeeSuccess = {
    state: "Success",
    userMessage: null,
    objectResponse: true
  };

  let validateEmployeeFail = {
    state: "Success",
    userMessage: null,
    objectResponse: false
  };

  const resp = {
    state: "Success",
    userMessage: "se ha actualizado el usuario",
    objectResponse: []
  };

  const respUploadFiles = {
    state: "Success",
    userMessage: "se ha guardado el archivo",
    objectResponse: null
  };
  

  beforeEach(async(() => {
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
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot({}),
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem("ACCESS_TOKEN");
            },
            throwNoTokenError: true,
            whitelistedDomains: [],
            blacklistedRoutes: []
          }
        })
      ],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: Router, useValue: mockRouter },
        { provide: MasterDataService, useValue: mockMasterDataService }
      ]
    }).compileComponents();

    // mockUserService.idType.and.returnValue(of(idType));
    // mockUserService.registerUser.and.returnValue(of(register));
    mockUserService.uploadFiles.and.returnValue(of(respUploadFiles))
    mockMasterDataService.getBanks.and.returnValue(of(dataBanks));
    mockMasterDataService.getDepartments.and.returnValue(of(dataDepartments));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentInfoComponent);
    component = fixture.componentInstance;
    // mockUserService.validateEmployee.and.returnValue(
    //   of(validateEmployeeSuccess)
    // );
    window['dataLayer'] = [];
    fixture.detectChanges();
  });

  // it("should create", () => {
  //   expect(component).toBeTruthy();
  //   expect(mockUserService.idType).toHaveBeenCalled();
  // });

  it('send sendPayment', () => {
    let service = fixture.debugElement.injector.get(UserService);
    spyOn(service, 'updateUser').and.returnValue(of(resp));
    component.sendPayment();
    expect(service.updateUser).toHaveBeenCalled();
  });
  

  

  it("on file change trip valid ced 1", () => {
    const mockFile = new File([""], "name.jpg", { type: "text/html" });
    const mockEvt = { target: { files: [mockFile] } };
    component.onFileChangeFiles(mockEvt, "IdentificationCard1");
    expect(component.showErrorCed1).toBeFalsy();
    expect(component.showErrorFormatCed1).toBeFalsy();
  });

  it("on file change trip valid ced 2", () => {
    const mockFile = new File([""], "name.jpg", { type: "text/html" });
    const mockEvt = { target: { files: [mockFile] } };
    component.onFileChangeFiles(mockEvt, "IdentificationCard2");
    expect(component.showErrorCed2).toBeFalsy();
    expect(component.showErrorFormatCed2).toBeFalsy();
  });

  it("on file change trip valid cert", () => {
    const mockFile = new File([""], "name.jpg", { type: "text/html" });
    const mockEvt = { target: { files: [mockFile] } };
    component.onFileChangeFiles(mockEvt, "BankCertificate");
    expect(component.showErrorCert).toBeFalsy();
    expect(component.showErrorFormatCert).toBeFalsy();
  });

  describe("register clicker", () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(PaymentInfoComponent);
      component = fixture.componentInstance;
      // mockUserService.validateEmployee.and.returnValue(
      //   of(validateEmployeeFail)
      // );
      fixture.detectChanges();
    });

  });

  it("select city", () => {
    component.cityCode = "01";
    component.selectCity("Medellín");
    expect(component.selectCity).toBeTruthy();
  });

  it("select selectDepartment", () => {
    let fb = new FormBuilder();
    component.externalForm =  fb.group({
      department: ["Antioquia"],
      city: ["Medellin"],
      address:  [""],
      bank:  [""],
      typeAccount:  [""],
      numberAccount: [""],
      ced1: [null],
      ced2: [null],
      cert: [null],
      // RUT: [null],
    });
    component.selectDepartment(department);
    expect(department).not.toBeUndefined();
  });

  it("register form", () => {
    let fb = new FormBuilder();
    component.externalForm =  fb.group({
      department: [""],
      city: [""],
      address:  [""],
      bank:  [""],
      typeAccount:  [""],
      numberAccount: [""],
      ced1: [null],
      ced2: [null],
      cert: [null],
      // RUT: [null],
    });

    
    component.departmentCode = '01';
    component.cityCode = '01';
    component.externalForm.controls.bank.setValue('Bancolombia');
    component.fileIdentificationCard1 = 'image1';
    component.fileIdentificationCard2 = 'image2';
    component.fileBankCertificate = 'cert';
    // component.fileRUT = 'RUT';
    component.externalForm.controls.numberAccount.setValue('123456');
    component.externalForm.controls.typeAccount.setValue('Ahorros');
    component.externalForm.controls.address.setValue('calle falsa 123');
    expect(component.externalForm.valid).toBeTruthy();
  });

  it('checkDepartment', () => {
    component.externalForm.controls.department.setValue({code:'05'});
    component.checkDepartment();
    expect(component.externalForm.controls.department.hasError).toBeTruthy();
  });

  it('checkCity', () => {
    component.checkCity();
    expect(component.externalForm.controls.city.hasError).toBeTruthy();
  });
  

  describe("register invalid", () => {
    beforeEach(() => {
      window['dataLayer'] = [];
      // mockUserService.registerUser.and.returnValue(of(registerInvalid));
    });

  });

  describe("invalid request", () => {
    beforeEach(function() {
      // mockUserService.registerUser.and.returnValue(throwError(InvalidRquest));
    });

  });
});
