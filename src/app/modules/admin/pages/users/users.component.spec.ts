import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UsersComponent } from "./users.component";
import { AppMaterialModule } from "src/app/modules/shared/app-material/app-material.module";
import { TranslateModule } from "@ngx-translate/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs/internal/observable/of";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { DialogUserComponent } from "../../components/dialog-user/dialog-user.component";
import { AdminModule } from '../../admin.module';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { UserService } from 'src/app/services/user.service';

describe("UsersComponent", () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  const mockUserService = jasmine.createSpyObj("UserService", [
    "searchUsers"
  ]);

  const mockDialog = jasmine.createSpyObj("MatDialog", ["open"]);
  const mockDialogRef = jasmine.createSpyObj("MatDialogRef", [
    "close",
    "afterClosed",
    "componentInstance",
    "event "
  ]);

  const dataUser = {
    state: "Success",
    userMessage: null,
    objectResponse: [
      {
        userId: 109,
        email: "a@gmail.com",
        firstNames: "David",
        lastNames: "a",
        identification: "56",
        cellphone: "9874563210",
        password: null,
        idType: 2,
        stateId: 4,
        state: "Registrado",
        isEmployeeGrupoExito: true,
        verified: true,
        fileIdentificationCard1: null,
        fileIdentificationCard2: null,
        fileBankCertificate: null,
        bank: null,
        typeBankAccount: null,
        bankAccountNumber: null,
        receiveCommunications: false,
        address: null
      }
    ]
  };

  const dataUsers = [
    {
      userId: 109,
      email: "a@gmail.com",
      firstNames: "a",
      lastNames: "a",
      identification: "56",
      cellphone: "9874563210",
      password: null,
      idType: 2,
      stateId: 4,
      state: "Registrado",
      isEmployeeGrupoExito: true,
      verified: true,
      fileIdentificationCard1: null,
      fileIdentificationCard2: null,
      fileBankCertificate: null,
      bank: null,
      typeBankAccount: null,
      bankAccountNumber: null,
      receiveCommunications: false,
      address: null
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        AppMaterialModule,
        TranslateModule.forRoot({}),
        BrowserAnimationsModule,
        HttpClientTestingModule,
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
        }),
        AdminModule
      ],
      providers: [
        { provide: UserService, useValue: mockUserService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [DialogUserComponent]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    localStorage.setItem('ACCESS_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInVzZXJOYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInJvbGUiOiJDTElDS0VSIiwiZXhwIjoxNTcxODY2MDgwLCJpc3MiOiJwcmFjdGluY2FuZXRjb3JlLmNvbSIsImF1ZCI6IkVzdHVkaWFudGVzIn0.UJahw9VBALxwYizSTppjGJYnr618EKlaFW-d3YLugnU');
    mockUserService.searchUsers.and.returnValue(of(dataUser));
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.dataSource = dataUsers;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("search user", () => {
    component.searchUser("david");
    expect(mockUserService.searchUsers).toHaveBeenCalled();
  });

  it("modal data", () => {
    component.userData(dataUsers);
  });
});
