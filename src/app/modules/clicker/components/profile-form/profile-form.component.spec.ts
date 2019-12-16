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

describe('ProfileFormComponent', () => {
  let component: ProfileFormComponent;
  let fixture: ComponentFixture<ProfileFormComponent>;

  const mockDialog = jasmine.createSpyObj("MatDialog", ["open"]);

  const mockMasterDataService = jasmine.createSpyObj("MasterDataService", [
    "getDepartments",
    "getBanks"
  ]);

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileFormComponent, DialogEditComponent ],
      imports: [
        TranslateModule.forRoot({}),
        ReactiveFormsModule,
        AppMaterialModule,
        FormsModule,
        HttpClientTestingModule,
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
        { provide: MasterDataService, useValue: mockMasterDataService }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [DialogEditComponent]
      }
    })
    .compileComponents();
    mockMasterDataService.getDepartments.and.returnValue(of(dataDepartments));
    mockMasterDataService.getBanks.and.returnValue(of(banks));
  }));

  beforeEach(() => {
    localStorage.setItem('ACCESS_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInVzZXJOYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInJvbGUiOiJDTElDS0VSIiwiZXhwIjoxNTcxODY2MDgwLCJpc3MiOiJwcmFjdGluY2FuZXRjb3JlLmNvbSIsImF1ZCI6IkVzdHVkaWFudGVzIn0.UJahw9VBALxwYizSTppjGJYnr618EKlaFW-d3YLugnU');
    fixture = TestBed.createComponent(ProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
  });

  it("select selectDepartment", () => {
    let fb = new FormBuilder();
    component.addressForm = fb.group({
      department: ["Antioquia"],
      city: ["Medellin"],
      address: ["calle 123"]
    });
    component.selectDepartment(department);
  });

  // it('editUser', () => {
  //   component.userId = '123445';
  //   component.profileForm.controls.name.setValue('test');
  //   component.profileForm.controls.lastName.setValue('test');
  //   component.profileFormCell.controls.phone.setValue('123456789');
  //   component.editUser();
  // });

});
