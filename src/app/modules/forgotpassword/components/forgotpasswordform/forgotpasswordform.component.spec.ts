import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpasswordformComponent } from './forgotpasswordform.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotpasswordService } from 'src/app/services/forgotpassword.service';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ForgotpasswordformComponent', () => {
  let component: ForgotpasswordformComponent;
  let fixture: ComponentFixture<ForgotpasswordformComponent>;

  const mockForgotpasswordService= jasmine.createSpyObj("ForgotpasswordService", [
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
       ],
       providers: [
         {provide: ForgotpasswordService, useValue: mockForgotpasswordService}
       ],
       schemas: [
         NO_ERRORS_SCHEMA
       ]
    })
    .compileComponents();
    mockForgotpasswordService.forgotPassword.and.returnValue(of(Success));
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
    component.forgotPassword();
    component.forgotPaswordForm.controls.Username.setValue('david.betancur@pragma.com.co');
    expect(mockForgotpasswordService.forgotPassword).toHaveBeenCalled();
  });

  it("remove white space email", () => {
    component.forgotPaswordForm.controls.Username.setValue("dav id.betancur@pragma.com.co");
    component.removewhiteSpaceEmail();
    expect(component.forgotPaswordForm.controls.Username.value).toBe("david.betancur@pragma.com.co");
  });
  
  describe('invalid password', () => {

    beforeEach(function() {
      mockForgotpasswordService.forgotPassword.and.returnValue(of(ErrorService));
    });
    

    it('forgot password invalid', () => {
      component.forgotPassword();
      expect(mockForgotpasswordService.forgotPassword).toHaveBeenCalled();
    });

  });

  describe('invalid request password', () => {

    beforeEach(function() {
      mockForgotpasswordService.forgotPassword.and.returnValue(throwError({status: 500}));
    });
    
    it('forgot password invalid request', () => {
      component.forgotPassword();
      component.forgotPaswordForm.controls.Username.setValue('1');
      expect(mockForgotpasswordService.forgotPassword).toHaveBeenCalled();
    });

  });
  


});
