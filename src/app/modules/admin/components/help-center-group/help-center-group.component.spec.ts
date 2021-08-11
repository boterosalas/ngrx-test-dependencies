import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { of } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';

import { HelpCenterGroupComponent } from './help-center-group.component';

export class MatDialogMock {
  open() {
    return {
      beforeClosed: () => of(true),
    };
  }
  closeAll() {
    return {
      closeAll: () => of(true),
    };
  }
}

describe('HelpCenterGroupComponent', () => {
  let component: HelpCenterGroupComponent;
  let fixture: ComponentFixture<HelpCenterGroupComponent>;

  const dialogMock = {
    close: () => {},
  };

  const matDialog = new MatDialogMock();

  const mockDialog = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);

  const mockContentService = jasmine.createSpyObj('ContentService', [
    'saveOrderFaq',
    'saveOrderFaqsItem',
    'getFaqs',
    'deleteFaqItems',
    'deleteFaqgroups',
  ]);

  let response = {
    Status: 'Success',
  };

  let faqs = [
    {
      id: 2,
      sectiontitle: '¿Sobre Clickam?',
      orderby: 2,
      date: '2021-07-16T08:26:19.557',
      items: [
        {
          id: 5,
          idfaqsection: 2,
          sectiontitle: '¿Cómo me puedo registrar?',
          sectionvalue:
            'Para registrarte, debes descargar la aplicación Clickam en tu celular o ir a la página www.clickam.com.co, clickear en “Iniciar sesión”, y seleccionar registrarse, completa el formulario, recuerda que tu contraseña debe contener por lo menos 6 caracteres, con mínimo una letra mayúscula, letra minúscula y un número; por ejemplo: Clickam1.Te llegará un correo para activarte, debes tener en cuenta que este correo puede estar en “No deseados” o “spam” por ser un nuevo remitente.Cuando te registras y activas tu cuenta, te conviertes en Clicker.',
          orderby: 0,
          date: '2021-07-16T08:27:27.293',
        },
        {
          id: 4,
          idfaqsection: 2,
          sectiontitle: '¿Cómo me puedo registrar?',
          sectionvalue:
            'Para registrarte, debes descargar la aplicación Clickam en tu celular o ir a la página www.clickam.com.co, clickear en “Iniciar sesión”, y seleccionar registrarse, completa el formulario, recuerda que tu contraseña debe contener por lo menos 6 caracteres, con mínimo una letra mayúscula, letra minúscula y un número; por ejemplo: Clickam1.Te llegará un correo para activarte, debes tener en cuenta que este correo puede estar en “No deseados” o “spam” por ser un nuevo remitente.Cuando te registras y activas tu cuenta, te conviertes en Clicker.',
          orderby: 1,
          date: '2021-07-16T08:27:00.057',
        },
      ],
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HelpCenterGroupComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: MatDialog, useValue: matDialog },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: ContentService, useValue: mockContentService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpCenterGroupComponent);
    component = fixture.componentInstance;
    mockContentService.getFaqs.and.returnValue(of(faqs));
    mockContentService.saveOrderFaq.and.returnValue(of(response));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get faqs', () => {
    component.getFaqs();
    expect(mockContentService.getFaqs).toHaveBeenCalled();
  });

  it('save order items', () => {
    let data = [
      { id: 1, orderBy: 1 },
      { id: 2, orderBy: 2 },
      { id: 13, orderBy: 3 },
    ];
    mockContentService.saveOrderFaqsItem.and.returnValue(of(response));
    component.saveOrderItems(data);
    expect(mockContentService.saveOrderFaqsItem).toHaveBeenCalled();
  });

  it('add section', () => {
    component.addSection();
    expect(mockContentService.getFaqs).toHaveBeenCalled();
  });

  it('edit faq Group', () => {
    let section = {
      id: 1,
      sectiontitle: 'test',
      idfaqsection: 1,
      sectionvalue: 'test',
      orderby: 1,
    };
    const data = {
      title: 'Editar grupo',
      buttonName: 'Guardar',
      edit: 1,
      id: section.id,
      sectiontitle: section.sectiontitle,
      orderby: section.orderby,
    };
    component.editFaqGroup(data);
    expect(mockContentService.getFaqs).toHaveBeenCalled();
  });

  it('delete faq Group', () => {
    component.deleteFaqGroup([1]);
    expect(mockContentService.getFaqs).toHaveBeenCalled();
  });

  it('add faq Item', () => {
    let section = {
      id: 1,
    };
    const data = {
      title: 'Agregar pregunta frecuente',
      buttonName: 'Agregar',
      edit: 0,
      idfaqsection: section.id,
    };

    component.addFaqItem(data);
    expect(mockContentService.getFaqs).toHaveBeenCalled();
  });

  it('edit faq Item', () => {
    let item = {
      id: 1,
      sectiontitle: 'test',
      idfaqsection: 1,
      sectionvalue: 'test',
      orderby: 1,
    };
    const data = {
      title: 'Editar pregunta frecuente',
      buttonName: 'Guardar',
      edit: 1,
      id: item.id,
      idfaqsection: item.idfaqsection,
      description: item.sectiontitle,
      sectionvalue: item.sectionvalue,
      orderby: item.orderby,
    };
    component.editFaqItem(data);
    expect(mockContentService.getFaqs).toHaveBeenCalled();
  });

  it('delete faq Item', () => {
    component.currentLink = 1;
    component.deleteFaqItem(component.currentLink);
    expect(mockContentService.getFaqs).toHaveBeenCalled();
  });

  it('delete faq service', () => {
    mockContentService.deleteFaqItems.and.returnValue(of(response));
    component.currentSection = ['1'];
    component.deleteFaqItemService();
    expect(mockContentService.deleteFaqItems).toHaveBeenCalled();
  });
});
