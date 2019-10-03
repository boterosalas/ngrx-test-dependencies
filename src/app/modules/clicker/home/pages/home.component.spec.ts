import { async, ComponentFixture, TestBed, tick } from "@angular/core/testing";

import { HomeComponent } from "./home.component";
import { AppMaterialModule } from "src/app/modules/shared/app-material/app-material.module";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ProductSearchService } from "src/app/services/product-search.service";
import { of } from "rxjs";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { UserService } from "src/app/services/user.service";
import { ShortenerService } from "src/app/services/shortener.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DialogComponent } from "src/app/modules/shared/components/dialog/dialog.component";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { By } from "@angular/platform-browser";
import { SharedModule } from "src/app/modules/shared/shared.module";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const mockProductSearchService = jasmine.createSpyObj(
    "ProductSearchService",
    ["getProductsPagination"]
  );
  const mockProductUserService = jasmine.createSpyObj("UserService", [
    "getProfile"
  ]);
  const mockShortenerService = jasmine.createSpyObj("ShortenerService", [
    "getShortUrl"
  ]);
  const mockDialog = jasmine.createSpyObj("MatDialog", ["open"]);
  const mockDialogRef = jasmine.createSpyObj("MatDialogRef", [
    "close",
    "afterClosed",
    "componentInstance"
  ]);

  let data = {
    total: 26,
    json: [
      {
        productId: "638090",
        productName: "NEVERA C/ESCARCHA 220 L TITANI",
        brand: "HACEB",
        brandId: 4365,
        brandImageUrl: null,
        linkText: "nevera-arf-20497-litros-haceb-con-escarcha-638090",
        productReference: "638090",
        categoryId: "34185508",
        productTitle: null,
        metaTagDescription:
          "Lleva a casa fácil y rápido NEVERA C/ESCARCHA 220 L TITANI.Encuentra aquí calidad y garantía. Compra seguro en éxito.com",
        clusterHighlights: {},
        productClusters: {
          "168": "rich-allproducts",
          "172": "Home-electro",
          "233": "googleshopping",
          "239": "todos",
          "243": "biggy b-search"
        },
        searchableClusters: { "172": "Home-electro", "233": "googleshopping" },
        categories: [
          "/Electrodómesticos/Grandes Electrodomésticos/Refrigeracion/",
          "/Electrodómesticos/Grandes Electrodomésticos/",
          "/Electrodómesticos/"
        ],
        categoriesIds: [
          "/34185087/34185141/34185508/",
          "/34185087/34185141/",
          "/34185087/"
        ],
        link:
          "https://exito.vtexcommercestable.com.br/nevera-arf-20497-litros-haceb-con-escarcha-638090/p",
        Prime: ["S"],
        Garantía: ["3 Años"],
        "Factor Neto": ["1.000"],
        "Atributos Especificación": ["Prime", "Garantía", "Factor Neto"],
        allSpecifications: ["Prime", "Garantía", "Factor Neto"],
        allSpecificationsGroups: ["Atributos Especificación"],
        description: "",
        items: [
          {
            itemId: "625968",
            name: "NEVERA C/ESCARCHA 220 L TITANI",
            nameComplete: "NEVERA C/ESCARCHA 220 L TITANI",
            complementName: "",
            ean: "7704353314830",
            referenceId: [{ Key: "RefId", Value: "625968" }],
            measurementUnit: "un",
            unitMultiplier: 1.0,
            modalType: null,
            isKit: false,
            images: [
              {
                imageId: "290908",
                imageLabel: null,
                imageTag:
                  '<img src="~/arquivos/ids/290908-#width#-#height#/Nevera-Arf-20497-Litros-Haceb-Con-Escarcha-625968_a.jpg?v=636965416761800000" width="#width#" height="#height#" alt="Nevera-Arf-20497-Litros-Haceb-Con-Escarcha-625968_a" id="" />',
                imageUrl:
                  "https://exito.vteximg.com.br/arquivos/ids/290908/Nevera-Arf-20497-Litros-Haceb-Con-Escarcha-625968_a.jpg?v=636965416761800000",
                imageText: "Nevera-Arf-20497-Litros-Haceb-Con-Escarcha-625968_a"
              },
              {
                imageId: "290909",
                imageLabel: null,
                imageTag:
                  '<img src="~/arquivos/ids/290909-#width#-#height#/Nevera-Arf-20497-Litros-Haceb-Con-Escarcha-625968_c.jpg?v=636965416763600000" width="#width#" height="#height#" alt="Nevera-Arf-20497-Litros-Haceb-Con-Escarcha-625968_c" id="" />',
                imageUrl:
                  "https://exito.vteximg.com.br/arquivos/ids/290909/Nevera-Arf-20497-Litros-Haceb-Con-Escarcha-625968_c.jpg?v=636965416763600000",
                imageText: "Nevera-Arf-20497-Litros-Haceb-Con-Escarcha-625968_c"
              }
            ],
            Videos: []
          }
        ]
      }
    ]
  };

  let user = {
    identification: "123456789"
  };

  let dataEmpty = [];

  let dataProduct = {
    linkText: "estufa-322",
    productName: "estufa322",
    productId: "12345687",
    template: null,
    showClose: true,
    buttonClose: "Cerrar"
  };

  const shortUrl = "http://tynyurl.com/xixiaa";

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        AppMaterialModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({}),
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
        SharedModule
      ],
      providers: [
        { provide: ProductSearchService, useValue: mockProductSearchService },
        { provide: UserService, useValue: mockProductUserService },
        { provide: ShortenerService, useValue: mockShortenerService },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialog }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [DialogComponent]
        }
      })
      .compileComponents();
    mockProductUserService.getProfile.and.returnValue(of(user));
    mockShortenerService.getShortUrl.and.returnValue(of(shortUrl));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockProductSearchService.getProductsPagination.and.returnValue(of(data));
  });

  it("should create", () => {
    expect(component).toBeTruthy();
    fixture.whenStable().then(() => {
      tick();
      expect(mockProductUserService.getProfile).toHaveBeenCalled();
    });
  });

  it("search products", () => {
    component.searchProductPaginate("cocina");
    fixture.detectChanges();
    expect(mockProductSearchService.getProductsPagination).toHaveBeenCalled();
  });

  it("paginate", () => {
    const dataPaginate = {
      previousPageIndex: 0,
      pageIndex: 1,
      pageSize: 5,
      length: 10
    };
    component.pagination(dataPaginate);
    expect(mockProductSearchService.getProductsPagination).toHaveBeenCalled();
  });

  describe("No results on search", () => {
    
    beforeEach(() => {

      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      mockProductSearchService.getProductsPagination.and.returnValue(of(dataEmpty));

    });

    it("search products not found", () => {
      component.searchProductPaginate("playstation");
      expect(mockProductSearchService.getProductsPagination).toHaveBeenCalled();
    });

    it("product data", () => {
      component.dataProduct(dataProduct);
      expect(mockShortenerService.getShortUrl).toHaveBeenCalled();
    });
  });
});
