import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_CONFIG, LocaleService, NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { config, of } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { ContentService } from 'src/app/services/content.service';

import { DialogFilterUsersComponent } from './dialog-filter-users.component';

describe('DialogFilterUsersComponent', () => {
  let component: DialogFilterUsersComponent;
  let fixture: ComponentFixture<DialogFilterUsersComponent>;

  const mockContentService = jasmine.createSpyObj('ContentService', ['getAllBusiness']);

  let allBusiness = [
    {
      id: 1,
      code: 'exito',
      imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-exito.svg',
      infoaditional: 'Hasta 9.6% de ganancia',
      description: 'Almacenes Éxito',
      orderby: 1,
      active: false,
    },
    {
      id: 14,
      code: 'movil-exito',
      imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-movil-exito.svg',
      infoaditional: 'Ahora 10% de comisión',
      description: 'Móvil Éxito',
      orderby: 5,
      active: true,
    },
    {
      id: 3,
      code: 'seguros',
      imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-seguros.svg',
      infoaditional: 'Hasta $32.000 de ganancia',
      description: 'Seguros Éxito',
      orderby: 3,
      active: true,
    },
    {
      id: 4,
      code: 'viajes',
      imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-viajes.svg',
      infoaditional: 'Hasta $40.000 de ganancia',
      description: 'Viajes Éxito',
      orderby: 4,
      active: true,
    },
    {
      id: 5,
      code: 'wesura',
      imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-wesura.svg',
      infoaditional: 'Hasta 12.000 de ganancia',
      description: 'Wesura',
      orderby: 6,
      active: true,
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogFilterUsersComponent],
      imports: [FormsModule, ReactiveFormsModule, AppMaterialModule, NgxDaterangepickerMd, BrowserAnimationsModule],
      providers: [
        { provide: ContentService, useValue: mockContentService },
        { provide: LOCALE_CONFIG, useValue: config },
        {
          provide: LocaleService,
          useClass: LocaleService,
          deps: [LOCALE_CONFIG],
        },
      ],
    }).compileComponents();
    mockContentService.getAllBusiness.and.returnValue(of(allBusiness));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFilterUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get all bussiness', () => {
    component.getAllBusiness();
    expect(mockContentService.getAllBusiness).toHaveBeenCalled();
  });

  it('clear form', () => {
    component.clearFilters();
    expect(component.chipsBussiness).toEqual([]);
    expect(component.chipsBussinessId).toEqual([]);
  });

  it('change value add chip', () => {
    let selectValue = {
      id: 1,
      code: 'exito',
      imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-exito.svg',
      infoaditional: 'Hasta 9.6% de ganancia',
      description: 'Almacenes Éxito',
      orderby: 1,
      active: false,
    };
    component.onChangeSelected(selectValue);
    expect(component.chipsBussiness).toEqual([selectValue]);
  });
});
