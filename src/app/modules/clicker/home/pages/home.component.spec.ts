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
            sellers: [
              {
                sellerId: "1",
                sellerName: "exito",
                addToCartLink:
                  "https://exito.vtexcommercestable.com.br/checkout/cart/add?sku=625968&qty=1&seller=1&sc=1&price=86390000&cv=cb60055b35fef4d3e4e43fafd350ec59_&sc=1",
                sellerDefault: true,
                commertialOffer: {
                  DeliverySlaSamplesPerRegion: {
                    "0": { DeliverySlaPerTypes: [], Region: null }
                  },
                  Installments: [
                    {
                      Value: 863900.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 1,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express à vista"
                    },
                    {
                      Value: 431950.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 2,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 2 vezes sem juros"
                    },
                    {
                      Value: 287967.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 3,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 3 vezes sem juros"
                    },
                    {
                      Value: 215975.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 4,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 4 vezes sem juros"
                    },
                    {
                      Value: 172780.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 5,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 5 vezes sem juros"
                    },
                    {
                      Value: 143984.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 6,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 6 vezes sem juros"
                    },
                    {
                      Value: 123415.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 7,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 7 vezes sem juros"
                    },
                    {
                      Value: 107988.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 8,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 8 vezes sem juros"
                    },
                    {
                      Value: 95989.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 9,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 9 vezes sem juros"
                    },
                    {
                      Value: 86390.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 10,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 10 vezes sem juros"
                    },
                    {
                      Value: 78537.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 11,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 11 vezes sem juros"
                    },
                    {
                      Value: 71992.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 12,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 12 vezes sem juros"
                    },
                    {
                      Value: 66454.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 13,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 13 vezes sem juros"
                    },
                    {
                      Value: 61708.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 14,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 14 vezes sem juros"
                    },
                    {
                      Value: 57594.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 15,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 15 vezes sem juros"
                    },
                    {
                      Value: 53994.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 16,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 16 vezes sem juros"
                    },
                    {
                      Value: 50818.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 17,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 17 vezes sem juros"
                    },
                    {
                      Value: 47995.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 18,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 18 vezes sem juros"
                    },
                    {
                      Value: 45469.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 19,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 19 vezes sem juros"
                    },
                    {
                      Value: 43195.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 20,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 20 vezes sem juros"
                    },
                    {
                      Value: 41139.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 21,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 21 vezes sem juros"
                    },
                    {
                      Value: 39269.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 22,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 22 vezes sem juros"
                    },
                    {
                      Value: 37561.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 23,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 23 vezes sem juros"
                    },
                    {
                      Value: 35996.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 24,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 24 vezes sem juros"
                    },
                    {
                      Value: 34556.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 25,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 25 vezes sem juros"
                    },
                    {
                      Value: 33227.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 26,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 26 vezes sem juros"
                    },
                    {
                      Value: 31997.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 27,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 27 vezes sem juros"
                    },
                    {
                      Value: 30854.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 28,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 28 vezes sem juros"
                    },
                    {
                      Value: 29790.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 29,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 29 vezes sem juros"
                    },
                    {
                      Value: 28797.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 30,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 30 vezes sem juros"
                    },
                    {
                      Value: 27868.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 31,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 31 vezes sem juros"
                    },
                    {
                      Value: 26997.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 32,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 32 vezes sem juros"
                    },
                    {
                      Value: 26179.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 33,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 33 vezes sem juros"
                    },
                    {
                      Value: 25409.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 34,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 34 vezes sem juros"
                    },
                    {
                      Value: 24683.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 35,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 35 vezes sem juros"
                    },
                    {
                      Value: 23998.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 36,
                      PaymentSystemName: "American Express",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "American Express 36 vezes sem juros"
                    },
                    {
                      Value: 863900.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 1,
                      PaymentSystemName: "Visa",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Visa"
                    },
                    {
                      Value: 431950.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 2,
                      PaymentSystemName: "Visa",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Visa"
                    },
                    {
                      Value: 287967.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 3,
                      PaymentSystemName: "Visa",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Visa"
                    },
                    {
                      Value: 215975.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 4,
                      PaymentSystemName: "Visa",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Visa"
                    },
                    {
                      Value: 863900.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 1,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners à vista"
                    },
                    {
                      Value: 431950.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 2,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 2 vezes sem juros"
                    },
                    {
                      Value: 287967.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 3,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 3 vezes sem juros"
                    },
                    {
                      Value: 215975.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 4,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 4 vezes sem juros"
                    },
                    {
                      Value: 172780.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 5,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 5 vezes sem juros"
                    },
                    {
                      Value: 143984.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 6,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 6 vezes sem juros"
                    },
                    {
                      Value: 123415.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 7,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 7 vezes sem juros"
                    },
                    {
                      Value: 107988.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 8,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 8 vezes sem juros"
                    },
                    {
                      Value: 95989.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 9,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 9 vezes sem juros"
                    },
                    {
                      Value: 86390.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 10,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 10 vezes sem juros"
                    },
                    {
                      Value: 78537.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 11,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 11 vezes sem juros"
                    },
                    {
                      Value: 71992.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 12,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 12 vezes sem juros"
                    },
                    {
                      Value: 66454.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 13,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 13 vezes sem juros"
                    },
                    {
                      Value: 61708.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 14,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 14 vezes sem juros"
                    },
                    {
                      Value: 57594.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 15,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 15 vezes sem juros"
                    },
                    {
                      Value: 53994.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 16,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 16 vezes sem juros"
                    },
                    {
                      Value: 50818.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 17,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 17 vezes sem juros"
                    },
                    {
                      Value: 47995.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 18,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 18 vezes sem juros"
                    },
                    {
                      Value: 45469.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 19,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 19 vezes sem juros"
                    },
                    {
                      Value: 43195.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 20,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 20 vezes sem juros"
                    },
                    {
                      Value: 41139.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 21,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 21 vezes sem juros"
                    },
                    {
                      Value: 39269.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 22,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 22 vezes sem juros"
                    },
                    {
                      Value: 37561.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 23,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 23 vezes sem juros"
                    },
                    {
                      Value: 35996.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 24,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 24 vezes sem juros"
                    },
                    {
                      Value: 34556.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 25,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 25 vezes sem juros"
                    },
                    {
                      Value: 33227.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 26,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 26 vezes sem juros"
                    },
                    {
                      Value: 31997.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 27,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 27 vezes sem juros"
                    },
                    {
                      Value: 30854.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 28,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 28 vezes sem juros"
                    },
                    {
                      Value: 29790.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 29,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 29 vezes sem juros"
                    },
                    {
                      Value: 28797.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 30,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 30 vezes sem juros"
                    },
                    {
                      Value: 27868.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 31,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 31 vezes sem juros"
                    },
                    {
                      Value: 26997.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 32,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 32 vezes sem juros"
                    },
                    {
                      Value: 26179.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 33,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 33 vezes sem juros"
                    },
                    {
                      Value: 25409.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 34,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 34 vezes sem juros"
                    },
                    {
                      Value: 24683.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 35,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 35 vezes sem juros"
                    },
                    {
                      Value: 23998.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 36,
                      PaymentSystemName: "Diners",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Diners 36 vezes sem juros"
                    },
                    {
                      Value: 863900.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 1,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 431950.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 2,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 287967.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 3,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 215975.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 4,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 172780.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 5,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 143984.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 6,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 123415.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 7,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 107988.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 8,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 95989.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 9,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 86390.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 10,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 78537.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 11,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 71992.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 12,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 66454.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 13,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 61708.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 14,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 57594.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 15,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 53994.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 16,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 50818.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 17,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 47995.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 18,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 45469.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 19,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 43195.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 20,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 41139.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 21,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 39269.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 22,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 37561.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 23,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 35996.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 24,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 34556.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 25,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 33227.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 26,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 31997.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 27,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 30854.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 28,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 29790.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 29,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 28797.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 30,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 27868.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 31,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 26997.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 32,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 26179.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 33,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 25409.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 34,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 24683.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 35,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 23998.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 36,
                      PaymentSystemName: "Mastercard",
                      PaymentSystemGroupName: "creditCardPaymentGroup",
                      Name: "Mastercard"
                    },
                    {
                      Value: 863900.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 1,
                      PaymentSystemName: "Pago contra entrega",
                      PaymentSystemGroupName:
                        "custom201PaymentGroupPaymentGroup",
                      Name: "Pago contra entrega à vista"
                    },
                    {
                      Value: 863900.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 1,
                      PaymentSystemName:
                        "Pago en Almacenes Éxito, Carulla, Surtimax y Super Inter",
                      PaymentSystemGroupName:
                        "custom202PaymentGroupPaymentGroup",
                      Name:
                        "Pago en Almacenes Éxito, Carulla, Surtimax y Super Inter à vista"
                    },
                    {
                      Value: 863900.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 1,
                      PaymentSystemName: "Tarjeta Presente",
                      PaymentSystemGroupName:
                        "custom204PaymentGroupPaymentGroup",
                      Name: "Tarjeta Presente à vista"
                    },
                    {
                      Value: 863900.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 1,
                      PaymentSystemName: "Consignación",
                      PaymentSystemGroupName:
                        "custom205PaymentGroupPaymentGroup",
                      Name: "Consignación à vista"
                    },
                    {
                      Value: 863900.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 1,
                      PaymentSystemName: "Tarjeta Éxito",
                      PaymentSystemGroupName: "customPrivate_401PaymentGroup",
                      Name: "Tarjeta Éxito à vista"
                    },
                    {
                      Value: 35996.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 24,
                      PaymentSystemName: "Tarjeta Éxito",
                      PaymentSystemGroupName: "customPrivate_401PaymentGroup",
                      Name: "Tarjeta Éxito 24 vezes sem juros"
                    },
                    {
                      Value: 23998.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 36,
                      PaymentSystemName: "Tarjeta Éxito",
                      PaymentSystemGroupName: "customPrivate_401PaymentGroup",
                      Name: "Tarjeta Éxito 36 vezes sem juros"
                    },
                    {
                      Value: 17998.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 48,
                      PaymentSystemName: "Tarjeta Éxito",
                      PaymentSystemGroupName: "customPrivate_401PaymentGroup",
                      Name: "Tarjeta Éxito 48 vezes sem juros"
                    },
                    {
                      Value: 863900.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 1,
                      PaymentSystemName: "Exito MasterCard",
                      PaymentSystemGroupName: "customPrivate_501PaymentGroup",
                      Name: "Exito MasterCard"
                    },
                    {
                      Value: 431950.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 2,
                      PaymentSystemName: "Exito MasterCard",
                      PaymentSystemGroupName: "customPrivate_501PaymentGroup",
                      Name: "Exito MasterCard"
                    },
                    {
                      Value: 287967.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 3,
                      PaymentSystemName: "Exito MasterCard",
                      PaymentSystemGroupName: "customPrivate_501PaymentGroup",
                      Name: "Exito MasterCard"
                    },
                    {
                      Value: 215975.0,
                      InterestRate: null,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 4,
                      PaymentSystemName: "Exito MasterCard",
                      PaymentSystemGroupName: "customPrivate_501PaymentGroup",
                      Name: "Exito MasterCard"
                    },
                    {
                      Value: 863900.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 1,
                      PaymentSystemName: "Codensa",
                      PaymentSystemGroupName: "customPrivate_502PaymentGroup",
                      Name: "Codensa à vista"
                    },
                    {
                      Value: 431950.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 2,
                      PaymentSystemName: "Codensa",
                      PaymentSystemGroupName: "customPrivate_502PaymentGroup",
                      Name: "Codensa 2 vezes sem juros"
                    },
                    {
                      Value: 287967.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 3,
                      PaymentSystemName: "Codensa",
                      PaymentSystemGroupName: "customPrivate_502PaymentGroup",
                      Name: "Codensa 3 vezes sem juros"
                    },
                    {
                      Value: 215975.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 4,
                      PaymentSystemName: "Codensa",
                      PaymentSystemGroupName: "customPrivate_502PaymentGroup",
                      Name: "Codensa 4 vezes sem juros"
                    },
                    {
                      Value: 172780.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 5,
                      PaymentSystemName: "Codensa",
                      PaymentSystemGroupName: "customPrivate_502PaymentGroup",
                      Name: "Codensa 5 vezes sem juros"
                    },
                    {
                      Value: 143984.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 6,
                      PaymentSystemName: "Codensa",
                      PaymentSystemGroupName: "customPrivate_502PaymentGroup",
                      Name: "Codensa 6 vezes sem juros"
                    },
                    {
                      Value: 123415.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 7,
                      PaymentSystemName: "Codensa",
                      PaymentSystemGroupName: "customPrivate_502PaymentGroup",
                      Name: "Codensa 7 vezes sem juros"
                    },
                    {
                      Value: 107988.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 8,
                      PaymentSystemName: "Codensa",
                      PaymentSystemGroupName: "customPrivate_502PaymentGroup",
                      Name: "Codensa 8 vezes sem juros"
                    },
                    {
                      Value: 95989.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 9,
                      PaymentSystemName: "Codensa",
                      PaymentSystemGroupName: "customPrivate_502PaymentGroup",
                      Name: "Codensa 9 vezes sem juros"
                    },
                    {
                      Value: 86390.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 10,
                      PaymentSystemName: "Codensa",
                      PaymentSystemGroupName: "customPrivate_502PaymentGroup",
                      Name: "Codensa 10 vezes sem juros"
                    },
                    {
                      Value: 78537.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 11,
                      PaymentSystemName: "Codensa",
                      PaymentSystemGroupName: "customPrivate_502PaymentGroup",
                      Name: "Codensa 11 vezes sem juros"
                    },
                    {
                      Value: 71992.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 12,
                      PaymentSystemName: "Codensa",
                      PaymentSystemGroupName: "customPrivate_502PaymentGroup",
                      Name: "Codensa 12 vezes sem juros"
                    },
                    {
                      Value: 47995.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 18,
                      PaymentSystemName: "Codensa",
                      PaymentSystemGroupName: "customPrivate_502PaymentGroup",
                      Name: "Codensa 18 vezes sem juros"
                    },
                    {
                      Value: 35996.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 24,
                      PaymentSystemName: "Codensa",
                      PaymentSystemGroupName: "customPrivate_502PaymentGroup",
                      Name: "Codensa 24 vezes sem juros"
                    },
                    {
                      Value: 23998.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 36,
                      PaymentSystemName: "Codensa",
                      PaymentSystemGroupName: "customPrivate_502PaymentGroup",
                      Name: "Codensa 36 vezes sem juros"
                    },
                    {
                      Value: 17998.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 48,
                      PaymentSystemName: "Codensa",
                      PaymentSystemGroupName: "customPrivate_502PaymentGroup",
                      Name: "Codensa 48 vezes sem juros"
                    },
                    {
                      Value: 863900.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 1,
                      PaymentSystemName: "BANCO DE BOGOTA",
                      PaymentSystemGroupName: "debitPaymentGroup",
                      Name: "BANCO DE BOGOTA à vista"
                    },
                    {
                      Value: 863900.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 1,
                      PaymentSystemName: "BANCO POPULAR",
                      PaymentSystemGroupName: "debitPaymentGroup",
                      Name: "BANCO POPULAR à vista"
                    },
                    {
                      Value: 863900.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 1,
                      PaymentSystemName: "ITAU",
                      PaymentSystemGroupName: "debitPaymentGroup",
                      Name: "ITAU à vista"
                    },
                    {
                      Value: 863900.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 1,
                      PaymentSystemName: "BANCOLOMBIA",
                      PaymentSystemGroupName: "debitPaymentGroup",
                      Name: "BANCOLOMBIA à vista"
                    },
                    {
                      Value: 863900.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 1,
                      PaymentSystemName: "CITIBANK ",
                      PaymentSystemGroupName: "debitPaymentGroup",
                      Name: "CITIBANK  à vista"
                    },
                    {
                      Value: 863900.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 1,
                      PaymentSystemName: "BANCO GNB SUDAMERIS",
                      PaymentSystemGroupName: "debitPaymentGroup",
                      Name: "BANCO GNB SUDAMERIS à vista"
                    },
                    {
                      Value: 863900.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 1,
                      PaymentSystemName: "BANCO BBVA COLOMBIA S.A.",
                      PaymentSystemGroupName: "debitPaymentGroup",
                      Name: "BANCO BBVA COLOMBIA S.A. à vista"
                    },
                    {
                      Value: 863900.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 1,
                      PaymentSystemName: "ITAU",
                      PaymentSystemGroupName: "debitPaymentGroup",
                      Name: "ITAU à vista"
                    },
                    {
                      Value: 863900.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 1,
                      PaymentSystemName: "BANCO COLPATRIA",
                      PaymentSystemGroupName: "debitPaymentGroup",
                      Name: "BANCO COLPATRIA à vista"
                    },
                    {
                      Value: 863900.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 1,
                      PaymentSystemName: "BANCO DE OCCIDENTE",
                      PaymentSystemGroupName: "debitPaymentGroup",
                      Name: "BANCO DE OCCIDENTE à vista"
                    },
                    {
                      Value: 863900.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 1,
                      PaymentSystemName: "BANCO CAJA SOCIAL",
                      PaymentSystemGroupName: "debitPaymentGroup",
                      Name: "BANCO CAJA SOCIAL à vista"
                    },
                    {
                      Value: 863900.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 1,
                      PaymentSystemName: "BANCO AGRARIO",
                      PaymentSystemGroupName: "debitPaymentGroup",
                      Name: "BANCO AGRARIO à vista"
                    },
                    {
                      Value: 863900.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 1,
                      PaymentSystemName: "BANCO DAVIVIENDA",
                      PaymentSystemGroupName: "debitPaymentGroup",
                      Name: "BANCO DAVIVIENDA à vista"
                    },
                    {
                      Value: 863900.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 1,
                      PaymentSystemName: "BANCO AV VILLAS",
                      PaymentSystemGroupName: "debitPaymentGroup",
                      Name: "BANCO AV VILLAS à vista"
                    },
                    {
                      Value: 863900.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 1,
                      PaymentSystemName: "BANCO PROCREDIT",
                      PaymentSystemGroupName: "debitPaymentGroup",
                      Name: "BANCO PROCREDIT à vista"
                    },
                    {
                      Value: 863900.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 1,
                      PaymentSystemName: "BANCO PICHINCHA S.A.",
                      PaymentSystemGroupName: "debitPaymentGroup",
                      Name: "BANCO PICHINCHA S.A. à vista"
                    },
                    {
                      Value: 863900.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 1,
                      PaymentSystemName: "BANCOOMEVA S.A.",
                      PaymentSystemGroupName: "debitPaymentGroup",
                      Name: "BANCOOMEVA S.A. à vista"
                    },
                    {
                      Value: 863900.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 1,
                      PaymentSystemName: "BANCO FALABELLA ",
                      PaymentSystemGroupName: "debitPaymentGroup",
                      Name: "BANCO FALABELLA  à vista"
                    },
                    {
                      Value: 863900.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 1,
                      PaymentSystemName: "BANCO SANTANDER COLOMBIA",
                      PaymentSystemGroupName: "debitPaymentGroup",
                      Name: "BANCO SANTANDER COLOMBIA à vista"
                    },
                    {
                      Value: 863900.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 1,
                      PaymentSystemName: "BANCO COOPERATIVO COOPCENTRAL",
                      PaymentSystemGroupName: "debitPaymentGroup",
                      Name: "BANCO COOPERATIVO COOPCENTRAL à vista"
                    },
                    {
                      Value: 863900.0,
                      InterestRate: 0.0,
                      TotalValuePlusInterestRate: 863900.0,
                      NumberOfInstallments: 1,
                      PaymentSystemName: "NEQUI",
                      PaymentSystemGroupName: "debitPaymentGroup",
                      Name: "NEQUI à vista"
                    }
                  ],
                  DiscountHighLight: [],
                  GiftSkuIds: [],
                  Teasers: [],
                  BuyTogether: [],
                  ItemMetadataAttachment: [],
                  Price: 863900.0,
                  ListPrice: 863900.0,
                  PriceWithoutDiscount: 863900.0,
                  RewardValue: 0.0,
                  PriceValidUntil: "2020-09-27T19:49:10Z",
                  AvailableQuantity: 49,
                  Tax: 0.0,
                  DeliverySlaSamples: [
                    { DeliverySlaPerTypes: [], Region: null }
                  ],
                  GetInfoErrorMessage: null,
                  CacheVersionUsedToCallCheckout:
                    "cb60055b35fef4d3e4e43fafd350ec59_"
                }
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
    fixture.whenStable().then(()=>{
      tick();
      expect(mockProductUserService.getProfile).toHaveBeenCalled();
    })
  });

  it("search products", () => {
    component.searchProductPaginate("cocina");
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
    beforeEach(function() {
      mockProductSearchService.getProductsPagination.and.returnValue(
        of(dataEmpty)
      );
    });

    it("search products not found", () => {
      component.searchProductPaginate("playstation");
      expect(mockProductSearchService.getProductsPagination).toHaveBeenCalled();
    });
  });

  it("product data", () => {
    component.dataProduct(dataProduct);
    expect(mockShortenerService.getShortUrl).toHaveBeenCalled();
  });

  // it('copy input', () => {
  //   const input = `<input _ngcontent-gfe-c2="" class="mat-input-element mat-form-field-autofill-control cdk-text-field-autofill-monitored" formcontrolname="link" id="url" matinput="" placeholder="url" readonly="true" ng-reflect-id="url" ng-reflect-placeholder="url" ng-reflect-value="https://www.exito.com/estufa-s" ng-reflect-readonly="" aria-invalid="false" aria-required="false">`;
  //   component.copyInputMessage(input);
  // });
});
