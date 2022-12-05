import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBussinessComponent } from './all-bussiness.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { AnonymousModule } from 'src/app/modules/anonymous/anonymous.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { ContentService } from 'src/app/services/content.service';
import { Observable, of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HomeComponent } from 'src/app/modules/anonymous/pages/home/home.component';

describe('AllBussinessComponent', () => {
  let component: AllBussinessComponent;
  let fixture: ComponentFixture<AllBussinessComponent>;

  const mockContentService = jasmine.createSpyObj('ContentService', ['getBusinessByCategory', 'getOffersbyType', 'getCategories']);
  let socialAuthServiceMock = jasmine.createSpyObj('socialAuthService', ['authState', 'initState', 'refreshAuthToken', 'signIn', 'signOut']);

  const categories = [
    { id: 1, description: 'Accesorios' },
    { id: 2, description: 'Autos y llantas' },
 ];


  let bussiness = [
    {
      id: 25,
      orderby: 26,
      link: 'https://www.exito.com/ferreteria?utm_source=clickam&utm_medium=referral&utm_campaign=',
      imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-content/ferreteria-vehiculos.png',
      description: 'Ferreteria y vehiculos',
      commission: 0,
      idbusiness: 1,
      infoaditional: '',
    },
  ];

  let carousel = [
   { active: true,
    business: 'exito',
    colorbutton: null,
    date: '2021-12-23T10:23:08.687',
    dateend: null,
    datestart: null,
    description: 'prueba review',
    id: 86,
    idbusiness: 1,
    imagemobile: null,
    imageurlmobile: 'https://webclickamqa.blob.core.windows.net/img-ofertas/pic-offers-mobile/20211223102308_mobile.jpg',
    imageurlweb: 'https://webclickamqa.blob.core.windows.net/img-ofertas/pic-offers-web/20211223102308_web.jpg',
    imageweb: null,
    infoaditional: '5%',
    link: 'exito.com?utm_source=clickam&utm_medium=referral&utm_campaign={1}',
    new: false,
    orderby: 0,
    seccion: null,
    textbutton: null,
    type: 'CARROUSEL',}
  ]

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AllBussinessComponent],
        imports: [
          SharedModule,
          TranslateModule.forRoot(),
          AppMaterialModule,
          AnonymousModule,
          RouterTestingModule.withRoutes([
            { path: 'inicio', component: HomeComponent}
          ]),
          HttpClientTestingModule,
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
          // { provide: SocialAuthService, useValue: { ...socialAuthServiceMock, authState: new Observable() } },
          { provide: ContentService, useValue: mockContentService }
        ],
      }).compileComponents();
      mockContentService.getBusinessByCategory.and.returnValue(of(bussiness));
      mockContentService.getOffersbyType.and.returnValue(of(carousel));
      mockContentService.getCategories.and.returnValue(of(categories));
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBussinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('bussiness navigation', () => {
    component.bussinessNavigation(bussiness);
    expect(bussiness).toBeDefined();
  });
});
