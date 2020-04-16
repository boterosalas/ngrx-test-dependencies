import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFormComponent } from './profile-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DialogComponent } from 'src/app/modules/shared/components/dialog/dialog.component';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';
import { MatDialogRef } from '@angular/material';
import { MasterDataService } from 'src/app/services/master-data.service';
import { of } from 'rxjs/internal/observable/of';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { UserService } from 'src/app/services/user.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


class MockUserService extends UserService {
  private subscription: Subscription = new Subscription();

  userInfo$ = new BehaviorSubject<any>({
    firstNames: 'David'
  });

}

describe('ProfileFormComponent', () => {
  let component: ProfileFormComponent;
  let fixture: ComponentFixture<ProfileFormComponent>;

  const mockDialog = jasmine.createSpyObj("MatDialog", ["open"]);

  const mockUserService = jasmine.createSpyObj("UserService", ["getuserdata"]);

  const mockMasterDataService = jasmine.createSpyObj("MasterDataService", [
    "getDepartments",
    "getBanks"
  ]);

  const mockAuthService= jasmine.createSpyObj("AuthService", [
    "changePassword"
    ]);

  let dataUserC = {
    managedPayments : true,
    isEmployeeUser: true
  }

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

let banks = [
  {Id: 1, code: "01", description: "BANCO AGRARIO"}
]

const resp = {
  state: "Success",
  userMessage: "se ha actualizado el usuario",
  objectResponse: []
};

const ErrorUptade = {
  state: "Success",
  userMessage: "No se ha actualizado el usuario",
  objectResponse: []
};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileFormComponent, DialogEditComponent ],
      imports: [
        TranslateModule.forRoot({}),
        ReactiveFormsModule,
        AppMaterialModule,
        FormsModule,
        HttpClientTestingModule,
        AppMaterialModule,
        MatPasswordStrengthModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([]),
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem('ACCESS_TOKEN');
            },
            throwNoTokenError: true,
            whitelistedDomains: [],
            blacklistedRoutes: []
          }
        })
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialog },
        { provide: MasterDataService, useValue: mockMasterDataService },
        { provide: UserService, useClass: MockUserService },
        {provide: AuthService, useValue: mockAuthService}
      ],
      schemas: [
        // NO_ERRORS_SCHEMA
      ],
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [DialogEditComponent]
      }
    })
    .compileComponents();
    mockMasterDataService.getDepartments.and.returnValue(of(dataDepartments));
    mockUserService.getuserdata.and.returnValue(of(dataUserC));
    mockMasterDataService.getBanks.and.returnValue(of(banks));
    mockAuthService.changePassword.and.returnValue(of(resp));
  }));

  beforeEach(() => {
    localStorage.setItem('ACCESS_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInVzZXJOYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInJvbGUiOiJDTElDS0VSIiwiZXhwIjoxNTcxODY2MDgwLCJpc3MiOiJwcmFjdGluY2FuZXRjb3JlLmNvbSIsImF1ZCI6IkVzdHVkaWFudGVzIn0.UJahw9VBALxwYizSTppjGJYnr618EKlaFW-d3YLugnU');
    fixture = TestBed.createComponent(ProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.name = 'David';
    component.lastName = 'Betancur';
    component.email = 'test@test.com'
    component.phone = '3005490912';
    component.id = '12345';
    component.address = 'calle falsa 123';
    component.department  = 'Antioquia';
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
    let service = fixture.debugElement.injector.get(UserService);
    spyOn(service, 'getuserdata').and.returnValue(of(dataUserC));
    component.getUserData();
    expect(service.getuserdata).toHaveBeenCalled();
  });

  it('update account', () => {
    let service = fixture.debugElement.injector.get(UserService);
    spyOn(service, 'changeBankInformation').and.returnValue(of(resp));
    component.updateAccount();
    expect(service.changeBankInformation).toHaveBeenCalled();
  });
  
  it('change address', () => {
    let service = fixture.debugElement.injector.get(UserService);
    spyOn(service, 'updateUser').and.returnValue(of(resp));
    component.changeAddress();
    expect(service.updateUser).toHaveBeenCalled();
  });
  

  it('update User', () => {
    let service = fixture.debugElement.injector.get(UserService);
    spyOn(service, 'updateUser').and.returnValue(of(resp));
    component.editUser();
    expect(service.updateUser).toHaveBeenCalled();
  });

  it('showAccount', () => {
    let service = fixture.debugElement.injector.get(UserService);
    spyOn(service, 'getBankAccountNumber').and.returnValue(of(resp));
    component.showAccount();
    expect(service.getBankAccountNumber).toHaveBeenCalled();
  });
  
  it('changePasswordUser', () => {
    component.changePasswordUser();
    expect( mockAuthService.changePassword).toHaveBeenCalled();
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

  it('changePassword', () => {
    component.changePassword();
    expect(mockDialog.open).toBeTruthy();
  });

  it("select city", () => {
    component.cityCode = "01";
    component.selectCity("Medellín");
    fixture.detectChanges();
    expect(component.cityCode).toBeUndefined();
  });

  it("select selectDepartment", () => {
    let fb = new FormBuilder();
    component.addressForm = fb.group({
      department: ["Antioquia"],
      city: ["Medellin"],
      address: ["calle 123"]
    });
    component.selectDepartment(department);
    expect(component.addressForm.valid).toBeTruthy();
  });

});
