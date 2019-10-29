import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RecoverpasswordformComponent } from './recoverpasswordform.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { RecoverpasswordService } from 'src/app/services/recoverpassword.service';
import { of, throwError } from 'rxjs';
import { HomeComponent } from 'src/app/modules/clicker/pages/home/home.component';
import { AnonymousModule } from '../../anonymous.module';
import { ClickerModule } from 'src/app/modules/clicker/clicker.module';

describe('RecoverpasswordformComponent', () => {
  let component: RecoverpasswordformComponent;
  let fixture: ComponentFixture<RecoverpasswordformComponent>;

  const mockRecoverpasswordService= jasmine.createSpyObj("RecoverpasswordService", [
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
        RecoverpasswordformComponent,
       ],
       imports: [
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot({}),
        HttpClientTestingModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        ClickerModule,
        RouterTestingModule.withRoutes([
          { path: 'inicio', component: HomeComponent},
          { path: 'clicker', component: HomeComponent},
        ]),
       ],
       providers: [
         {provide: RecoverpasswordService, useValue: mockRecoverpasswordService}
       ]
    })
    .compileComponents();
    mockRecoverpasswordService.recoverPassword.and.returnValue(of(Success));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverpasswordformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("remove white space password", () => {
    component.recoverPasswordForm.controls.password.setValue("1234 5678");
    component.removewhiteSpaceRecover();
    expect(component.recoverPasswordForm.controls.password.value).toBe("12345678");
  });

  it("remove white space Confirm password", () => {
    component.recoverPasswordForm.controls.confirmPassword.setValue("1234 5678");
    component.removewhiteSpaceConfirmRecover();
    expect(component.recoverPasswordForm.controls.confirmPassword.value).toBe("12345678");
  });

  it('recover password', () => {
    component.code= "123456";
    component.recoverPasswordForm.controls.password.setValue('123456');
    component.recoverPasswordForm.controls.confirmPassword.setValue('123456');
    component.recoverPassword();
    expect(mockRecoverpasswordService.recoverPassword).toHaveBeenCalled();
  });


  describe('Inavlid recover password', () => {


    beforeEach(function() {
      mockRecoverpasswordService.recoverPassword.and.returnValue(of(ErrorService));
    });

    it('recover password', () => {
      component.code= "123456";
      component.recoverPasswordForm.controls.password.setValue('1234567');
      component.recoverPasswordForm.controls.confirmPassword.setValue('123456');
      component.recoverPassword();
      expect(mockRecoverpasswordService.recoverPassword).toHaveBeenCalled();
    });

  });

  describe('Inavlid request', () => {

    beforeEach(function() {
      mockRecoverpasswordService.recoverPassword.and.returnValue(throwError(InvalidRquest));
    });

    it('recover password invalid request', () => {
      component.code= "123456";
      component.recoverPasswordForm.controls.password.setValue('1234567');
      component.recoverPasswordForm.controls.confirmPassword.setValue('123456');
      component.recoverPassword();
      expect(mockRecoverpasswordService.recoverPassword).toHaveBeenCalled();
    });

  });
  
  
});
