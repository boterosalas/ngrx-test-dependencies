import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TabsComponent } from "./tabs.component";
import { AppMaterialModule } from "src/app/modules/shared/app-material/app-material.module";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "src/app/modules/shared/shared.module";
import { ProductSearchService } from "src/app/services/product-search.service";
import { UserService } from "src/app/services/user.service";
import { ShortenerService } from "src/app/services/shortener.service";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MAT_BOTTOM_SHEET_DATA
} from "@angular/material";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { DialogComponent } from "src/app/modules/shared/components/dialog/dialog.component";
import { of } from "rxjs";
import { ContentService } from "src/app/services/content.service";
import { JwtHelperService, JWT_OPTIONS, JwtModule } from "@auth0/angular-jwt";

describe("TabsComponent", () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;

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

  const mockContentService = jasmine.createSpyObj("ContentService", [
    "getAssured",
    "getTrips"
  ]);

  const mockDialog = jasmine.createSpyObj("MatDialog", ["open"]);
  
  const mockDialogRef = jasmine.createSpyObj("MatDialogRef", [
    "close",
    "afterClosed",
    "componentInstance"
  ]);

  let data = {
    total: 1,
    json:
      '[{"productId":"662787","productName":"DETERGENTE PLATOS GREEN APPLE","brand":"HOMECHOICE MARCA EXCLUSIVA","brandId":23187,"brandImageUrl":null,"linkText":"detergente-platos-green-apple-662787","productReference":"662787","categoryId":"34185326","productTitle":null,"metaTagDescription":"Lleva a casa fácil y rápido DETERGENTE PLATOS GREEN APPLE.Encuentra aquí calidad y garantía. Compra seguro en éxito.com","clusterHighlights":{},"productClusters":{"168":"rich-allproducts","170":"prime-alimentos","233":"googleshopping","239":"todos","243":"biggy b-search","245":"mercado-all"},"searchableClusters":{"233":"googleshopping"},"categories":["/Mercado/Aseo Del Hogar/Cuidado De La Cocina/","/Mercado/Aseo Del Hogar/","/Mercado/"],"categoriesIds":["/34185082/34185106/34185326/","/34185082/34185106/","/34185082/"],"link":"https://exito.vtexcommercestable.com.br/detergente-platos-green-apple-662787/p","Prime":["N"],"Factor Neto":["560.000"],"Atributos Especificación":["Prime","Factor Neto"],"allSpecifications":["Prime","Factor Neto"],"allSpecificationsGroups":["Atributos Especificación"],"description":"","items":[{"itemId":"443601","name":"DETERGENTE PLATOS GREEN APPLE","nameComplete":"DETERGENTE PLATOS GREEN APPLE","complementName":"","ean":"7707232170145","referenceId":[{"Key":"RefId","Value":"443601"}],"measurementUnit":"un","unitMultiplier":1.0000,"modalType":null,"isKit":false,"images":[{"imageId":"291830","imageLabel":null,"imageTag":"<img src=\\"~/arquivos/ids/291830-#width#-#height#/Detergente-Platos-Green-Apple-443601_a.jpg?v=636965432125070000\\" width=\\"#width#\\" height=\\"#height#\\" alt=\\"Detergente-Platos-Green-Apple-443601_a\\" id=\\"\\" />","imageUrl":"https://exito.vteximg.com.br/arquivos/ids/291830/Detergente-Platos-Green-Apple-443601_a.jpg?v=636965432125070000","imageText":"Detergente-Platos-Green-Apple-443601_a"}],"sellers":[{"sellerId":"1","sellerName":"exito","addToCartLink":"https://exito.vtexcommercestable.com.br/checkout/cart/add?sku=443601&qty=1&seller=1&sc=1&price=101000&cv=9943b02791bd2e975f9283b73c205352_&sc=1","sellerDefault":true,"commertialOffer":{"DeliverySlaSamplesPerRegion":{"0":{"DeliverySlaPerTypes":[],"Region":null}},"Installments":[{"Value":1010.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":1,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express à vista"},{"Value":505.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":2,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 2 vezes sem juros"},{"Value":337.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":3,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 3 vezes sem juros"},{"Value":253.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":4,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 4 vezes sem juros"},{"Value":202.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":5,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 5 vezes sem juros"},{"Value":169.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":6,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 6 vezes sem juros"},{"Value":145.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":7,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 7 vezes sem juros"},{"Value":127.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":8,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 8 vezes sem juros"},{"Value":113.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":9,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 9 vezes sem juros"},{"Value":101.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":10,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 10 vezes sem juros"},{"Value":92.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":11,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 11 vezes sem juros"},{"Value":85.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":12,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 12 vezes sem juros"},{"Value":78.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":13,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 13 vezes sem juros"},{"Value":73.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":14,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 14 vezes sem juros"},{"Value":68.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":15,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 15 vezes sem juros"},{"Value":64.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":16,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 16 vezes sem juros"},{"Value":60.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":17,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 17 vezes sem juros"},{"Value":57.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":18,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 18 vezes sem juros"},{"Value":54.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":19,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 19 vezes sem juros"},{"Value":51.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":20,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 20 vezes sem juros"},{"Value":49.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":21,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 21 vezes sem juros"},{"Value":46.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":22,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 22 vezes sem juros"},{"Value":44.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":23,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 23 vezes sem juros"},{"Value":43.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":24,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 24 vezes sem juros"},{"Value":41.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":25,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 25 vezes sem juros"},{"Value":39.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":26,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 26 vezes sem juros"},{"Value":38.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":27,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 27 vezes sem juros"},{"Value":37.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":28,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 28 vezes sem juros"},{"Value":35.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":29,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 29 vezes sem juros"},{"Value":34.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":30,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 30 vezes sem juros"},{"Value":33.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":31,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 31 vezes sem juros"},{"Value":32.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":32,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 32 vezes sem juros"},{"Value":31.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":33,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 33 vezes sem juros"},{"Value":30.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":34,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 34 vezes sem juros"},{"Value":29.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":35,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 35 vezes sem juros"},{"Value":29.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":36,"PaymentSystemName":"American Express","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"American Express 36 vezes sem juros"},{"Value":1010.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":1,"PaymentSystemName":"Visa","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Visa"},{"Value":505.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":2,"PaymentSystemName":"Visa","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Visa"},{"Value":337.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":3,"PaymentSystemName":"Visa","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Visa"},{"Value":253.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":4,"PaymentSystemName":"Visa","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Visa"},{"Value":1010.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":1,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners à vista"},{"Value":505.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":2,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 2 vezes sem juros"},{"Value":337.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":3,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 3 vezes sem juros"},{"Value":253.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":4,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 4 vezes sem juros"},{"Value":202.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":5,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 5 vezes sem juros"},{"Value":169.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":6,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 6 vezes sem juros"},{"Value":145.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":7,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 7 vezes sem juros"},{"Value":127.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":8,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 8 vezes sem juros"},{"Value":113.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":9,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 9 vezes sem juros"},{"Value":101.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":10,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 10 vezes sem juros"},{"Value":92.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":11,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 11 vezes sem juros"},{"Value":85.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":12,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 12 vezes sem juros"},{"Value":78.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":13,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 13 vezes sem juros"},{"Value":73.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":14,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 14 vezes sem juros"},{"Value":68.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":15,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 15 vezes sem juros"},{"Value":64.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":16,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 16 vezes sem juros"},{"Value":60.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":17,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 17 vezes sem juros"},{"Value":57.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":18,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 18 vezes sem juros"},{"Value":54.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":19,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 19 vezes sem juros"},{"Value":51.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":20,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 20 vezes sem juros"},{"Value":49.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":21,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 21 vezes sem juros"},{"Value":46.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":22,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 22 vezes sem juros"},{"Value":44.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":23,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 23 vezes sem juros"},{"Value":43.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":24,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 24 vezes sem juros"},{"Value":41.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":25,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 25 vezes sem juros"},{"Value":39.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":26,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 26 vezes sem juros"},{"Value":38.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":27,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 27 vezes sem juros"},{"Value":37.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":28,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 28 vezes sem juros"},{"Value":35.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":29,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 29 vezes sem juros"},{"Value":34.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":30,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 30 vezes sem juros"},{"Value":33.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":31,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 31 vezes sem juros"},{"Value":32.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":32,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 32 vezes sem juros"},{"Value":31.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":33,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 33 vezes sem juros"},{"Value":30.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":34,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 34 vezes sem juros"},{"Value":29.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":35,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 35 vezes sem juros"},{"Value":29.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":36,"PaymentSystemName":"Diners","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Diners 36 vezes sem juros"},{"Value":1010.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":1,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":505.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":2,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":337.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":3,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":253.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":4,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":202.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":5,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":169.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":6,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":145.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":7,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":127.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":8,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":113.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":9,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":101.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":10,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":92.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":11,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":85.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":12,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":78.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":13,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":73.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":14,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":68.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":15,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":64.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":16,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":60.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":17,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":57.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":18,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":54.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":19,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":51.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":20,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":49.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":21,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":46.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":22,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":44.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":23,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":43.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":24,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":41.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":25,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":39.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":26,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":38.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":27,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":37.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":28,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":35.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":29,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":34.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":30,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":33.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":31,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":32.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":32,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":31.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":33,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":30.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":34,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":29.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":35,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":29.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":36,"PaymentSystemName":"Mastercard","PaymentSystemGroupName":"creditCardPaymentGroup","Name":"Mastercard"},{"Value":1010.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":1,"PaymentSystemName":"Pago contra entrega","PaymentSystemGroupName":"custom201PaymentGroupPaymentGroup","Name":"Pago contra entrega à vista"},{"Value":1010.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":1,"PaymentSystemName":"Pago en Almacenes Éxito, Carulla, Surtimax y Super Inter","PaymentSystemGroupName":"custom202PaymentGroupPaymentGroup","Name":"Pago en Almacenes Éxito, Carulla, Surtimax y Super Inter à vista"},{"Value":1010.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":1,"PaymentSystemName":"Tarjeta Presente","PaymentSystemGroupName":"custom204PaymentGroupPaymentGroup","Name":"Tarjeta Presente à vista"},{"Value":1010.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":1,"PaymentSystemName":"Consignación","PaymentSystemGroupName":"custom205PaymentGroupPaymentGroup","Name":"Consignación à vista"},{"Value":1010.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":1,"PaymentSystemName":"Tarjeta Éxito","PaymentSystemGroupName":"customPrivate_401PaymentGroup","Name":"Tarjeta Éxito à vista"},{"Value":43.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":24,"PaymentSystemName":"Tarjeta Éxito","PaymentSystemGroupName":"customPrivate_401PaymentGroup","Name":"Tarjeta Éxito 24 vezes sem juros"},{"Value":29.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":36,"PaymentSystemName":"Tarjeta Éxito","PaymentSystemGroupName":"customPrivate_401PaymentGroup","Name":"Tarjeta Éxito 36 vezes sem juros"},{"Value":22.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":48,"PaymentSystemName":"Tarjeta Éxito","PaymentSystemGroupName":"customPrivate_401PaymentGroup","Name":"Tarjeta Éxito 48 vezes sem juros"},{"Value":1010.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":1,"PaymentSystemName":"Exito MasterCard","PaymentSystemGroupName":"customPrivate_501PaymentGroup","Name":"Exito MasterCard"},{"Value":505.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":2,"PaymentSystemName":"Exito MasterCard","PaymentSystemGroupName":"customPrivate_501PaymentGroup","Name":"Exito MasterCard"},{"Value":337.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":3,"PaymentSystemName":"Exito MasterCard","PaymentSystemGroupName":"customPrivate_501PaymentGroup","Name":"Exito MasterCard"},{"Value":253.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":4,"PaymentSystemName":"Exito MasterCard","PaymentSystemGroupName":"customPrivate_501PaymentGroup","Name":"Exito MasterCard"},{"Value":202.0,"InterestRate":null,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":5,"PaymentSystemName":"Exito MasterCard","PaymentSystemGroupName":"customPrivate_501PaymentGroup","Name":"Exito MasterCard"},{"Value":1010.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":1,"PaymentSystemName":"Codensa","PaymentSystemGroupName":"customPrivate_502PaymentGroup","Name":"Codensa à vista"},{"Value":505.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":2,"PaymentSystemName":"Codensa","PaymentSystemGroupName":"customPrivate_502PaymentGroup","Name":"Codensa 2 vezes sem juros"},{"Value":337.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":3,"PaymentSystemName":"Codensa","PaymentSystemGroupName":"customPrivate_502PaymentGroup","Name":"Codensa 3 vezes sem juros"},{"Value":253.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":4,"PaymentSystemName":"Codensa","PaymentSystemGroupName":"customPrivate_502PaymentGroup","Name":"Codensa 4 vezes sem juros"},{"Value":202.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":5,"PaymentSystemName":"Codensa","PaymentSystemGroupName":"customPrivate_502PaymentGroup","Name":"Codensa 5 vezes sem juros"},{"Value":169.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":6,"PaymentSystemName":"Codensa","PaymentSystemGroupName":"customPrivate_502PaymentGroup","Name":"Codensa 6 vezes sem juros"},{"Value":145.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":7,"PaymentSystemName":"Codensa","PaymentSystemGroupName":"customPrivate_502PaymentGroup","Name":"Codensa 7 vezes sem juros"},{"Value":127.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":8,"PaymentSystemName":"Codensa","PaymentSystemGroupName":"customPrivate_502PaymentGroup","Name":"Codensa 8 vezes sem juros"},{"Value":113.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":9,"PaymentSystemName":"Codensa","PaymentSystemGroupName":"customPrivate_502PaymentGroup","Name":"Codensa 9 vezes sem juros"},{"Value":101.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":10,"PaymentSystemName":"Codensa","PaymentSystemGroupName":"customPrivate_502PaymentGroup","Name":"Codensa 10 vezes sem juros"},{"Value":92.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":11,"PaymentSystemName":"Codensa","PaymentSystemGroupName":"customPrivate_502PaymentGroup","Name":"Codensa 11 vezes sem juros"},{"Value":85.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":12,"PaymentSystemName":"Codensa","PaymentSystemGroupName":"customPrivate_502PaymentGroup","Name":"Codensa 12 vezes sem juros"},{"Value":57.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":18,"PaymentSystemName":"Codensa","PaymentSystemGroupName":"customPrivate_502PaymentGroup","Name":"Codensa 18 vezes sem juros"},{"Value":43.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":24,"PaymentSystemName":"Codensa","PaymentSystemGroupName":"customPrivate_502PaymentGroup","Name":"Codensa 24 vezes sem juros"},{"Value":29.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":36,"PaymentSystemName":"Codensa","PaymentSystemGroupName":"customPrivate_502PaymentGroup","Name":"Codensa 36 vezes sem juros"},{"Value":22.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":48,"PaymentSystemName":"Codensa","PaymentSystemGroupName":"customPrivate_502PaymentGroup","Name":"Codensa 48 vezes sem juros"},{"Value":1010.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":1,"PaymentSystemName":"BANCO DE BOGOTA","PaymentSystemGroupName":"debitPaymentGroup","Name":"BANCO DE BOGOTA à vista"},{"Value":1010.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":1,"PaymentSystemName":"BANCO POPULAR","PaymentSystemGroupName":"debitPaymentGroup","Name":"BANCO POPULAR à vista"},{"Value":1010.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":1,"PaymentSystemName":"ITAU","PaymentSystemGroupName":"debitPaymentGroup","Name":"ITAU à vista"},{"Value":1010.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":1,"PaymentSystemName":"BANCOLOMBIA","PaymentSystemGroupName":"debitPaymentGroup","Name":"BANCOLOMBIA à vista"},{"Value":1010.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":1,"PaymentSystemName":"CITIBANK ","PaymentSystemGroupName":"debitPaymentGroup","Name":"CITIBANK  à vista"},{"Value":1010.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":1,"PaymentSystemName":"BANCO GNB SUDAMERIS","PaymentSystemGroupName":"debitPaymentGroup","Name":"BANCO GNB SUDAMERIS à vista"},{"Value":1010.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":1,"PaymentSystemName":"BANCO BBVA COLOMBIA S.A.","PaymentSystemGroupName":"debitPaymentGroup","Name":"BANCO BBVA COLOMBIA S.A. à vista"},{"Value":1010.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":1,"PaymentSystemName":"ITAU","PaymentSystemGroupName":"debitPaymentGroup","Name":"ITAU à vista"},{"Value":1010.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":1,"PaymentSystemName":"BANCO COLPATRIA","PaymentSystemGroupName":"debitPaymentGroup","Name":"BANCO COLPATRIA à vista"},{"Value":1010.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":1,"PaymentSystemName":"BANCO DE OCCIDENTE","PaymentSystemGroupName":"debitPaymentGroup","Name":"BANCO DE OCCIDENTE à vista"},{"Value":1010.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":1,"PaymentSystemName":"BANCO CAJA SOCIAL","PaymentSystemGroupName":"debitPaymentGroup","Name":"BANCO CAJA SOCIAL à vista"},{"Value":1010.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":1,"PaymentSystemName":"BANCO AGRARIO","PaymentSystemGroupName":"debitPaymentGroup","Name":"BANCO AGRARIO à vista"},{"Value":1010.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":1,"PaymentSystemName":"BANCO DAVIVIENDA","PaymentSystemGroupName":"debitPaymentGroup","Name":"BANCO DAVIVIENDA à vista"},{"Value":1010.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":1,"PaymentSystemName":"BANCO AV VILLAS","PaymentSystemGroupName":"debitPaymentGroup","Name":"BANCO AV VILLAS à vista"},{"Value":1010.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":1,"PaymentSystemName":"BANCO PROCREDIT","PaymentSystemGroupName":"debitPaymentGroup","Name":"BANCO PROCREDIT à vista"},{"Value":1010.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":1,"PaymentSystemName":"BANCO PICHINCHA S.A.","PaymentSystemGroupName":"debitPaymentGroup","Name":"BANCO PICHINCHA S.A. à vista"},{"Value":1010.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":1,"PaymentSystemName":"BANCOOMEVA S.A.","PaymentSystemGroupName":"debitPaymentGroup","Name":"BANCOOMEVA S.A. à vista"},{"Value":1010.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":1,"PaymentSystemName":"BANCO FALABELLA ","PaymentSystemGroupName":"debitPaymentGroup","Name":"BANCO FALABELLA  à vista"},{"Value":1010.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":1,"PaymentSystemName":"BANCO SANTANDER COLOMBIA","PaymentSystemGroupName":"debitPaymentGroup","Name":"BANCO SANTANDER COLOMBIA à vista"},{"Value":1010.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":1,"PaymentSystemName":"BANCO COOPERATIVO COOPCENTRAL","PaymentSystemGroupName":"debitPaymentGroup","Name":"BANCO COOPERATIVO COOPCENTRAL à vista"},{"Value":1010.0,"InterestRate":0.0,"TotalValuePlusInterestRate":1010.0,"NumberOfInstallments":1,"PaymentSystemName":"NEQUI","PaymentSystemGroupName":"debitPaymentGroup","Name":"NEQUI à vista"}],"DiscountHighLight":[],"GiftSkuIds":[],"Teasers":[],"BuyTogether":[],"ItemMetadataAttachment":[],"Price":1010.0,"ListPrice":22750.0,"PriceWithoutDiscount":1010.0,"RewardValue":0.0,"PriceValidUntil":"2020-10-03T19:49:45.9283029Z","AvailableQuantity":45,"Tax":0.0,"DeliverySlaSamples":[{"DeliverySlaPerTypes":[],"Region":null}],"GetInfoErrorMessage":null,"CacheVersionUsedToCallCheckout":"9943b02791bd2e975f9283b73c205352_"}}],"Videos":[]}]}]'
  };



  let user = {
    identification: "123456789"
  };

  let dataEmpty = {
    state: "Success",
    userMessage: null,
    objectResponse: { total: 0, json: "[]" }
  };

  let dataProduct = {
    linkText: "estufa-322",
    productName: "estufa322",
    productId: "12345687",
    template: null,
    showClose: true,
    buttonClose: "Cerrar",
    title: "estufa-322",
    id: "123456789",
    img: "prueba",
    price: "$1.000.000",
    showCloseIcon: true,
    showProduct: true,
    showshowTitle: false,
    items: [
      {
        images: [{ imageUrl: "pruebas" }],
        sellers: [
          {
            commertialOffer: {
              price: "$1.000.000"
            }
          }
        ],
        itemId: "12345489"
      }
    ]
  };

  let dataAssured = {
    link: "www.exito.com",
    linkText: "estufa-322",
    productName: "estufa322",
    productId: "12345687",
    template: null,
    showClose: true,
    buttonClose: "Cerrar",
    title: "mascota",
    id: "123456789",
    img: "prueba",
    price: "$200000",
    showCloseIcon: true,
    showProduct: true,
    showshowTitle: false,
    business: "viajes",
    objectResponse: [
      {
        imageurl:
          "https://cdn.shopify.com/s/files/1/0025/0986/5071/products/Seguro_mascotas_1024x1024.jpg?v=1548429524",
        description: "Seguro mascota",
        link:
          "https://www.wesura.com/seguro-mascotas?utm_source=pling&utm_medium=app&utm_campaign=wesuraconpling",
        commission: 0
      }
    ]
  };

  let segurosSuccess = {
    state: "Success",
    userMessage: null,
    objectResponse: [
      {
        imageurl:
          "https://cdn.shopify.com/s/files/1/0025/0986/5071/products/Seguro_mascotas_1024x1024.jpg?v=1548429524",
        description: "Seguro mascota",
        link:
          "https://www.wesura.com/seguro-mascotas?utm_source=pling&utm_medium=app&utm_campaign=wesuraconpling",
        commission: 0
      }
    ]
  };

  let ViajeSuccess = {
    state: "Success",
    userMessage: null,
    objectResponse: [
      {
        imageurl:
          "https://cdn.shopify.com/s/files/1/0025/0986/5071/products/Seguro_mascotas_1024x1024.jpg?v=1548429524",
        description: "Seguro mascota",
        link:
          "https://www.wesura.com/seguro-mascotas?utm_source=pling&utm_medium=app&utm_campaign=wesuraconpling",
        commission: 0
      }
    ]
  };

  const shortUrl = "http://tynyurl.com/xixiaa";

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabsComponent],
      imports: [
        AppMaterialModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({}),
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
        SharedModule,
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
        { provide: ProductSearchService, useValue: mockProductSearchService },
        // { provide: UserService, useValue: mockProductUserService },
        { provide: ShortenerService, useValue: mockShortenerService },
        { provide: MatDialogRef, useValue: mockDialogRef },
        // { provide: ContentService, useValue: mockContentService },
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: mockDialog },
        JwtHelperService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [DialogComponent]
        }
      })
      .compileComponents();
      localStorage.setItem(
        "ACCESS_TOKEN",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInVzZXJOYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInJvbGUiOiJDTElDS0VSIiwiZXhwIjoxNTcxODY2MDgwLCJpc3MiOiJwcmFjdGluY2FuZXRjb3JlLmNvbSIsImF1ZCI6IkVzdHVkaWFudGVzIn0.UJahw9VBALxwYizSTppjGJYnr618EKlaFW-d3YLugnU"
      );
    // mockProductUserService.getProfile.and.returnValue(of(user));
    mockShortenerService.getShortUrl.and.returnValue(of(shortUrl));
    mockProductSearchService.getProductsPagination.and.returnValue(of(data));
    // mockContentService.getAssured.and.returnValue(of(segurosSuccess));
    // mockContentService.getTrips.and.returnValue(of(ViajeSuccess));
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
    // expect(mockProductUserService.getProfile).toHaveBeenCalled();
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

  it("product data", () => {
    component.dataProduct(dataProduct);
    expect(mockShortenerService.getShortUrl).toHaveBeenCalled();
  });

  it("Assured data", () => {
    component.dataAssured(dataAssured);
    expect(mockShortenerService.getShortUrl).toHaveBeenCalled();
  });

  it("Trip data", () => {
    component.dataTrip(dataAssured);
    expect(mockShortenerService.getShortUrl).toHaveBeenCalled();
  });

  describe("No results on search", () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TabsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      mockProductSearchService.getProductsPagination.and.returnValue(
        of(dataEmpty)
      );
    });

    it("search products not found", () => {
      component.searchProductPaginate("playstation");
      expect(mockProductSearchService.getProductsPagination).toHaveBeenCalled();
    });

    it('save link', () => {
      component.urlshorten = "https://tyny.url/xaxa";
      component.identification = "123456789";
      component.plu = '123456';
      component.business = 'exito';
      component.date = "2019/09/09"
      component.saveLink();
      
    });

  });
});
