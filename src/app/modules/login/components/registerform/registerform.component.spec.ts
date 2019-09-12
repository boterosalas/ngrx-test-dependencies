import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterformComponent } from './registerform.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';

describe('RegisterformComponent', () => {
  let component: RegisterformComponent;
  let fixture: ComponentFixture<RegisterformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterformComponent ],
      imports: [
        TranslateModule,
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterModule,
        TranslateModule.forRoot({})
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('next step', () => {
    component.nextStep();
    expect(component.showTerms).toBeTruthy();
    expect(component.showRegisterForm).toBeFalsy();
  });

  it('next step', () => {
    component.acceptTermsCheck();
    expect(component.acceptTerms).toBeTruthy();
  });

  it('register form', () => {
    component.registerForm.controls.name.setValue('David');
    component.registerForm.controls.lastName.setValue('Betancur Jaramillo');
    component.registerForm.controls.idType.setValue('C.C');
    component.registerForm.controls.id.setValue('1039447744');
    component.registerForm.controls.phone.setValue('3015480966');
    component.registerForm.controls.email.setValue('test@test.com');
    component.registerForm.controls.password.setValue('12345678');
    component.registerForm.controls.confirmPassword.setValue('12345678');
    component.register();
    expect(component.registerForm.valid).toBeTruthy();
  });
  
  

});
