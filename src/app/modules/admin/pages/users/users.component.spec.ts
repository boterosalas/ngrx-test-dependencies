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
import { LinksService } from 'src/app/services/links.service';
import * as moment from 'moment';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { DialogEditComponent } from 'src/app/modules/clicker/components/dialog-edit/dialog-edit.component';
import { UserService } from 'src/app/services/user.service';
moment.locale('es');

describe("UsersComponent", () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  const mockLinksService = jasmine.createSpyObj("LinksService", [
    "searchUsers",
    "getUsersExcel"
  ]);

  const mockDialog = jasmine.createSpyObj("MatDialog", ["open"]);
  const mockDialogRef = jasmine.createSpyObj("MatDialogRef", [
    "close",
    "afterClosed",
    "componentInstance",
    "event "
  ]);

  const mockUserService = jasmine.createSpyObj("UserService", ["updateUserEmail"]);

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

  const getUserExcel = {
    state: "Success",
    userMessage: 'se ha enviado un correo a test@h.com',
    objectResponse: [
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

  let user =  {
    userId: '1',
    email: 'david.betancur@pragma.com.co',
    templateEmail: [],
    title: 'Actualizar correo'
  }

  const resp = {
    state: "Success",
    userMessage: "se ha actualizado el email",
    objectResponse: []
  };

  const respError = {
    state: "Error",
    userMessage: "No se ha actualizado el email",
    objectResponse: []
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditComponent],
      imports: [
        AppMaterialModule,
        TranslateModule.forRoot({}),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        NgxDaterangepickerMd,
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
        { provide: LinksService, useValue: mockLinksService },
        { provide: UserService, useValue: mockUserService },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [DialogUserComponent, DialogEditComponent]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    localStorage.setItem('ACCESS_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInVzZXJOYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInJvbGUiOiJDTElDS0VSIiwiZXhwIjoxNTcxODY2MDgwLCJpc3MiOiJwcmFjdGluY2FuZXRjb3JlLmNvbSIsImF1ZCI6IkVzdHVkaWFudGVzIn0.UJahw9VBALxwYizSTppjGJYnr618EKlaFW-d3YLugnU');
    mockLinksService.searchUsers.and.returnValue(of(dataUser));
    mockLinksService.getUsersExcel.and.returnValue(of(getUserExcel));
    mockUserService.updateUserEmail.and.returnValue(of(resp));
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.dataSource = dataUsers;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it('updateEmail', () => {
    component.updateEmail();
    expect(mockUserService.updateUserEmail).toHaveBeenCalled();
  });
  
  it('updateEmail', () => {
    component.updateEmail();
    expect(mockUserService.updateUserEmail).toHaveBeenCalled();
  });
  

  it("search user", () => {
    component.searchUser("david");
    expect(mockLinksService.searchUsers).toHaveBeenCalled();
  });

  it("modal data", () => {
    component.userData(dataUsers);
    expect(dataUsers).not.toBeUndefined();
  });

  it('pagination', () => {
    component.pagination({previousPageIndex: 1, pageIndex: 0, pageSize: 20, length: 5});
    expect(mockLinksService.searchUsers).toHaveBeenCalled();
  });

  it('getUsersExcel', () => {
      const nativeElement = fixture.nativeElement;
      const input = nativeElement.querySelector('input');
      input.dispatchEvent(new Event('click'));
      const nativeElementDate = fixture.nativeElement;
      const dateStart = nativeElementDate.querySelector('.today');
      dateStart.dispatchEvent(new Event('click'));
      const nativeElementbtn = fixture.nativeElement;
      const btn = nativeElementbtn.querySelector('.btn');
      btn.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      component.getUserExcel();
      expect(mockLinksService.getUsersExcel).toHaveBeenCalled();
  });

  it('change email', () => {
    component.changeEmail();
    expect(component.changeEmail).toBeTruthy();
  });
  
  it('open modal', () => {
    component.userEmail(user);
    expect(user).not.toBeUndefined();
  });

  it('update email', () => {
    component.updateEmail();
    expect(mockUserService.updateUserEmail).toHaveBeenCalled();
  });

});
