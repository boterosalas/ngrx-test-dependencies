import { async, ComponentFixture, TestBed, inject, tick } from '@angular/core/testing';

import { BussinessComponent } from './bussiness.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from 'ngx-sharebuttons';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { ContentService } from 'src/app/services/content.service';
import { of } from 'rxjs/internal/observable/of';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DialogComponent } from 'src/app/modules/shared/components/dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from 'src/app/services/user.service';
import { ClickerModule } from '../../clicker.module';
import { LinksService } from 'src/app/services/links.service';
import { Router } from '@angular/router';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Observable } from 'rxjs';
import { HomeComponent } from 'src/app/modules/anonymous/pages/home/home.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BreakpointService } from 'src/app/services/breakpoint.service';

describe('BussinessComponent', () => {
  let component: BussinessComponent;
  let fixture: ComponentFixture<BussinessComponent>;

  const mockContentService = jasmine.createSpyObj('ContentService', [
    'getBusinessContent',
    'biggySearchExito',
    'biggySearchCarulla',
    'getCommissionsByBussiness',
    'getBusinessById',
    'getBusinessByCategory'
  ], {
    bussinessList: []
  });

  const mockBreakPointService = jasmine.createSpyObj('BreakpointService', ['isWidthLessThanBreakpoint']);
  const mockLinksService = jasmine.createSpyObj('LinksService', ['saveLink', 'getSellers']);
  const mockUserService = jasmine.createSpyObj('UserService', ['getShortUrl', 'getuserdata', 'registeruserterms']);
  const mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
  const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close', 'afterClosed', 'componentInstance']);
  let socialAuthServiceMock = jasmine.createSpyObj('socialAuthService', ['authState', 'initState', 'refreshAuthToken', 'signIn', 'signOut']);

  const dataUserC = {
    accepttermsdeliver: true,
  };

  const categorys = {
    id: 25,
    orderby: 26,
    link: 'https://www.exito.com/ferreteria?utm_source=clickam&utm_medium=referral&utm_campaign=',
    imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-content/ferreteria-vehiculos.png',
    description: 'Ferreteria y vehiculos',
    commission: 0,
    idbusiness: 1,
    infoaditional: '',
  };

  const bussiness = [
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

  const info = {
    about: 'Informacion sobre el negocio seleccionado',
    tips: [{ title: 'Tip 1', description: 'Hola mundo' }],
  };

  const comison = [
    {
      commissionvalue: 100000000,
    },
  ];

  const resp = {
    state: 'Success',
    userMessage: 'se ha guardado el link',
    objectResponse: {
      id: 2656,
      link: 'http://tinyurl.com/t7c5ouj',
      creationDate: '2020-04-03T12:07:15.3146043-05:00',
      userId: 220,
      plu: 'C-HOME',
      business: '1',
      identification: null,
    },
  };

  const respseller = {
    state: 'Success',
    userMessage: 'se ha listado los vendedores',
    objectResponse: {
      sellersExito: ['1'],
      sellersMarketPlace: ['10003'],
    },
  };

  const registerOk = {
    state: 'Success',
    userMessage: 'se ha registrado',
    objectResponse: {
      acceptTermsDeliver: true,
    },
  };

  const registerFail = {
    state: 'Error',
    userMessage: 'Ups ha ocurrido un error',
    objectResponse: {
      acceptTermsDeliver: false,
    },
  };

  const products = {
    total: 1000,
    products: [
      {
        skus: [
          {
            reference: '1508076',
            policies: [
              {
                id: '1',
                sellers: [
                  {
                    name: 'carulla',
                    id: '1',
                  },
                ],
              },
            ],
            attributes: [],
            id: '1508076',
            sellers: [
              {
                name: 'carulla',
                id: '1',
              },
            ],
          },
        ],
        year: 0,
        extraData: [],
        release: 1579737600000,
        link: 'nevera-samsung-inverter-no-frost-394-litros-112401',
        wear: 0,
        description:
          '\nContenido suministrado a Almacenes ??xito directamente por SAMSUNG ELECTRONICS COLOMBIA S.A.\n\n\n \n \n \n \n  \n        \n\n         \n            \n                \n                    \n??\n                    \nCongelador Superior\n                    \nEstilo Nevera\n                \n                \n                    \n??\n                    \n368 L / 394 L\n                    \nCapacidad Neta/Bruta\n                \n                \n                    \n??\n                    \nNo Frost\n                    \n??\n                \n                \n                    \n??\n                    \nS??\n                    \nDispensador Agua\n                \n                \n                    \n??\n                    \nNo. Ice Maker Autom??tico\n                    \nDispensador Hielo\n                \n                \n                    \n??\n                    \n10 a??os\n                    \nGarant??a de Compresor\n                \n            \n        \n    \n            \nSiempre Fresco\n    \nLa tecnolog??a Twin Cooling Plus te permite disfrutar de alimentos frescos por m??s tiempo ya que ayuda a preservar su humedad hasta un 70% m??s que los refrigeradores convencionales\n        \n        \n\n        \n            \n                \n                    \n                        \n\n                    \n                \n            \n        \n    \n                \nAlimentos frescos y deliciosos sin malos olores\n    \nEl sistema Twin Cooling Plus, enfr??a los compartimientos de forma separada para prevenir que los malos olores se propaguen del refrigerador al congelador. De este modo, la comida congelada mantiene su sabor original.\n        \n        \n\n        \n            \n                \n                    \n                        \n\n                    \n                \n            \n        \n    \n                \n5 Modos de Conversi??n\n    \nControla la temperatura de tu refrigerador para usar los espacios pasando f??cilmente de congelar a conservar o simplemente a modo apagado para ahorrar energ??a\n        \n        \n\n        \n            \n                \n                    \n                        \n\n                    \n                \n            \n        \n    \n                \nEnfr??a a tu gusto\n    \nCon el simple toque de un bot??n, Power Cool enfr??a tus alimentos y bebidas r??pidamente, mientras que Power Freeze es ideal para congelar o endurecer comidas preparadas y haver m??s hielo.\n        \n        \n\n        \n            \n                \n                    \n                        \n\n                    \n                \n            \n        \n    \n                \nMenor consumo energ??tico\n    \nDigital Inverter ajusta la velocidad del compresor en forma autom??tica para usar menos energ??a, reducir el ruido al m??nimo logrando un rendimiento de larga duraci??n.\n        \n        \n\n        \n            \n                \n                    \n                        \n\n                    \n                \n            \n        \n    \n                \nVea claramente todo lo de adentro\n    \nSu iluminaci??n LED de alta eficiencia es m??s delgada, fr??a y energ??ticamente m??s eficiente que la iluminaci??n convencional. Est?? ubicada en la parte superior y sobre los laterales, iluminando en forma atractiva y brillante cada rinc??n, asegurando        una mejor visibilidad.\n        \n        \n\n        \n            \n                \n                    \n                        \n\n                    \n                \n            \n        \n    \n                \nEspecificaciones\n    \n        \n            \n??\n            \nAlto                \n 178.5                \ncm\n            \n        \n        \n            \n??\n            \nAncho                \n 67.5                \ncm\n            \n        \n        \n            \n??\n            \nProfundidad                \n 66.8                \ncm\n            \n        \n    \n    \n        \nTIPS para medir tu espacio\n        \n            \n??\n            \n??\n            \nMide tu puerta principal:                \nEl domiciliario puede ayudarte a quitar la puerta temporalmente de ser necesario\n            \n        \n        \n            \n??\n            \n??\n            \nRecorre el camino por donde pasar?? el producto                \nMide el espacio de un marco de la puerta a otro\n            \n        \n        \n            \n??\n            \n??\n            \nMide la cabina: con la puerta abierta                \nRevisa, techo, laterales, marcos y mide el espacio en su totalidad\n            \n        \n    \n    \n        \nADVERTENCIA\n        \n??ste art??culo cuenta con 1 a??o de garant??a general por defectos de fabricaci??n y 10 en el compresor, no incluye da??os por uso inadecuado del producto por parte del usuario.\n Comunicarse directamente con Samsung a la l??nea 018000112112. Desde cualquier celular marcando #726. El desmonte de puertas tiene un costo adicional.        \n    \n\n\n',
        discount: 0,
        reference: '112401',
        showIfNotAvailable: true,
        price: 3346900,
        customSort: 0,
        stickers: [
          {
            image: 'cont-samsung-com-843',
            name: 'cont-SAMSUNG-com-843',
            location: 'cluster',
            target: '',
          },
        ],
        id: '112401',
        categories: ['Electrodom??sticos', 'Refrigeraci??n', 'Neveras'],
        stock: 1,
        brand: 'SAMSUNG',
        availableTradePolicies: ['1'],
        timestamp: 1590951369132,
        product: '112401',
        images: [
          {
            value:
              'https://carulla.vteximg.com.br/arquivos/ids/1397660/Nevera-Samsung-Inverter-No-Frost-394-Litros-1508076_a.jpg?v=637261344845070000',
          },
          {
            value:
              'https://carulla.vteximg.com.br/arquivos/ids/1397661/Nevera-Samsung-Inverter-No-Frost-394-Litros-1508076_b.jpg?v=637261344849130000',
          },
          {
            value:
              'https://carulla.vteximg.com.br/arquivos/ids/1397662/Nevera-Samsung-Inverter-No-Frost-394-Litros-1508076_c.jpg?v=637261344850830000',
          },
          {
            value:
              'https://carulla.vteximg.com.br/arquivos/ids/1397663/Nevera-Samsung-Inverter-No-Frost-394-Litros-1508076_d.jpg?v=637261344864430000',
          },
          {
            value:
              'https://carulla.vteximg.com.br/arquivos/ids/1397664/Nevera-Samsung-Inverter-No-Frost-394-Litros-1508076_e.jpg?v=637261344866930000',
          },
          {
            value:
              'https://carulla.vteximg.com.br/arquivos/ids/1397665/Nevera-Samsung-Inverter-No-Frost-394-Litros-1508076_f.jpg?v=637261344868670000',
          },
        ],
        oldPrice: 3346900,
        locationAttributes: [],
        url: '/nevera-samsung-inverter-no-frost-394-litros-112401/p',
        installment: {
          interest: false,
          count: 36,
          value: 92970,
          valueText: '$ 92.970',
        },
        name: 'Nevera Samsung Inverter No Frost 394 Litros',
        boost: {
          newness: 0,
          image: 1,
          revenue: 0,
          discount: 0,
          click: 0.0038786219484371436,
          availableSpecsCount: 0.01694915254237288,
          promotion: 1,
          order: 0,
        },
        extraInfo: {},
        oldPriceText: '$ 3.346.900',
        priceText: '$ 3.346.900',
      },
    ],
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        SharedModule,
        TranslateModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        ShareModule,
        ClickerModule,
        AppMaterialModule,
        RouterTestingModule.withRoutes([
          { path: 'inicio', component: HomeComponent }
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
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        // { provide: SocialAuthService, useValue: { ...socialAuthServiceMock, authState: new Observable() } },
        { provide: ContentService, useValue: mockContentService },
        { provide: BreakpointService, useValue: mockBreakPointService },
        { provide: UserService, useValue: mockUserService },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: mockDialog },
        { provide: LinksService, useValue: mockLinksService },
      ],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [DialogComponent],
        },
      })
      .compileComponents();
    mockBreakPointService.isWidthLessThanBreakpoint.and.returnValue(of(false));
    mockContentService.getBusinessContent.and.returnValue(of(bussiness));
    mockContentService.getBusinessByCategory.and.returnValue(of([]));
    mockUserService.getuserdata.and.returnValue(of(dataUserC));
    mockContentService.getCommissionsByBussiness.and.returnValue(of(comison));
    mockContentService.getBusinessById.and.returnValue(of(info));
    mockUserService.getShortUrl.and.returnValue(of('http://tynyurl.com/12kusw'));
    //getSellers
    mockLinksService.saveLink.and.returnValue(of(resp));
    mockLinksService.getSellers.and.returnValue(of(respseller));
    mockContentService.biggySearchCarulla.and.returnValue(of(products));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BussinessComponent);
    component = fixture.componentInstance;
    window['dataLayer'] = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('save link', () => {
    component.urlshorten = 'https://tyny.url/xaxa';
    component.identification = '123456789';
    component.plu = '123456';
    component.business = 1;
    component.date = '2019/09/09';
    component.saveLink();
    expect(mockLinksService.saveLink).toHaveBeenCalled();
  });

  it('save reference', () => {
    component.urlshorten = 'https://tyny.url/xaxa';
    component.identification = '123456789';
    component.plu = '123456';
    component.business = 1;
    component.date = '2019/09/09';
    component.saveLinkReference();
    expect(mockLinksService.saveLink).toHaveBeenCalled();
  });

  it('showReference', () => {
    component.reference = false;
    component.showReference();
    expect(component.reference).toBeTruthy();
  });

  it('Should set desktop image', () => {
    component.offersImageBreakpoint();
    expect(component.isMobile).toBe(false);
    expect(component.seeOffersImage).toBe('/assets/img/banners/oferts.png');
  });

  it('Should set mobile image', () => {
    mockBreakPointService.isWidthLessThanBreakpoint.and.returnValue(of(true));
    component.offersImageBreakpoint();
    expect(component.isMobile).toBe(true);
    expect(component.seeOffersImage).toBe('/assets/img/banners/oferts_mobile.png');
  });

  it('Should return undefined', () => {
    const element = component.getCurrentBussiness('almacenes-exito');
    expect(element).toBe(undefined);
  });

  it('Should setBussinessInfo correctly', () => {
    const data = {
      id: 7,
      hasproduct: true,
      tips: [],
      description: 'description',
      imageurl: 'imageurl',
      about: 'about',
      phygital: false,
      buttonclickear: true,
      infoaditional: 'infoaditional',
      terms: []
    };
    component.setBussinessInfo(data);
    expect(component.id).toBe(data.id);
    expect(component.hasproduct).toBe(data.hasproduct);
    expect(component.saleTips).toBe(data.tips);
    expect(component.title).toBe(data.description);
    expect(component.image).toBe(data.imageurl);
    expect(component.description).toBe(data.description);
    expect(component.nonEditedContent).toBe(data.about);
    expect(component.infoBussiness).toBe(data.about);
    expect(component.phygital).toBe(data.phygital);
    expect(component.clickear).toBe(data.buttonclickear);
    expect(component.percent).toBe(data.infoaditional);
    expect(component.isLoading).toBe(false);
  });

  it('Should navigate to /negocios', () => {
    const navigateSpy = spyOn((<any>component).router,'navigateByUrl').and.callFake(()=>true);
    component.setBussinessInfo(null);
    expect(navigateSpy).toHaveBeenCalledWith('/negocios');
  })

  it('data category', () => {
    component.urlshorten = 'http://tynyurl.com/xsxsx';
    component.dataSliderCategory('container', categorys);
    expect(mockDialog.open).toBeTruthy();
  });

  it('next step', () => {
    component.urlshorten = 'http://tynyurl.com/xsxsx';
    component.showForm = true;
    component.showFormCustomer = false;
    component.nextStep();
    expect(component.showForm).toBeFalsy();
    expect(component.showFormCustomer).toBeTruthy();
  });

  it('back step', () => {
    component.urlshorten = 'http://tynyurl.com/xsxsx';
    component.showForm = true;
    component.reference = false;
    component.backStep();
    expect(component.showForm).toBeFalsy();
    expect(component.reference).toBeTruthy();
  });

  it('share mobile', () => {
    component.share();
    expect(component.urlshorten).not.toBeUndefined();
  });

  it('get date', () => {
    const date = new Date();
    component.getDate();
    expect(date).toBeDefined();
  });

  it('modal product carulla', () => {
    const product = {
      business: 'carulla',
      image: {
        value: 'https://carulla.vteximg.com.br/arquivos/ids/821167???Pague-5-Lleve-6-720042_a.png?v=637185259801000000',
      },
      oldprice: 7750,
      plu: '131805',
      price: 7300,
      seller: '1',
      title: 'Agua Cristal Pague 5 lleve 6 Pet x 600 ml',
      url: '/agua-600ml-pague-5-lleve-6-131805/p',
    };

    component.id = 2;
    component.dataProduct('container', product);
    expect(product).toBeDefined();
  });

  it('Should get bussiness gtm', () => {
    const text = 'almacenes ??xito';
    const product = '??xito tienda completa';
    const gtm = component.getGTMBussiness(text,product);
    expect(gtm).toBe('gtmNegocioAlmacenesExitoExitoTiendaCompleta');
  })

  it('Should get bussiness gtm when no params', () => {
    const gtm = component.getGTMBussiness();
    expect(gtm).toBe('gtmNegocio');
  })

  describe('search carulla', () => {
    afterAll(() => {
      TestBed.resetTestingModule();
    });

    it('search products carulla', () => {
      component.sellerId = '2';
      component.searchBiggyCarulla('112401');
      expect(mockContentService.biggySearchCarulla).toHaveBeenCalled();
    });
  });
});
