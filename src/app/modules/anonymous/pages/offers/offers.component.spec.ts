import { async, ComponentFixture, TestBed, tick } from "@angular/core/testing";

import { OffersComponent } from "./offers.component";
import { TranslateModule } from "@ngx-translate/core";
import { AppMaterialModule } from "src/app/modules/shared/app-material/app-material.module";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { JwtModule } from "@auth0/angular-jwt";
import { RouterTestingModule } from "@angular/router/testing";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatDialogRef, MAT_BOTTOM_SHEET_DATA } from "@angular/material";
import { of } from "rxjs/internal/observable/of";
import { ContentService } from "src/app/services/content.service";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { DialogComponent } from "src/app/modules/shared/components/dialog/dialog.component";
import { ShareButtonsModule } from "@ngx-share/buttons";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/services/auth.service";
import { CardOfferComponent } from '../../components/card-offer/card-offer.component';

describe("OffersComponent", () => {
  let component: OffersComponent;
  let fixture: ComponentFixture<OffersComponent>;

  const mockUserService = jasmine.createSpyObj("UserService", [
    "getShortUrl"
  ]);

  const mockContentService = jasmine.createSpyObj("ContentService", [
    "getOffers"
  ]);

  const mockDialog = jasmine.createSpyObj("MatDialog", ["open"]);

  const mockAuthService = jasmine.createSpyObj("AuthService", ["isLoggedIn"]);

  const mockDialogRef = jasmine.createSpyObj("MatDialogRef", [
    "close",
    "afterClosed",
    "componentInstance"
  ]);

  let data = {
    state: "Success",
    userMessage: "",
    objectResponse: {
      mostsold: [
        {
          id: 3,
          title: "Soat carro",
          description: "Detalle Soat carro",
          link: null,
          imageurl:
            "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-seguros/ico-soat-carro.svg",
          oncreatedate: "2019-11-05T00:00:00",
          price: 10000.0,
          orderoffer: 1,
          mostprominent: false,
          highercommission: false,
          mostsold: true
        },
        {
          id: 6,
          title: "Seguro tablet",
          description: "Detalle Seguro tablet",
          link: null,
          imageurl:
            "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-seguros/ico-tablet.svg",
          oncreatedate: "2019-11-05T00:00:00",
          price: 5000.0,
          orderoffer: 2,
          mostprominent: false,
          highercommission: false,
          mostsold: true
        }
      ],
      highercommission: [
        {
          id: 2,
          title: "Seguro celulares",
          description: "Detalle Seguro celulares",
          link: null,
          imageurl:
            "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-seguros/ico-cel.svg",
          oncreatedate: "2019-11-05T00:00:00",
          price: 5000.0,
          orderoffer: 2,
          mostprominent: false,
          highercommission: true,
          mostsold: false
        },
        {
          id: 5,
          title: "Seguro Smartwatch",
          description: "Detalle Seguro Smartwatch",
          link: null,
          imageurl:
            "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-seguros/ico-smartw.svg",
          oncreatedate: "2019-11-05T00:00:00",
          price: 10000.0,
          orderoffer: 1,
          mostprominent: false,
          highercommission: true,
          mostsold: false
        }
      ],
      mostprominent: [
        {
          id: 1,
          title: "Seguro mascota",
          description: "Detalle Seguro mascota",
          link: null,
          imageurl:
            "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-seguros/ico-mascota.svg",
          oncreatedate: "2019-11-05T00:00:00",
          price: 10000.0,
          orderoffer: 1,
          mostprominent: true,
          highercommission: false,
          mostsold: false
        },
        {
          id: 4,
          title: "Soat moto",
          description: "Detalle Soat moto",
          link: null,
          imageurl:
            "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-seguros/ico-soat-moto.svg",
          oncreatedate: "2019-11-05T00:00:00",
          price: 5000.0,
          orderoffer: 2,
          mostprominent: true,
          highercommission: false,
          mostsold: false
        }
      ]
    }
  };

  let mostprominent = {
    id: 1,
    title: "Seguro mascota",
    description: "Detalle Seguro mascota",
    link: null,
    imageurl:
      "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-seguros/ico-mascota.svg",
    oncreatedate: "2019-11-05T00:00:00",
    price: 10000.0,
    orderoffer: 1,
    mostprominent: true,
    highercommission: false,
    mostsold: false
  };

  const shortUrl = "http://tynyurl.com/xixiaa";

  let userInfo = {
    address: "",
    bank: "Cuenta de nómina",
    bankAccountNumber: "",
    cellphone: "3008526341",
    email: "david.betancur@pragma.com.co",
    fileBankCertificate: "",
    fileIdentificationCard1: "",
    fileIdentificationCard2: "",
    firstNames: "Daniel",
    idType: 1,
    identification: "14725836",
    isEmployeeGrupoExito: true,
    lastNames: "Salamanca",
    password: null,
    receiveCommunications: false,
    state: "Activo",
    stateId: 5,
    typeBankAccount: "",
    userId: 9,
    verified: true
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OffersComponent, DialogComponent, CardOfferComponent],
      imports: [
        TranslateModule.forRoot({}),
        HttpClientTestingModule,
        AppMaterialModule,
        RouterTestingModule.withRoutes([]),
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        ShareButtonsModule,
        SlickCarouselModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem("ACCESS_TOKEN");
            },
            throwNoTokenError: true,
            whitelistedDomains: [],
            blacklistedRoutes: []
          }
        })
      ],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: ContentService, useValue: mockContentService },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: mockDialog }
      ],
      // schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [DialogComponent]
        }
      })
      .compileComponents();
    mockUserService.getShortUrl.and.returnValue(of(shortUrl));
    mockContentService.getOffers.and.returnValue(of(data));
    mockAuthService.isLoggedIn.and.returnValue(true);
  }));

  beforeEach(() => {
    localStorage.setItem(
      "ACCESS_TOKEN",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInVzZXJOYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInJvbGUiOiJDTElDS0VSIiwiZXhwIjoxNTcxODY2MDgwLCJpc3MiOiJwcmFjdGluY2FuZXRjb3JlLmNvbSIsImF1ZCI6IkVzdHVkaWFudGVzIn0.UJahw9VBALxwYizSTppjGJYnr618EKlaFW-d3YLugnU"
    );
    fixture = TestBed.createComponent(OffersComponent);
    component = fixture.componentInstance;
    window['slick'] = [];
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
    expect(mockContentService.getOffers).toHaveBeenCalled();
  });

  it("data product", () => {
    component.dataProduct(mostprominent);
    expect(mockUserService.getShortUrl).toHaveBeenCalled();
  });

  it("save link", () => {
    component.urlshorten = "https://tyny.url/xaxa";
    component.identification = "123456789";
    component.plu = "123456";
    component.business = "exito";
    component.date = "2019/09/09";
    component.saveLink();
  });

  it('next', () => {
    spyOn(component.slickModal, 'slickNext');
    spyOn(component.slickModal2, 'slickNext');
    spyOn(component.slickModal3, 'slickNext');
    component.next();
    component.next2();
    component.next3();
  });
  
  it('prev', () => {
    spyOn(component.slickModal, 'slickPrev');
    spyOn(component.slickModal2, 'slickPrev');
    spyOn(component.slickModal3, 'slickPrev');
    component.prev();
    component.prev2();
    component.prev3();
  });

  it('share mobile', () => {
    component.share();
   });

   it('copyInputMessage', () => {
       const button = document.querySelector('.gtmOfertasClicLinkCopiarLink');
       button.dispatchEvent(new Event('click'));
       const nativeElementInput = fixture.nativeElement;
       const input = nativeElementInput.querySelector('input');
   });
   
  

});
