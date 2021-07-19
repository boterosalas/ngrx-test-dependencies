import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

import { FaqGroupComponent } from './faq-group.component';

describe('FaqGroupComponent', () => {
  let component: FaqGroupComponent;
  let fixture: ComponentFixture<FaqGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FaqGroupComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({}),
        BrowserAnimationsModule
      ],
      providers:[],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqGroupComponent);
    component = fixture.componentInstance;
    component.section = {
        items: [
          {
              "id": 5,
              "idfaqsection": 2,
              "sectiontitle": "¿Cómo me puedo registrar?",
              "sectionvalue": "Para registrarte, debes descargar la aplicación Clickam en tu celular o ir a la página www.clickam.com.co, clickear en “Iniciar sesión”, y seleccionar registrarse, completa el formulario, recuerda que tu contraseña debe contener por lo menos 6 caracteres, con mínimo una letra mayúscula, letra minúscula y un número; por ejemplo: Clickam1.Te llegará un correo para activarte, debes tener en cuenta que este correo puede estar en “No deseados” o “spam” por ser un nuevo remitente.Cuando te registras y activas tu cuenta, te conviertes en Clicker.",
              "orderby": 0,
              "date": "2021-07-16T08:27:27.293"
          }
      ]
    }

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('editFaqGroup', () => {
    spyOn(component.editGroup, 'emit');
    component.editFaqGroup();
    expect(component.editGroup.emit).toHaveBeenCalled();
  });

  it('openDeleteFaqSection', () => {
    spyOn(component.deleteGroup, 'emit');
    component.openDeleteFaqSection();
    expect(component.deleteGroup.emit).toHaveBeenCalled();
  });

  it('deleteFaqItem', () => {
    spyOn(component.deleteItem, 'emit');
    component.deleteFaqItem({});
    expect(component.deleteItem.emit).toHaveBeenCalled();
  });

  it('previewItem', () => {
    spyOn(component.previewItems, 'emit');
    component.previewItem({});
    expect(component.previewItems.emit).toHaveBeenCalled();
  });

});
