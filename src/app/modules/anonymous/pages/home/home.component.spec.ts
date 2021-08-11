import { HomeComponent } from './home.component';
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from 'src/app/services/user.service';
import { of, throwError, Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';
import { JwtModule } from '@auth0/angular-jwt';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import Swal from 'sweetalert2';
import { LogoComponent } from 'src/app/modules/shared/components/logo/logo.component';
import { SliderComponent } from '../../components/slider/slider.component';
//import { SliderStoriesComponent } from "src/app/modules/";
import { AnonymousModule } from '../../anonymous.module';
import { ContentService } from 'src/app/services/content.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireModule } from '@angular/fire';
import { LinksService } from 'src/app/services/links.service';
import { By } from '@angular/platform-browser';
import { MasterDataService } from 'src/app/services/master-data.service';

class MockAuthService extends AuthService {
  isLoggedIn() {
    return true;
  }

  isLogged$ = new BehaviorSubject<boolean>(true);

  getRole$ = new BehaviorSubject<any>('CLICKER');
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const mockUserService = jasmine.createSpyObj('UserService', [
    'activateProfile',
    'getuserdata',
    'getProfile',
    'saveUserAcceptTermsReferrals',
    'saveFeedback',
  ]);
  const mockAuthService = jasmine.createSpyObj('AuthService', [
    'login',
    'isLoggedIn',
    'isLogged$',
  ]);
  const mockUtilsService = jasmine.createSpyObj('UtilsService', [
    'showRegisterForm',
    'showloginForm',
  ]);
  const mockMasterService = jasmine.createSpyObj('MasterDataService', [
    'getTerms',
    'setTerms',
  ]);
  const mockContentService = jasmine.createSpyObj('ContentService', [
    'getNews',
    'getOffersbyType',
    'getBusiness',
    'getBusinessClicker',
    'getPopupus',
    'getCategoriesBusinessHome',
    'registerBusinessClicker',
    'getStories',
  ]);

  const mockLinksService = jasmine.createSpyObj('LinksService', ['getAmount']);

  let amount = {
    amountsCommission: 10000,
    amountsReferred: 500000,
  };

  let dataUserC = {
    isEmployeeGrupoExito: true,
  };

  const dataUser = {
    state: 'Success',
    userMessage: null,
    objectResponse: {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc…VzIn0.Bcsm-qVHHtRcLlQae_5tVwGpgbPQJkCEQ97ZbwRxz_4',
    },
  };

  let data = {
    state: 'Success',
    userMessage: 'El usuario ha sido activado satisfactoriamente',
    objectResponse: true,
  };

  let dataTerms = {
    state: 'Success',
    userMessage: 'Los terminos se han actualizado',
    objectResponse: true,
  };

  let dataBussiness = {
    state: 'Success',
    userMessage: 'El negocio ha sido guardado satisfactoriamente',
    objectResponse: true,
  };

  let dataError = {
    state: 'Error',
    userMessage: 'El usuario ya esta activado',
    objectResponse: true,
  };

  let invalidRquest = {
    state: 'Error',
    error: {
      userMessage: 'Internal server error',
    },
  };

  let popups = [
    {
      title: 'Popup número 1',
      imageUrlWeb:
        'https://dev-realidad-aumentada.pantheonsite.io/sites/default/files/2020-05/Slider-Inicio-13-Web-Bronzini_0.svg',
      imageUrlMobile:
        'https://dev-realidad-aumentada.pantheonsite.io/sites/default/files/2020-05/Slider-Inicio-10-Web-SOAT-Carro_2.svg',
      imageAltWeb: 'Popup número 1',
      imageAltMobile: 'Popup número 1 mobile',
      link: 'http://example.com',
    },
  ];

  let business = [
    {
      id: 1,
      code: 'exito',
      imageurl:
        'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-exito.png',
      infoaditional: 'Hasta 9.6% de ganancia',
      description: 'Almacenes Éxito',
      orderby: 1,
    },
    {
      id: 2,
      code: 'carulla',
      imageurl:
        'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-carulla.png',
      infoaditional: 'Hasta 9.6% de ganancia',
      description: 'Almacenes Carulla',
      orderby: 2,
    },
    {
      id: 3,
      code: 'seguros',
      imageurl:
        'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-seguros.png',
      infoaditional: 'Hasta $32.000 de ganancia',
      description: 'Seguros Éxito',
      orderby: 3,
    },
    {
      id: 4,
      code: 'viajes',
      imageurl:
        'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-viajes.png',
      infoaditional: 'Hasta $40.000 de ganancia',
      description: 'Viajes Éxito',
      orderby: 4,
    },
    {
      id: 5,
      code: 'wesura',
      imageurl:
        'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-wesura.png',
      infoaditional: 'Hasta 12.000 de ganancia',
      description: 'Tu seguro',
      orderby: 5,
    },
  ];

  let getStories = {
    state: 'Success',
    userMessage: null,
    objectResponse: [
      {
        id: 0,
        idbusiness: 25,
        name: 'Exito',
        businessName: 'Exito',
        infoAditional: '30%',
        image: 'https://www.exito.com/story.jpg',
        businessImage: 'https://www.exito.com/businessimagestory.jpg',
        businessCode: 'exito',
        link: 'https://www.exito.com/story',
        date: new Date(2021, 4, 12),
        stateView: false,
        pause: true,
      },
    ],
  };

  let news = {
    mobile: [
      {
        imageurl:
          'https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-Inicio-1-Mobile-Bienvenida.jpg',
        description: 'Bienvenido a Clickam',
        link: 'https://www.exito.com/?utm_source=clickam&utm_medium=referral&utm_campaign=',
        business: 'exito',
      },
      {
        imageurl:
          'https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-Inicio-2-Mobile-Colchones-Paraiso.jpg',
        description: 'Colchones Paraiso',
        link: 'https://www.exito.com/search?_query=colchones%20paraiso&utm_source=clickam&utm_medium=referral&utm_campaign=',
        business: 'exito',
      },
      {
        imageurl:
          'https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-Inicio-3-Mobile-Arkitect.jpg',
        description: 'Arkitect',
        link: 'https://www.exito.com/search?_query=arkitect&utm_source=clickam&utm_medium=referral&utm_campaign=',
        business: 'exito',
      },
      {
        imageurl:
          'https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-Inicio-4-Mobile-Imusa.jpg',
        description: 'IMUSA',
        link: 'https://www.exito.com/search/zimusa?_query=imusa&map=s,brand&utm_source=clickam&utm_medium=referral&utm_campaign=',
        business: 'exito',
      },
      {
        imageurl:
          'https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-Inicio-5-Mobile-Gef-PuntoBlanco.jpg',
        description: 'Gef y Punto Blanco',
        link: 'https://www.exito.com/2738?map=productClusterIds&order=OrderByBestDiscountDESC&utm_source=clickam&utm_medium=referral&utm_campaign=',
        business: 'exito',
      },
      {
        imageurl:
          'https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-Inicio-6-Mobile-exito-com.jpg',
        description: 'Ofertas de exito.com',
        link: 'https://www.exito.com/1259?map=productClusterIds&utm_source=clickam&utm_medium=referral&utm_campaign=',
        business: 'exito',
      },
      {
        imageurl:
          'https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-Inicio-7-Mobile-Nike-Fila-mas.jpg',
        description:
          'Nike, Fila, reebok, Under Armour, SKECHERS, BRONZINI ACTIVE',
        link: 'https://www.exito.com/2244?map=productClusterIds&utm_source=clickam&utm_medium=referral&utm_campaign=',
        business: 'exito',
      },
      {
        imageurl:
          'https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-Inicio-8-Mobile-Finlandek.jpg',
        description: 'Finlandek',
        link: 'https://www.exito.com/search/zfinlandek/zfinlandek-select?_query=finlandek&map=s,brand,brand&utm_source=clickam&utm_medium=referral&utm_campaign=',
        business: 'exito',
      },
      {
        imageurl:
          'https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-Inicio-9-Mobile-Levis.jpg',
        description: 'Levis',
        link: 'https://www.exito.com/2245?map=productClusterIds&utm_source=clickam&utm_medium=referral&utm_campaign=',
        business: 'exito',
      },
      {
        imageurl:
          'https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-Inicio-10-Mobile-SOAT-Carro.jpg',
        description: 'SOAT Carro',
        link: 'https://www.segurosexito.com/soat/p?utm_source=clickam&utm_medium=referral&utm_campaign=',
        business: 'seguros',
      },
      {
        imageurl:
          'https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-Inicio-11-Mobile-Brahma-Aeroflex.jpg',
        description: 'Brahma y Aeroflex',
        link: 'https://www.exito.com/931?map=productClusterIds&utm_source=clickam&utm_medium=referral&utm_campaign=',
        business: 'exito',
      },
      {
        imageurl:
          'https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-Inicio-12-Mobile-Lenovo.jpg',
        description: 'Lenovo',
        link: 'https://www.exito.com/search/zlenovo?_query=lenovo&map=s,brand&utm_source=clickam&utm_medium=referral&utm_campaign=',
        business: 'exito',
      },
      {
        imageurl:
          'https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-Inicio-13-Mobile-Bronzini.jpg',
        description: 'Bronzini',
        link: 'https://www.exito.com/search?_query=bronzini&utm_source=clickam&utm_medium=referral&utm_campaign=',
        business: 'exito',
      },
      {
        imageurl:
          'https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-Inicio-14-Mobile-Haceb.jpg',
        description: 'HACEB',
        link: 'https://www.exito.com/search/zhaceb?_query=HACEB&map=s,brand&utm_source=clickam&utm_medium=referral&utm_campaign=',
        business: 'exito',
      },
      {
        imageurl:
          'https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-Inicio-15-Mobile-Huawei.jpg',
        description: 'HUAWEI',
        link: 'https://www.exito.com/2118/huawei?bgy_leap=1&map=productClusterIds,b&pauta=t&utm_source=clickam&utm_medium=referral&utm_campaign=',
        business: 'exito',
      },
    ],
    web: [],
  };

  let offers = [
    {
      imageurl:
        'https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-Inicio-1-Mobile-Bienvenida.jpg',
      description: 'Bienvenido a Clickam',
      link: 'https://www.exito.com/?utm_source=clickam&utm_medium=referral&utm_campaign=',
      business: 'exito',
    },
    {
      imageurl:
        'https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-Inicio-2-Mobile-Colchones-Paraiso.jpg',
      description: 'Colchones Paraiso',
      link: 'https://www.exito.com/search?_query=colchones%20paraiso&utm_source=clickam&utm_medium=referral&utm_campaign=',
      business: 'exito',
    },
    {
      imageurl:
        'https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-Inicio-3-Mobile-Arkitect.jpg',
      description: 'Arkitect',
      link: 'https://www.exito.com/search?_query=arkitect&utm_source=clickam&utm_medium=referral&utm_campaign=',
      business: 'exito',
    },
    {
      imageurl:
        'https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-Inicio-4-Mobile-Imusa.jpg',
      description: 'IMUSA',
      link: 'https://www.exito.com/search/zimusa?_query=imusa&map=s,brand&utm_source=clickam&utm_medium=referral&utm_campaign=',
      business: 'exito',
    },
    {
      imageurl:
        'https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-Inicio-5-Mobile-Gef-PuntoBlanco.jpg',
      description: 'Gef y Punto Blanco',
      link: 'https://www.exito.com/2738?map=productClusterIds&order=OrderByBestDiscountDESC&utm_source=clickam&utm_medium=referral&utm_campaign=',
      business: 'exito',
    },
    {
      imageurl:
        'https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-Inicio-6-Mobile-exito-com.jpg',
      description: 'Ofertas de exito.com',
      link: 'https://www.exito.com/1259?map=productClusterIds&utm_source=clickam&utm_medium=referral&utm_campaign=',
      business: 'exito',
    },
    {
      imageurl:
        'https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-Inicio-7-Mobile-Nike-Fila-mas.jpg',
      description:
        'Nike, Fila, reebok, Under Armour, SKECHERS, BRONZINI ACTIVE',
      link: 'https://www.exito.com/2244?map=productClusterIds&utm_source=clickam&utm_medium=referral&utm_campaign=',
      business: 'exito',
    },
    {
      imageurl:
        'https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-Inicio-8-Mobile-Finlandek.jpg',
      description: 'Finlandek',
      link: 'https://www.exito.com/search/zfinlandek/zfinlandek-select?_query=finlandek&map=s,brand,brand&utm_source=clickam&utm_medium=referral&utm_campaign=',
      business: 'exito',
    },
    {
      imageurl:
        'https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-Inicio-9-Mobile-Levis.jpg',
      description: 'Levis',
      link: 'https://www.exito.com/2245?map=productClusterIds&utm_source=clickam&utm_medium=referral&utm_campaign=',
      business: 'exito',
    },
    {
      imageurl:
        'https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-Inicio-10-Mobile-SOAT-Carro.jpg',
      description: 'SOAT Carro',
      link: 'https://www.segurosexito.com/soat/p?utm_source=clickam&utm_medium=referral&utm_campaign=',
      business: 'seguros',
    },
    {
      imageurl:
        'https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-Inicio-11-Mobile-Brahma-Aeroflex.jpg',
      description: 'Brahma y Aeroflex',
      link: 'https://www.exito.com/931?map=productClusterIds&utm_source=clickam&utm_medium=referral&utm_campaign=',
      business: 'exito',
    },
    {
      imageurl:
        'https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-Inicio-12-Mobile-Lenovo.jpg',
      description: 'Lenovo',
      link: 'https://www.exito.com/search/zlenovo?_query=lenovo&map=s,brand&utm_source=clickam&utm_medium=referral&utm_campaign=',
      business: 'exito',
    },
    {
      imageurl:
        'https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-Inicio-13-Mobile-Bronzini.jpg',
      description: 'Bronzini',
      link: 'https://www.exito.com/search?_query=bronzini&utm_source=clickam&utm_medium=referral&utm_campaign=',
      business: 'exito',
    },
    {
      imageurl:
        'https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-Inicio-14-Mobile-Haceb.jpg',
      description: 'HACEB',
      link: 'https://www.exito.com/search/zhaceb?_query=HACEB&map=s,brand&utm_source=clickam&utm_medium=referral&utm_campaign=',
      business: 'exito',
    },
    {
      imageurl:
        'https://webclickamdev.blob.core.windows.net/img-ofertas/slider-mobile/Slider-Inicio-15-Mobile-Huawei.jpg',
      description: 'HUAWEI',
      link: 'https://www.exito.com/2118/huawei?bgy_leap=1&map=productClusterIds,b&pauta=t&utm_source=clickam&utm_medium=referral&utm_campaign=',
      business: 'exito',
    },
  ];
  let responseTerms = {
    Status: 'Success',
    objectResponse: [
      {
        sectionValue: 'Contenido',
        sectionTitle: 'Title',
      },
      {
        sectionValue: 'Contenido',
        sectionTitle: 'Title',
      },
      {
        sectionValue: 'Contenido',
        sectionTitle: 'Title',
      },
      {
        sectionValue: 'Contenido',
        sectionTitle: 'Title',
      },
    ],
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        AnonymousModule,
        TranslateModule,
        AppMaterialModule,
        FlexLayoutModule,
        SlickCarouselModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'clicker', component: HomeComponent },
          { path: 'inicio', component: HomeComponent },
        ]),
        BrowserAnimationsModule,
        TranslateModule.forRoot({}),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFireMessagingModule,
        ServiceWorkerModule.register('', { enabled: false }),
        AngularFireModule.initializeApp({
          apiKey: 'AIzaSyBLEXtXZGfMEm6dLHtngNa_HWgEjjrk-14',
          authDomain: 'test-push-notification-633a0.firebaseapp.com',
          databaseURL: 'https://test-push-notification-633a0.firebaseio.com',
          projectId: 'test-push-notification-633a0',
          storageBucket: 'test-push-notification-633a0.appspot.com',
          messagingSenderId: '374253972065',
          appId: '1:374253972065:web:96a6651d3a2f816451d820',
          measurementId: 'G-BESRDNSPL1',
        }),
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
        { provide: UserService, useValue: mockUserService },
        { provide: AuthService, useClass: MockAuthService },
        { provide: UtilsService, useValue: mockUtilsService },
        { provide: ContentService, useValue: mockContentService },
        { provide: MasterDataService, useValue: mockMasterService },
        // { provide: LinksService, useValue: mockLinksService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    mockMasterService.getTerms.and.returnValue(of(responseTerms));
    mockUserService.activateProfile.and.returnValue(of(data));
    mockUserService.saveFeedback.and.returnValue(of(data));
    mockUserService.getuserdata.and.returnValue(of(dataUserC));
    mockUserService.saveUserAcceptTermsReferrals.and.returnValue(of(dataTerms));
    mockUserService.getProfile.and.returnValue();
    mockUtilsService.showRegisterForm.and.returnValue({});
    mockContentService.getNews.and.returnValue(of(news));
    mockContentService.getOffersbyType.and.returnValue(of(offers));
    mockContentService.getBusiness.and.returnValue(of(business));
    mockContentService.getBusinessClicker.and.returnValue(of(business));
    mockContentService.getPopupus.and.returnValue(of(popups));
    mockContentService.getCategoriesBusinessHome.and.returnValue(of(business));
    mockContentService.getStories.and.returnValue(of(getStories));
  }));

  beforeEach(() => {
    localStorage.setItem('Amount', '10000');
    localStorage.setItem(
      'ACCESS_TOKEN',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInVzZXJOYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInJvbGUiOiJDTElDS0VSIiwiZXhwIjoxNTcxODY2MDgwLCJpc3MiOiJwcmFjdGluY2FuZXRjb3JlLmNvbSIsImF1ZCI6IkVzdHVkaWFudGVzIn0.UJahw9VBALxwYizSTppjGJYnr618EKlaFW-d3YLugnU'
    );
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    spyOn(Swal, 'fire').and.returnValue(
      Promise.resolve<any>({
        title: 'Activación exitosa',
        text: 'Activación exitosa',
        type: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonClass: 'accept-activation-alert-success',
      })
    );
    fixture.whenStable().then(() => {
      tick();
      expect(mockAuthService.isLoggedIn).toHaveBeenCalled();
    });
  });

  it('open register', () => {
    component.openRegister();
    expect(mockUtilsService.showRegisterForm).toHaveBeenCalled();
  });

  it('bussiness null', () => {
    localStorage.removeItem('ACCESS_TOKEN');
    component.bussinessNavigation({});
    expect(mockUtilsService.showloginForm).toHaveBeenCalled();
  });

  it('bussiness info', () => {
    let params = {
      id: '12345',
      code: '1',
      infoAditional: 'hasta 9.6%',
      imageurl: 'assets/img/banners/negocios/exito-pc.jpg',
    };

    component.bussinessNavigation(params);
    expect(params).toBeDefined();
  });

  it('open register bussiness', () => {
    component.openRegisterBusiness();
  });

  it('send Referals Term', () => {
    component.sendReferalsTerm();
    expect(mockUserService.saveUserAcceptTermsReferrals).toHaveBeenCalled();
  });

  it('show terms', () => {
    component.stepTerms = false;
    component.newTermsHTML = true;
    component.showTerms();
    expect(component.stepTerms).toBeFalsy();
    expect(component.newTermsHTML).toBeTruthy();
  });

  // it('modal promo', () => {
  //   component.getModalPromo();
  //   expect(mockContentService.getPopupus).toHaveBeenCalled();
  // });

  // it('send data', () => {

  //   let dataForm = {
  //     description: 'pruebas',
  //     website: 'https://www.google.com',
  //     contactname: 'David',
  //     contactphone: '3000000000',
  //     contactemail: 'dbj@test.com',
  //     category: 'Comercio',
  //     acceptTerms: true,
  //     acceptHabeasData: true,
  //   };

  //   component.sendDataBusiness(dataForm);
  //   mockContentService.registerBusinessClicker.and.returnValue(of(dataBussiness));
  //   expect(mockContentService.registerBusinessClicker).toHaveBeenCalled();
  // });

  // it('getamount', () => {
  //   mockLinksService.getAmount.and.returnValue(of(amount));
  //   component.getAmount();
  //   expect(mockLinksService.getAmount).toHaveBeenCalled();
  // });

  describe('Error activation', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        tick();
        mockUserService.activateProfile.and.returnValue(of(dataError));
        mockAuthService.isLoggedIn.and.returnValue(false);
      });
    });

    it('error activation', () => {
      component.ngOnInit();
      spyOn(Swal, 'fire').and.returnValue(
        Promise.resolve<any>({
          title: 'Activación errónea',
          text: 'Activación errónea',
          type: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonClass: 'accept-activation-alert-error',
        })
      );
      component.activateUser();
      fixture.whenStable().then(() => {
        tick();
        expect(mockAuthService.isLoggedIn).toHaveBeenCalled();
        expect(mockUserService.activateProfile).toHaveBeenCalled();
      });
    });
  });

  describe('invalid request', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      mockUserService.activateProfile.and.returnValue(
        throwError(invalidRquest)
      );
      mockAuthService.isLoggedIn.and.returnValue(false);
    });

    it('invalid request', () => {
      component.ngOnInit();
      spyOn(Swal, 'fire').and.returnValue(
        Promise.resolve<any>({
          title: 'Error',
          text: 'Internal server error',
          type: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonClass: 'accept-activation-alert-invalid',
        })
      );
      component.activateUser();
      fixture.whenStable().then(() => {
        tick();
        expect(mockAuthService.isLoggedIn).toHaveBeenCalled();
        expect(mockUserService.activateProfile).toHaveBeenCalled();
      });
    });
  });

  describe('is loged', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        tick();
        mockAuthService.login.and.returnValue(of(dataUser));
        mockAuthService.isLoggedIn.and.returnValue(true);
      });
    });

    it('is loged', () => {
      component.ngOnInit();
      fixture.whenStable().then(() => {
        tick();
        expect(mockAuthService.isLoggedIn).toHaveBeenCalled();
      });
    });
  });
});
