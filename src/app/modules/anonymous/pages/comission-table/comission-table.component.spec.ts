import { waitForAsync, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ComissionTableComponent } from './comission-table.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ContentService } from 'src/app/services/content.service';
import { of } from 'rxjs';

describe('ComissionTableComponent', () => {
  let component: ComissionTableComponent;
  let fixture: ComponentFixture<ComissionTableComponent>;

  const mockContentService = jasmine.createSpyObj('ContentService', ['getCommissions']);

  const table = {
    'exito.com': [
      {
        tab: 'exito.com',
        idbusiness: 1,
        commission: '9.6%',
        description: 'Todos los textiles y categoría bebés',
        id: 1,
      },
      {
        tab: 'exito.com',
        idbusiness: 1,
        commission: '8%',
        description: 'Hogar: Ferretería, fiesta, papelería y navidad.',
        id: 3,
      },
      {
        tab: 'exito.com',
        idbusiness: 1,
        commission: '6.4%',
        description:
          'Hogar: Organizadores, mesas y decoración, deportes, ropa hogar y otros, muebles, hidrolavadoras, juguetería, Halloween, cocina y libros.',
        id: 4,
      },
      {
        tab: 'exito.com',
        idbusiness: 1,
        commission: '6%',
        description: 'Garantías extendidas',
        id: 2,
      },
      {
        tab: 'exito.com',
        idbusiness: 1,
        commission: '4%',
        description: 'Colchones',
        id: 5,
      },
      {
        tab: 'exito.com',
        idbusiness: 1,
        commission: '3%',
        description: 'Mercado',
        id: 6,
      },
      {
        tab: 'exito.com',
        idbusiness: 1,
        commission: '2.4%',
        description:
          'Pequeños electrodomésticos: Cuidado pisos, de ropa y personal, ventilación y calefacción, cocción eléctrica, bebidas, accesorios preparación alimentos, preparación alimentos y aires acondicionados.',
        id: 7,
      },
      {
        tab: 'exito.com',
        idbusiness: 1,
        commission: '2.4%',
        description: 'Accesorios telefonía',
        id: 8,
      },
      {
        tab: 'exito.com',
        idbusiness: 1,
        commission: '1.6%',
        description: 'Informática: Periféricos y accesorios para PC',
        id: 9,
      },
      {
        tab: 'exito.com',
        idbusiness: 1,
        commission: '1.6%',
        description: 'Audio y video: Accesorios de TV y audio, DVD, teatro en casa, portables audio, teléfonos, equipos de sonido.',
        id: 10,
      },
      {
        tab: 'exito.com',
        idbusiness: 1,
        commission: '0.96%',
        description: 'Celular gama alta',
        id: 11,
      },
      {
        tab: 'exito.com',
        idbusiness: 1,
        commission: '0.96%',
        description: 'Televisión',
        id: 12,
      },
      {
        tab: 'exito.com',
        idbusiness: 1,
        commission: '0.8%',
        description: 'Grandes electrodomésticos: Lavado y secado, refrigeración máquinas de coser y cocción.',
        id: 13,
      },
      {
        tab: 'exito.com',
        idbusiness: 1,
        commission: '0.8%',
        description: 'Videojuegos',
        id: 14,
      },
      {
        tab: 'exito.com',
        idbusiness: 1,
        commission: '0.64%',
        description: 'Celular gama media',
        id: 15,
      },
      {
        tab: 'exito.com',
        idbusiness: 1,
        commission: '0.6%',
        description: 'Informática: Cámaras fotográficas y filmadoras, computadores, tablets, monitores, e impresión',
        id: 16,
      },
    ],
    'carulla.com': [
      {
        tab: 'carulla.com',
        idbusiness: 2,
        commission: '9.6%',
        description: 'Todos los textiles y categoría bebés',
        id: 17,
      },
      {
        tab: 'carulla.com',
        idbusiness: 2,
        commission: '8%',
        description: 'Hogar: Ferretería, fiesta, papelería y navidad.',
        id: 19,
      },
      {
        tab: 'carulla.com',
        idbusiness: 2,
        commission: '6.4%',
        description:
          'Hogar: Organizadores, mesas y decoración, deportes, ropa hogar y otros, muebles, hidrolavadoras, juguetería, Halloween, cocina y libros.',
        id: 20,
      },
      {
        tab: 'carulla.com',
        idbusiness: 2,
        commission: '6%',
        description: 'Garantías extendidas',
        id: 18,
      },
      {
        tab: 'carulla.com',
        idbusiness: 2,
        commission: '4%',
        description: 'Colchones',
        id: 21,
      },
      {
        tab: 'carulla.com',
        idbusiness: 2,
        commission: '3%',
        description: 'Mercado',
        id: 22,
      },
      {
        tab: 'carulla.com',
        idbusiness: 2,
        commission: '2.4%',
        description:
          'Pequeños electrodomésticos: Cuidado pisos, de ropa y personal, ventilación y calefacción, cocción eléctrica, bebidas, accesorios preparación alimentos, preparación alimentos y aires acondicionados.',
        id: 23,
      },
      {
        tab: 'carulla.com',
        idbusiness: 2,
        commission: '2.4%',
        description: 'Accesorios telefonía',
        id: 24,
      },
      {
        tab: 'carulla.com',
        idbusiness: 2,
        commission: '1.6%',
        description: 'Informática: Periféricos y accesorios para PC',
        id: 25,
      },
      {
        tab: 'carulla.com',
        idbusiness: 2,
        commission: '1.6%',
        description: 'Audio y video: Accesorios de TV y audio, DVD, teatro en casa, portables audio, teléfonos, equipos de sonido.',
        id: 26,
      },
      {
        tab: 'carulla.com',
        idbusiness: 2,
        commission: '0.96%',
        description: 'Celular gama alta',
        id: 27,
      },
      {
        tab: 'carulla.com',
        idbusiness: 2,
        commission: '0.96%',
        description: 'Televisión',
        id: 28,
      },
      {
        tab: 'carulla.com',
        idbusiness: 2,
        commission: '0.8%',
        description: 'Grandes electrodomésticos: Lavado y secado, refrigeración máquinas de coser y cocción.',
        id: 29,
      },
      {
        tab: 'carulla.com',
        idbusiness: 2,
        commission: '0.8%',
        description: 'Videojuegos',
        id: 30,
      },
      {
        tab: 'carulla.com',
        idbusiness: 2,
        commission: '0.64%',
        description: 'Celular gama media',
        id: 31,
      },
      {
        tab: 'carulla.com',
        idbusiness: 2,
        commission: '0.6%',
        description: 'Informática: Cámaras fotográficas y filmadoras, computadores, tablets, monitores, e impresión',
        id: 32,
      },
    ],
    'Seguros Éxito': [
      {
        tab: 'Seguros Éxito',
        idbusiness: 3,
        commission: '$8.000',
        description: 'SOAT Moto',
        id: 34,
      },
      {
        tab: 'Seguros Éxito',
        idbusiness: 3,
        commission: '$4.800',
        description: 'Seguro de viaje nacional',
        id: 36,
      },
      {
        tab: 'Seguros Éxito',
        idbusiness: 3,
        commission: '$32.000',
        description: 'SOAT Auto',
        id: 33,
      },
      {
        tab: 'Seguros Éxito',
        idbusiness: 3,
        commission: '$16.000',
        description: 'Seguro viaje internacional',
        id: 35,
      },
    ],
    WeSura: [
      {
        tab: 'WeSura',
        idbusiness: 5,
        commission: '$12.000',
        description: 'Seguro Celular',
        id: 37,
      },
      {
        tab: 'WeSura',
        idbusiness: 5,
        commission: '$12.000',
        description: 'Seguro Smartwatch',
        id: 38,
      },
      {
        tab: 'WeSura',
        idbusiness: 5,
        commission: '$12.000',
        description: 'Seguro Tablet',
        id: 39,
      },
      {
        tab: 'WeSura',
        idbusiness: 5,
        commission: '$12.000',
        description: 'Seguro Portátil',
        id: 40,
      },
      {
        tab: 'WeSura',
        idbusiness: 5,
        commission: '$12.000',
        description: 'Seguro consola de videojuego',
        id: 41,
      },
      {
        tab: 'WeSura',
        idbusiness: 5,
        commission: '$12.000',
        description: 'Seguro mascotas',
        id: 42,
      },
      {
        tab: 'WeSura',
        idbusiness: 5,
        commission: '$12.000',
        description: 'Seguro motos',
        id: 43,
      },
      {
        tab: 'WeSura',
        idbusiness: 5,
        commission: '$12.000',
        description: 'Seguro bicicletas',
        id: 44,
      },
    ],
    'Viajes Éxito': [
      {
        tab: 'Viajes Éxito',
        idbusiness: 4,
        commission: '$40.000',
        description: 'Paquetes de viaje',
        id: 45,
      },
      {
        tab: 'Viajes Éxito',
        idbusiness: 4,
        commission: '$16.000',
        description: 'Vuelos, actividades, autos, circuitos, hoteles',
        id: 46,
      },
    ],
    'Móvil Éxito': [
      {
        tab: 'Móvil Éxito',
        idbusiness: 14,
        commission: '10%',
        description: 'Paquetes',
        id: 47,
      },
      {
        tab: 'Móvil Éxito',
        idbusiness: 14,
        commission: '10%',
        description: 'Recargas',
        id: 48,
      },
    ],
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [TranslateModule.forRoot(), AppMaterialModule, BrowserAnimationsModule, SharedModule, RouterTestingModule],
        declarations: [ComissionTableComponent],
        providers: [{ provide: ContentService, useValue: mockContentService }],
      }).compileComponents();
      mockContentService.getCommissions.and.returnValue(of(table));
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ComissionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
    expect(mockContentService.getCommissions).toHaveBeenCalled();
  });
});
