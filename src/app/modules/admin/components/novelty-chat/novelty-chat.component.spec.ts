/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { NoveltyChatComponent } from './novelty-chat.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule } from '@ngx-translate/core';
import { AnonymousModule } from 'src/app/modules/anonymous/anonymous.module';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';

describe('NoveltyChatComponent', () => {
  let component: NoveltyChatComponent;
  let fixture: ComponentFixture<NoveltyChatComponent>;

  const novelty = {
    id: 1,
    consecutive: '000001',
    date: '2021-08-12T20:46:46.707',
    solutiondate: '2021-08-20T16:25:21.487',
    identification: '1050955208',
    name: 'Eisner Puerta Carrillo',
    cellphone: '(310) 500 9039',
    email: 'eisner271190@gmail.com',
    statusnovelty: 'En revisión',
    idclicker: 'eisner100777',
    businessdescription: 'Clickam',
    datenovelty: '2021-02-24T02:39:43.173',
    code: '0001',
    description: 'descripción',
    documenturl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/novelty/20210812204645_descarga1.png',
    responsenovelty: 'prueba con estado',
  };

  const listNotes = [
    {
      type: 1,
      state: 'Solucionado',
      text: 'nota de novedad',
      adminName: 'Eisner Puerta Carrillo',
      date: '2021-08-13T01:47:29.277Z',
    },
    {
      type: 0,
      state: 'Solucionado',
      text: 'Cambio de estado',
      adminName: 'Eisner Puerta Carrillo',
      date: '2021-08-13T01:47:42.827Z',
    },
    {
      type: 0,
      state: 'Solucionado',
      text: 'Respuesta de la solución',
      adminName: 'Eisner Puerta Carrillo',
      date: '2021-08-13T01:49:41.380Z',
    },
    {
      type: 0,
      state: 'En revisión',
      text: '',
      adminName: 'Yeferson ',
      date: '2021-08-18T16:38:27.130Z',
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NoveltyChatComponent],
      imports: [
        TranslateModule.forRoot(),
        AnonymousModule,
        AppMaterialModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        SharedModule,
        RouterTestingModule.withRoutes([]),
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
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoveltyChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.initForm();
  });

  it('send note', () => {
    component.novelty = novelty;
    component.sendNote();
  });
});
