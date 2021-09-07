import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { ContentService } from 'src/app/services/content.service';
import { NavigationComponent } from './navigation.component';
import { of } from 'rxjs';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AdminModule } from '../../admin.module';

export interface FooterElement {
  drag: any;
  section: any;
}

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  const mockContentService = jasmine.createSpyObj('ContentService', ['getFooter']);

  let response = [
    {
      id: 25,
      description: 'Legales',
      orderby: 1,
      date: '2021-06-04T16:50:49.623',
      links: [
        {
          id: 54,
          idseccion: 25,
          link: 'https://www.exito.com/',
          description: 'Tienda exito',
          orderby: 1,
          date: '2021-06-04T17:37:22.113',
        },
        {
          id: 11,
          idseccion: 25,
          link: 'https://www.clickam.com.co/#/terminos-y-condiciones',
          description: 'Programa de referidos',
          orderby: 2,
          date: '2021-06-01T00:00:00',
        },
        {
          id: 8,
          idseccion: 25,
          link: 'https://www.clickam.com.co/#/terminos-y-condiciones',
          description: 'Términos y condiciones',
          orderby: 3,
          date: '2021-06-01T00:00:00',
        },
        {
          id: 10,
          idseccion: 25,
          link: 'https://www.clickam.com.co/#/terminos-y-condiciones',
          description: 'Protección de datos',
          orderby: 4,
          date: '2021-06-01T00:00:00',
        },
        {
          id: 9,
          idseccion: 25,
          link: 'https://www.clickam.com.co/#/terminos-y-condiciones',
          description: 'Términos legales del usuario',
          orderby: 5,
          date: '2021-06-01T00:00:00',
        },
      ],
    },
    {
      id: 24,
      description: 'Soporte',
      orderby: 2,
      date: '2021-06-01T00:00:00',
      links: [
        {
          id: 6,
          idseccion: 24,
          link: 'https://api.whatsapp.com/send?phone=573052559105&text=Hola,%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20Clickam.',
          description: 'Whatsapp',
          orderby: 2,
          date: '2021-06-01T00:00:00',
        },
        {
          id: 7,
          idseccion: 24,
          link: ' mail://clickam@grupo-exito.com',
          description: 'Correo',
          orderby: 2,
          date: '2021-06-10T09:27:44.26',
        },
        {
          id: 5,
          idseccion: 24,
          link: 'https://www.clickam.com.co/#/centro-de-ayuda',
          description: 'Centro de Ayuda',
          orderby: 3,
          date: '2021-06-01T00:00:00',
        },
      ],
    },
    {
      id: 23,
      description: 'Clickam',
      orderby: 3,
      date: '2021-06-02T10:45:04.59',
      links: [
        {
          id: 2,
          idseccion: 23,
          link: 'https://www.clickam.com.co/#/click-academy',
          description: 'Click Academy',
          orderby: 1,
          date: '2021-06-01T00:00:00',
        },
        {
          id: 3,
          idseccion: 23,
          link: 'https://www.clickam.com.co/#/tabla-comisiones',
          description: 'Tabla de comisiones',
          orderby: 2,
          date: '2021-06-01T00:00:00',
        },
        {
          id: 1,
          idseccion: 23,
          link: 'https://www.clickam.com.co/#/blog',
          description: 'Blog',
          orderby: 3,
          date: '2021-06-04T12:07:45.34',
        },
        {
          id: 4,
          idseccion: 23,
          link: 'https://www.clickam.com.co/#/aliados',
          description: '¿Tienes un sitio web? ¡Regístralo Aqui!',
          orderby: 4,
          date: '2021-06-04T16:14:28.107',
        },
      ],
    },
    {
      id: 42,
      description: 'Prueba',
      orderby: 4,
      date: '2021-06-11T15:08:57.913',
      links: [
        {
          id: 68,
          idseccion: 42,
          link: 'exito.com',
          description: 'Contactenos',
          orderby: 0,
          date: '2021-06-11T15:09:32.51',
        },
      ],
    },
  ];

  const dialogMock = {
    close: () => {},
  };

  let mockLinksService = jasmine.createSpyObj('LinksService', ['putOrder']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        AdminModule,
        TranslateModule.forRoot(),
        AppMaterialModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule,
        DragDropModule,

        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem('ACCESS_TOKEN');
            },
            throwNoTokenError: true,
            whitelistedDomains: [],
            blacklistedRoutes: [],
          },
        }),
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: ContentService, useValue: mockContentService },
      ],
      schemas: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    mockContentService.getFooter.and.returnValue(of(response));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(mockContentService.getFooter).toHaveBeenCalled();
  });
});
