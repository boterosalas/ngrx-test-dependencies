import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpasswordformComponent } from './forgotpasswordform.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError, from } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { UtilsService } from 'src/app/services/utils.service';


describe('ForgotpasswordformComponent', () => {
  let component: ForgotpasswordformComponent;
  let fixture: ComponentFixture<ForgotpasswordformComponent>;

  const mockUtilsService = jasmine.createSpyObj("UtilsService", ["showloginForm"]);

  const mockAuthService= jasmine.createSpyObj("AuthService", [
    "forgotPassword"
    ]);

    const Success = {
      state: "Success",
      userMessage: null
    }
  
    const ErrorService = {
      state: "Error",
      userMessage: null
    }

    const InvalidRquest = {
      state: "Error",
      error:{
        userMessage: 'Internal server error'
      }
    }
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ForgotpasswordformComponent
       ],
       imports: [
         ReactiveFormsModule,
         FormsModule,
         TranslateModule.forRoot({}),
         HttpClientTestingModule,
         BrowserAnimationsModule,
         AppMaterialModule,
         RouterTestingModule.withRoutes([]),
         SharedModule
       ],
       providers: [
         {provide: AuthService, useValue: mockAuthService},
         { provide: UtilsService, useValue: mockUtilsService },
       ],
       schemas: [
         NO_ERRORS_SCHEMA
       ]
    })
    .compileComponents();
    mockAuthService.forgotPassword.and.returnValue(of(Success));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpasswordformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('forgot password', () => {
    spyOn(Swal,"fire").and.returnValue(Promise.resolve<any>({
      title: "Se ha enviado un email",
      text: 'texto enviado',
      confirmButtonText: "Aceptar",
      confirmButtonClass: 'accept-forgot-alert-success',
      type: "success"
    }))
    component.forgotPassword();
    component.forgotPaswordForm.controls.Username.setValue('david.betancur@pragma.com.co');
    expect(mockAuthService.forgotPassword).toHaveBeenCalled();
  });

  it('hide forgot', () => {
    component.hideForgot();
    expect(mockUtilsService.showloginForm).toHaveBeenCalled();
  });
  
  
  describe('invalid password', () => {

    beforeEach(function() {
      mockAuthService.forgotPassword.and.returnValue(of(ErrorService));
    });
    

    it('forgot password invalid', () => {
      component.forgotPassword();
      expect(mockAuthService.forgotPassword).toHaveBeenCalled();
    });

  });

  describe('invalid request password', () => {

    beforeEach(function() {
      mockAuthService.forgotPassword.and.returnValue(throwError(InvalidRquest));
    });
    
    it('forgot password invalid request', () => {
      component.forgotPassword();
      component.forgotPaswordForm.controls.Username.setValue('1');
      expect(mockAuthService.forgotPassword).toHaveBeenCalled();
    });

  });
  


});
