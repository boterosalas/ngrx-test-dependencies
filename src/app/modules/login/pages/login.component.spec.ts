import { LoginComponent } from "./login.component";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {
  TranslateModule
} from "@ngx-translate/core";
import { AppMaterialModule } from "src/app/modules/shared/app-material/app-material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from 'src/app/services/user.service';
import { of, throwError } from 'rxjs';

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const mockUserService= jasmine.createSpyObj("UserService", ["activateProfile"]);

  let data = {
    state: 'Success',
    email: 'david.betancur@pragma.com.co'
  }

  let dataError = {
    state: 'Error',
    email: 'david.betancur@pragma.com.co',
    userMessage: 'Activación erronea'
  }

  let invalidRequest = {
    state: {
      error: 'Error'
    },
    error: 'Peticion invalida',
    email: 'david.betancur@pragma.com.co'
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        TranslateModule,
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
        TranslateModule.forRoot({})
      ],
      providers: [
        { provide: UserService, useValue: mockUserService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    mockUserService.activateProfile.and.returnValue(of(data));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("show register", () => {
    component.showRegister();
  });

  describe('Error activation', () => {

    beforeEach(() => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      mockUserService.activateProfile.and.returnValue(of(dataError));
    });

    it('error activation', () => {
      component.activateUser();
      expect(mockUserService.activateProfile).toHaveBeenCalled();
    });
  });

  describe('invalid request', () => {

    beforeEach(() => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      mockUserService.activateProfile.and.returnValue(throwError(invalidRequest));
    });

    it('invalid request', () => {
      component.activateUser();
      expect(mockUserService.activateProfile).toHaveBeenCalled();
    });
  });
  
  
});
