import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBusinessFormComponent } from './new-business-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RecaptchaModule, RecaptchaFormsModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContentService } from 'src/app/services/content.service';
import { of } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('NewBusinessFormComponent', () => {
  let component: NewBusinessFormComponent;
  let fixture: ComponentFixture<NewBusinessFormComponent>;

  const mockContentService = jasmine.createSpyObj('ContentService', ['getCategoriesBusinessHome', 'registerBusinessClicker']);

  let business = [
    {
      id: 1,
      code: 'exito',
      imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-exito.png',
      infoaditional: 'Hasta 9.6% de ganancia',
      description: 'Almacenes Éxito',
      orderby: 1,
    },
    {
      id: 2,
      code: 'carulla',
      imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-carulla.png',
      infoaditional: 'Hasta 9.6% de ganancia',
      description: 'Almacenes Carulla',
      orderby: 2,
    },
    {
      id: 3,
      code: 'seguros',
      imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-seguros.png',
      infoaditional: 'Hasta $32.000 de ganancia',
      description: 'Seguros Éxito',
      orderby: 3,
    },
    {
      id: 4,
      code: 'viajes',
      imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-viajes.png',
      infoaditional: 'Hasta $40.000 de ganancia',
      description: 'Viajes Éxito',
      orderby: 4,
    },
    {
      id: 5,
      code: 'wesura',
      imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-wesura.png',
      infoaditional: 'Hasta 12.000 de ganancia',
      description: 'Tu seguro',
      orderby: 5,
    },
  ];

  const dialogMock = {
    close: () => {},
  };

  let dataBussiness = {
    state: 'Success',
    userMessage: 'El negocio ha sido guardado satisfactoriamente',
    objectResponse: true,
  };

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NewBusinessFormComponent],
      imports: [
        TranslateModule.forRoot(),
        AppMaterialModule,
        ReactiveFormsModule,
        FormsModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogMock },
        {
          provide: RECAPTCHA_SETTINGS,
          useValue: { siteKey: 'yoursitekey' } as RecaptchaSettings,
        },
        { provide: ContentService, useValue: mockContentService },
      ],
    }).compileComponents();
    mockContentService.getCategoriesBusinessHome.and.returnValue(of(business));
    mockContentService.registerBusinessClicker.and.returnValue(of(dataBussiness));
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

  // it('register data', () => {
  //   let data = {
  //     name: 'test',
  //     domain: 'www.google.com',
  //     contact: '123',
  //     phone: '123',
  //     email: 'test@h.com',
  //     category: 'test',
  //     acceptTerms: true,
  //     acceptHabeasData: true
  //   }
  //   component.registerForm.controls.name.setValue(data.name);
  //   component.register(data);
  //   expect(mockContentService.registerBusinessClicker).toHaveBeenCalled();
  // });
});
