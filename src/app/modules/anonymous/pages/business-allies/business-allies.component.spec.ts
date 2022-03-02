import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

import { BusinessAlliesComponent } from './business-allies.component';

describe('BusinessAlliesComponent', () => {
  let component: BusinessAlliesComponent;
  let fixture: ComponentFixture<BusinessAlliesComponent>;

  const mockDialog = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);

  const mockContentService = jasmine.createSpyObj('ContentService', [
    'getBusiness',
  ]);

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessAlliesComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
      ]
    })
    .compileComponents();
    mockContentService.getBusiness.and.returnValue(of(business));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessAlliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

