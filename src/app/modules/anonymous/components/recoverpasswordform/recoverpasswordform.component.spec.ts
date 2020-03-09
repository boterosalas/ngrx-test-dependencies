import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RecoverpasswordformComponent } from './recoverpasswordform.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { ClickerModule } from 'src/app/modules/clicker/clicker.module';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { HomeComponent } from '../../pages/home/home.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AnonymousModule } from '../../anonymous.module';

describe('RecoverpasswordformComponent', () => {
  let component: RecoverpasswordformComponent;
  let fixture: ComponentFixture<RecoverpasswordformComponent>;

  const mockAuthService= jasmine.createSpyObj("AuthService", [
  "recoverPassword"
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
       ],
       imports: [
        ReactiveFormsModule,
        AnonymousModule,
        FormsModule,
        TranslateModule.forRoot({}),
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatPasswordStrengthModule,
        AppMaterialModule,
        ClickerModule,
        MatPasswordStrengthModule,
        SharedModule,
        RouterTestingModule.withRoutes([
          { path: 'inicio', component: HomeComponent},
          { path: 'clicker', component: HomeComponent},
        ]),
       ],
       providers: [
         {provide: AuthService, useValue: mockAuthService}
       ]
    })
    .compileComponents();
    mockAuthService.recoverPassword.and.returnValue(of(Success));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverpasswordformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('recover password', () => {
    spyOn(Swal,"fire").and.returnValue(Promise.resolve<any>({
      title: "Se ha enviado un email",
      text: 'texto enviado',
      confirmButtonText: "Aceptar",
      confirmButtonClass: 'accept-forgot-alert-success',
      type: "success"
    }));
    component.code= "123456";
    component.recoverPasswordForm.controls.password.setValue('123456');
    component.recoverPasswordForm.controls.confirmPassword.setValue('123456');
    component.recoverPassword();
    expect(mockAuthService.recoverPassword).toHaveBeenCalled();
  });


  describe('Inavlid recover password', () => {


    beforeEach(function() {
      mockAuthService.recoverPassword.and.returnValue(of(ErrorService));
    });

    it('recover password', () => {
      component.code= "123456";
      component.recoverPasswordForm.controls.password.setValue('1234567');
      component.recoverPasswordForm.controls.confirmPassword.setValue('123456');
      component.recoverPassword();
      expect(mockAuthService.recoverPassword).toHaveBeenCalled();
    });

  });

  describe('Inavlid request', () => {

    beforeEach(function() {
      mockAuthService.recoverPassword.and.returnValue(throwError(InvalidRquest));
    });

    it('recover password invalid request', () => {
      component.code= "123456";
      component.recoverPasswordForm.controls.password.setValue('1234567');
      component.recoverPasswordForm.controls.confirmPassword.setValue('123456');
      component.recoverPassword();
      expect(mockAuthService.recoverPassword).toHaveBeenCalled();
    });

  });
  
  
});
