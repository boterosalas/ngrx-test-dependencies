import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { ModalGenericComponent } from '../modal-generic/modal-generic.component';

import { DocumentTypeAndNumberComponent } from './document-type-and-number.component';

describe('DocumentTypeAndNumberComponent', () => {
  let component: DocumentTypeAndNumberComponent;
  let fixture: ComponentFixture<DocumentTypeAndNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentTypeAndNumberComponent],
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot({}),
        AppMaterialModule,
        BrowserAnimationsModule,
        BrowserDynamicTestingModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DocumentTypeAndNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call initSocialNetworkRegisterForm when onInit', () => {
    const initSocialNetworkRegisterFormSpy = spyOn(component, 'initSocialNetworkRegisterForm').and.callFake(() => true);
    component.ngOnInit();
    expect(initSocialNetworkRegisterFormSpy).toHaveBeenCalled();
  });

  it('Should init socialNetworkRegisterForm', () => {
    component.initSocialNetworkRegisterForm();
    expect(component.socialNetworkRegisterForm).toBeTruthy();
  });

  it('Should call socialNetworkRegisterForm.markAllAsTouched and not emit', () => {
    const markAllAsTouchedSpy = spyOn(component.socialNetworkRegisterForm, 'markAllAsTouched').and.callFake(() => true);
    const emitSpy = spyOn(component.values, 'emit').and.callFake(() => true);
    component.register();
    expect(markAllAsTouchedSpy).toHaveBeenCalled();
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('Should call socialNetworkRegisterForm.markAllAsTouched and emit', () => {
    const markAllAsTouchedSpy = spyOn(component.socialNetworkRegisterForm, 'markAllAsTouched').and.callFake(() => true);
    const emitSpy = spyOn(component.values, 'emit').and.callFake(() => true);
    component.socialFormIdTypeControl.setValue('1');
    component.socialFormIdControl.setValue('1234567890');
    component.socialFormAcceptTermsControl.setValue(true);
    component.socialFormNameControl.setValue('Name');
    component.socialFormCellphoneControl.setValue('1234567890');
    component.socialFormCellphoneControl.updateValueAndValidity();
    component.socialFormCellphoneControl.updateValueAndValidity();
    component.socialFormCellphoneControl.updateValueAndValidity();
    component.socialFormCellphoneControl.updateValueAndValidity();
    component.register();
    expect(markAllAsTouchedSpy).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('Should set typedc to nit', () => {
    component.selectId('3');
    expect(component.typedc).toBe('nit');
  });

  it('Should set typedc to documento', () => {
    const clearValidatorsSpy = spyOn(component.socialFormNameControl, 'clearValidators').and.callFake(() => true);
    const setValueSpy = spyOn(component.socialFormNameControl, 'setValue').and.callFake(() => true);
    component.selectId('1');
    expect(component.typedc).toBe('documento');
    expect(clearValidatorsSpy).toHaveBeenCalled();
    expect(setValueSpy).toHaveBeenCalled();
  });

  it('Should set terms to null', () => {
    component.socialFormAcceptTermsControl.setValue(false);
    component.acceptTermsCheck();
    expect(component.socialFormAcceptTermsControl.value).toBe(null);
  });

  it('Should not call socialFormAcceptTermsControl.setValue', () => {
    component.socialFormAcceptTermsControl.setValue(true);
    const setValueSpy = spyOn(component.socialFormAcceptTermsControl, 'setValue').and.callFake(() => true);
    component.acceptTermsCheck();
    expect(component.socialFormAcceptTermsControl.value).toBe(true);
    expect(setValueSpy).not.toHaveBeenCalled();
  });

  it('Should acceptModal', () => {
    const openSpy = spyOn((<any>component).dialog, 'closeAll').and.callFake(() => true);
    component.acceptModal();
    expect(openSpy).toHaveBeenCalled();
    expect(component.socialFormAcceptTermsControl.value).toBe(true);
  });

  it('Should open termsAndConditions', () => {
    const openSpy = spyOn((<any>component).dialog, 'open').and.callFake(() => true);
    const data = {
      data: {
        title: '',
        template: component.templateTerms,
      }
    }
    component.termsAndConditions();
    expect(openSpy).toHaveBeenCalledWith(ModalGenericComponent, data);
  })

});
