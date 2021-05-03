import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUserComponent } from './dialog-user.component';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSlideToggleModule, MatMenuModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';

describe('DialogUserComponent', () => {
  let component: DialogUserComponent;
  let fixture: ComponentFixture<DialogUserComponent>;
  const mockUserService = jasmine.createSpyObj("UserService", [
    "getHojaVida", "updateInfoClicker", "getStatusVerification", "postUpdateResponseAccountBank"
  ]);
  const dialogMock = {
    close: () => { }
  };
  const getUserExcel = {
    state: "Success",
    userMessage: 'se ha enviado un correo a test@h.com',
    objectResponse: [
      {
        negocio: "Almacenes Éxito",
        linksgenerados: "332",
        linkclickeados: "200",
        comisiones: 2222,
        ventas: 2233,
        proximopago: 30000,
        ultimovalorpagado: 2000,
        ultimafechapago: "20/20/2021",
        totalventas: 200000,
        totalcomisiones: 200000,
        totallinkclickeados: "232",
        totallinkgenerados: "223"
      }
    ]
  };
  const getStatusVerification = {
    state: "Success",
    userMessage: null,
    objectResponse: [
      {id: 4252, code: "NOTVERIFIED", value: "No verificada"},
      {id: 4253, code: "INPROGRESS", value: "En proceso de verificación"},
      {id: 4254, code: "VERIFIED", value: "Cuenta Verificada"},
      {id: 4255, code: "REJECTED", value: "Cuenta rechazada"}
    ]
  };
  const postUpdateResponse = {
    state: "Success", 
    userMessage: "Se ha guardado satisfactoriamente", 
    objectResponse: null
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogUserComponent],
      imports: [
        TranslateModule.forRoot(),
        MatSlideToggleModule,
        SharedModule,
        MatMenuModule,
        AppMaterialModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
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
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: UserService, useValue: mockUserService },
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents();
    mockUserService.getHojaVida.and.returnValue(of(getUserExcel));
    mockUserService.updateInfoClicker.and.returnValue(of(getUserExcel));
    mockUserService.getStatusVerification.and.returnValue(of(getStatusVerification));
    mockUserService.postUpdateResponseAccountBank.and.returnValue(of(postUpdateResponse));
  }));

  beforeEach(() => {
    localStorage.setItem('ACCESS_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInVzZXJOYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInJvbGUiOiJDTElDS0VSIiwiZXhwIjoxNTcxODY2MDgwLCJpc3MiOiJwcmFjdGluY2FuZXRjb3JlLmNvbSIsImF1ZCI6IkVzdHVkaWFudGVzIn0.UJahw9VBALxwYizSTppjGJYnr618EKlaFW-d3YLugnU');
    fixture = TestBed.createComponent(DialogUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('getStatusVerificationUser', () => {
  //   component.getStatusVerificationUser();
  //   expect(mockUserService.getStatusVerification).toHaveBeenCalled();
  // });

  it('change status', () => {
    spyOn(component.state, 'emit');
    component.changeStatus();
    expect(component.state.emit).toHaveBeenCalled();
  });

  it('change comunications', () => {
    spyOn(component.comunications, 'emit');
    component.changeComunications();
    expect(component.comunications.emit).toHaveBeenCalled();
  });

  it('change verified', () => {
    spyOn(component.verified, 'emit');
    component.changeVerified();
    expect(component.verified.emit).toHaveBeenCalled();
  });

  it('downloadSelectedFiles', () => {
    component.downloadSelectedFiles();
    let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.onNoClick();
    expect(spy).toHaveBeenCalled();
  });

  it('changeTabs', () => {
    component.changeTabs(2);
    component.saveInfoPersonal();
    component.saveRejectionMessage();
    component.enableDisabledEditMessage();
    component.onNoClickEdit();
    expect(component.selectedTab).toBe(2)
    expect(component.pad(2)).toBe("02")
  });
});
