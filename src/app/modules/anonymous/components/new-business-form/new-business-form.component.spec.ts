import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBusinessFormComponent } from './new-business-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RecaptchaModule, RecaptchaFormsModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NewBusinessFormComponent', () => {
  let component: NewBusinessFormComponent;
  let fixture: ComponentFixture<NewBusinessFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBusinessFormComponent ],
      imports: [
        TranslateModule.forRoot(),
        AppMaterialModule,
        ReactiveFormsModule,
        FormsModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        {provide: RECAPTCHA_SETTINGS,
        useValue: { siteKey: 'yoursitekey' } as RecaptchaSettings}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBusinessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('Terms and conditions', () => {
    component.showBusinessForm = false;
    component.showTermsBusiness = true;
    component.termsAndConditions();
    expect(component.showBusinessForm).toBeFalsy();
    expect(component.showTermsBusiness).toBeTruthy();
  });

  it('accept', () => {
    component.showBusinessForm = true;
    component.showTermsBusiness = false;
    component.registerForm.controls.acceptTerms.setValue(true);
    component.accept();
    expect(component.showBusinessForm).toBeTruthy();
    expect(component.showTermsBusiness).toBeFalsy();
  });

  it('decline', () => {
    component.showBusinessForm = true;
    component.showTermsBusiness = false;
    component.registerForm.controls.acceptTerms.setValue(null);
    component.decline();
    expect(component.showBusinessForm).toBeTruthy();
    expect(component.showTermsBusiness).toBeFalsy();
  });
  
  it('accept terms true', () => {
    component.acceptTerms = false;
    component.acceptTermsCheck();
    expect(component.acceptTerms).toBeTruthy();
  });
  
  it('accept terms true', () => {
    component.acceptTerms = true;
    component.registerForm.controls.acceptTerms.setValue(null);
    component.acceptTermsCheck();
    expect(component.acceptTerms).toBeFalsy();
  });

  it('register data', () => {
    spyOn(component.registerBusinessEmit, 'emit');
    component.register('Hola');
    expect(component.registerBusinessEmit.emit).toHaveBeenCalled();
  });
  

});
