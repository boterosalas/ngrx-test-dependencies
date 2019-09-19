import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RegisterformComponent } from "./registerform.component";
import { TranslateModule } from "@ngx-translate/core";
import { AppMaterialModule } from "src/app/modules/shared/app-material/app-material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RegisterUserService } from "src/app/services/register-user.service";
import { of, throwError } from "rxjs";
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe("RegisterformComponent", () => {
  let component: RegisterformComponent;
  let fixture: ComponentFixture<RegisterformComponent>;

  const mockRegisterService = jasmine.createSpyObj("RegisterUserService", [
    "idType", "registerUser"
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
    userMessage: null
  }

  const registerInvalid = {
    state: "Error",
    userMessage: null
  }

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
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot({})
      ],
      providers: [
        { provide: RegisterUserService, useValue: mockRegisterService }
      ]
    }).compileComponents();

    mockRegisterService.idType.and.returnValue(of(idType));
    mockRegisterService.registerUser.and.returnValue(of(register));

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
    expect(mockRegisterService.idType).toHaveBeenCalled();
  });

  it("next step", () => {
    component.nextStep();
    expect(component.showTerms).toBeTruthy();
    expect(component.showRegisterForm).toBeFalsy();
  });

  it("accept terms", () => {
    component.acceptTermsCheck();
    expect(component.acceptTerms).toBeTruthy();
  });

  it("back step", () => {
    component.backStep();
    component.showTerms = false;
    component.showRegisterForm = true;
    expect(component.showTerms).toBeFalsy();
    expect(component.showRegisterForm).toBeTruthy();
  });

  it('go to login', () => {
    component.showLogin();
  });
  

  it("register form", () => {
    component.register();
    expect(mockRegisterService.registerUser).toHaveBeenCalled();
  });

  it("remove white space password", () => {
    component.registerForm.controls.password.setValue("1234 5678");
    component.removewhiteSpace();
    expect(component.registerForm.controls.password.value).toBe("12345678");
  });

  it("remove white space Confirm password", () => {
    component.registerForm.controls.confirmPassword.setValue("1234 5678");
    component.removewhiteSpaceConfirm();
    expect(component.registerForm.controls.confirmPassword.value).toBe("12345678");
  });

  describe('register invalid', () => {

    beforeEach(function() {
      mockRegisterService.registerUser.and.returnValue(of(registerInvalid));
    });
    
    it("register invalid", () => {
      component.register();
      expect(mockRegisterService.registerUser).toHaveBeenCalled();
    });

  });

  describe('invalid request', () => {

    beforeEach(function() {
      mockRegisterService.registerUser.and.returnValue(throwError({status: 500}));
    });
    
    it("invalid request", () => {
      component.register();
      expect(mockRegisterService.registerUser).toHaveBeenCalled();
    });

  });

});
