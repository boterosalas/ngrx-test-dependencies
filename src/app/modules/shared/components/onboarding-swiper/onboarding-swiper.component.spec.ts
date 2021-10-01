/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { OnboardingSwiperComponent } from './onboarding-swiper.component';
import { ContentService } from 'src/app/services/content.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { SharedModule } from '../../shared.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

describe('OnboardingSwiperComponent', () => {
  let component: OnboardingSwiperComponent;
  let fixture: ComponentFixture<OnboardingSwiperComponent>;
  const mockContentService = jasmine.createSpyObj('ContentService', ['getBoarding', 'saveVisitOffer']);

  const datos = [
    {
      active: false,
      business: 'exito',
      date: '2021-04-20T00:00:00',
      dateend: '2021-05-19T02:15:00',
      datestart: '2999-05-19T02:05:00',
      description: 'Oferta',
      id: 4,
      idbusiness: 1,
      imagemobile: null,
      imageurlmobile: 'https://webclickamqa.blob.core.windows.net/img-ofertas/pic-offers-mobile/4.jpg',
      imageurlweb: 'https://webclickamqa.blob.core.windows.net/img-ofertas/pic-offers-web/4.jpg',
      imageweb: null,
      infoaditional: 'Hasta 10%',
      link: 'https://www.exito.com/jugueteria?utm_source=clickam&utm_medium=referral&utm_campaign={1}',
      orderby: 1,
      programmed: false,
      selected: false,
      type: 'POPUP',
      seccion: '/mi-perfil',
      textbutton: 'Continuar',
      new: true,
      colorbutton: '#8D7EB7',
    },
    {
      active: false,
      business: 'exito',
      date: '2021-04-20T00:00:00',
      dateend: null,
      datestart: null,
      description: 'Jueves Online',
      id: 14,
      idbusiness: 1,
      imagemobile: null,
      imageurlmobile: 'https://webclickamqa.blob.core.windows.net/img-ofertas/pic-offers-mobile/14.jpg',
      imageurlweb: 'https://webclickamqa.blob.core.windows.net/img-ofertas/pic-offers-web/14.jpg',
      imageweb: null,
      infoaditional: 'Hasta 9.6%',
      link: 'https://www.exito.com/?utm_source=clickam&utm_medium=referral&utm_campaign={1}',
      orderby: 0,
      programmed: false,
      selected: false,
      type: 'CARROUSEL',
      seccion: null,
      textbutton: null,
      new: false,
      colorbutton: null,
    },
    {
      active: true,
      business: 'exito',
      date: '2021-04-20T13:20:00',
      dateend: null,
      datestart: null,
      description: 'Freidora De Aire Bioceramic Oster ',
      id: 1,
      idbusiness: 1,
      imagemobile: null,
      imageurlmobile: 'https://webclickamqa.blob.core.windows.net/img-ofertas/pic-offers-mobile/1.jpg',
      imageurlweb: 'https://webclickamqa.blob.core.windows.net/img-ofertas/pic-offers-web/1.jpg',
      imageweb: null,
      infoaditional: 'Hasta 3%',
      link: 'https://www.exito.com/freidora-de-aire-bioceramic-384560/p?utm_source=clickam&utm_medium=referral&utm_campaign={1}',
      orderby: 2,
      programmed: false,
      selected: false,
      type: 'OFERTA',
      seccion: null,
      textbutton: null,
      new: false,
      colorbutton: null,
    },
    {
      active: false,
      business: 'exito',
      date: '2021-04-20T13:20:00',
      dateend: '2021-05-19T02:15:00',
      datestart: '2021-05-19T02:15:00',
      description: 'Freidora De Aire Bioceramic Oster ',
      id: 35,
      idbusiness: 1,
      imagemobile: null,
      imageurlmobile: 'https://webclickamqa.blob.core.windows.net/img-ofertas/pic-offers-mobile/1.jpg',
      imageurlweb: 'https://webclickamqa.blob.core.windows.net/img-ofertas/pic-offers-web/1.jpg',
      imageweb: null,
      infoaditional: 'Hasta 3%',
      link: 'https://www.exito.com/freidora-de-aire-bioceramic-384560/p?utm_source=clickam&utm_medium=referral&utm_campaign={1}',
      orderby: 2,
      programmed: false,
      selected: false,
      type: 'POPUP',
      seccion: null,
      textbutton: null,
      new: false,
      colorbutton: null,
    },
  ];
  const dialogMock = {
    close: () => {},
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        AppMaterialModule,
        TranslateModule.forRoot(),
        MatSlideToggleModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        DragDropModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatMenuModule,
        BrowserAnimationsModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem('ACCESS_TOKEN');
            },
            throwNoTokenError: true,
            allowedDomains: [],
            disallowedRoutes: [],
          },
        }),
      ],
      providers: [
        TranslateService,
        { provide: ContentService, useValue: mockContentService },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    mockContentService.getBoarding.and.returnValue(of(datos));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(mockContentService.getBoarding).toHaveBeenCalled();
  });

  it('close modal', () => {
    let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.onNoClick();
    expect(spy).toHaveBeenCalled();
  });
});
