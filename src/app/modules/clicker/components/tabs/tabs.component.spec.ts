import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TabsComponent } from "./tabs.component";
import { AppMaterialModule } from "src/app/modules/shared/app-material/app-material.module";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "src/app/modules/shared/shared.module";
import { MatDialogRef, MAT_BOTTOM_SHEET_DATA } from "@angular/material";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { DialogComponent } from "src/app/modules/shared/components/dialog/dialog.component";
import { of } from "rxjs";
import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";
import { ContentService } from "src/app/services/content.service";
import { UserService } from "src/app/services/user.service";
import { SlickCarouselModule } from "ngx-slick-carousel";

describe("TabsComponent", () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;

  const mockContentService = jasmine.createSpyObj("ContentService", [
    "getProductsPagination",
    "getAssured",
    "getTrips",
    "getCategory"
  ]);

  const mockUserService = jasmine.createSpyObj("UserService", ["getShortUrl"]);

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

  let dataok = [
    {
      imageurl:
        "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-seguros/ico-mascota.svg",
      description: "Seguro mascota",
      link:
        "https://www.wesura.com/seguro-mascotas?utm_source=clickam&utm_medium=referral&utm_campaign=mascotas&utm_term=",
      commission: 12000
    },
    {
      imageurl:
        "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-seguros/ico-cel.svg",
      description: "Seguro celulares",
      link:
        "https://www.wesura.com/seguro-celulares?utm_source=clickam&utm_medium=referral&utm_campaign=celulares&utm_term=",
      commission: 12000
    },
    {
      imageurl:
        "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-seguros/ico-soat-carro.svg",
      description: "Soat carro",
      link:
        "https://www.segurosexito.com/soat/p?utm_source=clickam&utm_medium=referral&utm_campaign=soatcarro&utm_term=",
      commission: 32000
    },
    {
      imageurl:
        "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-seguros/ico-soat-moto.svg",
      description: "Soat moto",
      link:
        "https://www.segurosexito.com/soat/p?utm_source=clickam&utm_medium=referral&utm_campaign=soatmoto&utm_term=",
      commission: 8000
    },
    {
      imageurl:
        "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-seguros/ico-smartw.svg",
      description: "Seguro Smartwatch",
      link:
        "https://www.wesura.com/seguro-smartwatch?utm_source=clickam&utm_medium=referral&utm_campaign=smartwatch&utm_term=",
      commission: 12000
    },
    {
      imageurl:
        "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-seguros/ico-tablet.svg",
      description: "Seguro tablet",
      link:
        "https://www.wesura.com/seguro-tabletas?utm_source=clickam&utm_medium=referral&utm_campaign=tabletas&utm_term=",
      commission: 12000
    },
    {
      imageurl:
        "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-seguros/ico-pc.svg",
      description: "Seguro computadores",
      link:
        "https://www.wesura.com/seguro-computadores?utm_source=clickam&utm_medium=referral&utm_campaign=computadores&utm_term=",
      commission: 12000
    },
    {
      imageurl:
        "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-seguros/ico-consola.svg",
      description: "Seguro consola",
      link:
        "https://www.wesura.com/seguro-consolas?utm_source=clickam&utm_medium=referral&utm_campaign=consolas&utm_term=",
      commission: 12000
    },
    {
      imageurl:
        "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-seguros/ico-bici.svg",
      description: "Seguro bicicleta",
      link:
        "https://www.wesura.com/seguro-bicicletas?utm_source=clickam&utm_medium=referral&utm_campaign=bicicletas&utm_term=",
      commission: 12000
    },
    {
      imageurl:
        "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-seguros/ico-moto.svg",
      description: "Seguro moto",
      link:
        "https://www.wesura.com/seguro-motos?utm_source=clickam&utm_medium=referral&utm_campaign=seguromoto&utm_term=",
      commission: 12000
    },
    {
      imageurl:
        "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-seguros/ico-viaje-internacional.svg",
      description: "Seguro viajes nacionales e internacionales",
      link: "https://www.segurosexito.com/seguro-viaje/p",
      commission: 16000
    }
  ];

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
              price: "$1.000.000",
              Teasers: [
                {
                  "<Name>k__BackingField": "coomeva1_49.96_aliado_oct29",
                  "<Conditions>k__BackingField": {
                    "<MinimumQuantity>k__BackingField": 0,
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "RestrictionsBins",
                        "<Value>k__BackingField": "526808"
                      }
                    ]
                  },

                  "<Effects>k__BackingField": {
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "PercentualDiscount",
                        "<Value>k__BackingField": "49.96"
                      }
                    ]
                  }
                }
              ]
            }
          }
        ],
        itemId: "12345489"
      }
    ]
  };

  let dataProduct2 = {
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
              price: "$1.000.000",
              Teasers: [
                {
                  "<Name>k__BackingField": "coomeva1_49.96_aliado_oct29",
                  "<Conditions>k__BackingField": {
                    "<MinimumQuantity>k__BackingField": 0,
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "RestrictionsBins",
                        "<Value>k__BackingField": "526808"
                      }
                    ]
                  },

                  "<Effects>k__BackingField": {
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "PercentualDiscount",
                        "<Value>k__BackingField": "49.96"
                      }
                    ]
                  }
                },
                {
                  "<Name>k__BackingField": "exito1_60_aliado_oct29",
                  "<Conditions>k__BackingField": {
                    "<MinimumQuantity>k__BackingField": 0,
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "RestrictionsBins",
                        "<Value>k__BackingField": "526808"
                      }
                    ]
                  },

                  "<Effects>k__BackingField": {
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "PercentualDiscount",
                        "<Value>k__BackingField": "60"
                      }
                    ]
                  }
                }
              ]
            }
          }
        ],
        itemId: "12345489"
      }
    ]
  };

  let teaserExito2 = {
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
              price: "$1.000.000",
              Teasers: [
                {
                  "<Name>k__BackingField": "coomeva1_49.96_aliado_oct29",
                  "<Conditions>k__BackingField": {
                    "<MinimumQuantity>k__BackingField": 0,
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "RestrictionsBins",
                        "<Value>k__BackingField": "526808"
                      }
                    ]
                  },

                  "<Effects>k__BackingField": {
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "PercentualDiscount",
                        "<Value>k__BackingField": "49.96"
                      }
                    ]
                  }
                },
                {
                  "<Name>k__BackingField": "exito2_60_aliado_oct29",
                  "<Conditions>k__BackingField": {
                    "<MinimumQuantity>k__BackingField": 0,
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "RestrictionsBins",
                        "<Value>k__BackingField": "526808"
                      }
                    ]
                  },

                  "<Effects>k__BackingField": {
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "PercentualDiscount",
                        "<Value>k__BackingField": "60"
                      }
                    ]
                  }
                }
              ]
            }
          }
        ],
        itemId: "12345489"
      }
    ]
  };

  let teaserColpatria1 = {
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
              price: "$1.000.000",
              Teasers: [
                {
                  "<Name>k__BackingField": "colpatria1_60_aliado_oct29",
                  "<Conditions>k__BackingField": {
                    "<MinimumQuantity>k__BackingField": 0,
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "RestrictionsBins",
                        "<Value>k__BackingField": "526808"
                      }
                    ]
                  },

                  "<Effects>k__BackingField": {
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "PercentualDiscount",
                        "<Value>k__BackingField": "49.96"
                      }
                    ]
                  }
                }
              ]
            }
          }
        ],
        itemId: "12345489"
      }
    ]
  };

  let teaserBogota1 = {
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
              price: "$1.000.000",
              Teasers: [
                {
                  "<Name>k__BackingField": "bogota1_49.96_aliado_oct29",
                  "<Conditions>k__BackingField": {
                    "<MinimumQuantity>k__BackingField": 0,
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "RestrictionsBins",
                        "<Value>k__BackingField": "526808"
                      }
                    ]
                  },

                  "<Effects>k__BackingField": {
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "PercentualDiscount",
                        "<Value>k__BackingField": "49.96"
                      }
                    ]
                  }
                }
              ]
            }
          }
        ],
        itemId: "12345489"
      }
    ]
  };

  let teaserColpatriascotiabank1= {
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
              price: "$1.000.000",
              Teasers: [
                {
                  "<Name>k__BackingField": "colpatriascotiabank1_49.96_aliado_oct29",
                  "<Conditions>k__BackingField": {
                    "<MinimumQuantity>k__BackingField": 0,
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "RestrictionsBins",
                        "<Value>k__BackingField": "526808"
                      }
                    ]
                  },

                  "<Effects>k__BackingField": {
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "PercentualDiscount",
                        "<Value>k__BackingField": "49.96"
                      }
                    ]
                  }
                }
              ]
            }
          }
        ],
        itemId: "12345489"
      }
    ]
  };

  let teaserColpatria2= {
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
              price: "$1.000.000",
              Teasers: [
                {
                  "<Name>k__BackingField": "colpatria2_49.96_aliado_oct29",
                  "<Conditions>k__BackingField": {
                    "<MinimumQuantity>k__BackingField": 0,
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "RestrictionsBins",
                        "<Value>k__BackingField": "526808"
                      }
                    ]
                  },

                  "<Effects>k__BackingField": {
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "PercentualDiscount",
                        "<Value>k__BackingField": "49.96"
                      }
                    ]
                  }
                },
                
              ]
            }
          }
        ],
        itemId: "12345489"
      }
    ]
  };

  let teaserColpatriascotiabank2= {
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
              price: "$1.000.000",
              Teasers: [
                {
                  "<Name>k__BackingField": "colpatriascotiabank2_49.96_aliado_oct29",
                  "<Conditions>k__BackingField": {
                    "<MinimumQuantity>k__BackingField": 0,
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "RestrictionsBins",
                        "<Value>k__BackingField": "526808"
                      }
                    ]
                  },

                  "<Effects>k__BackingField": {
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "PercentualDiscount",
                        "<Value>k__BackingField": "49.96"
                      }
                    ]
                  }
                },
                
              ]
            }
          }
        ],
        itemId: "12345489"
      }
    ]
  };

  let teaserscotiabank1= {
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
              price: "$1.000.000",
              Teasers: [
                {
                  "<Name>k__BackingField": "scotiabank1_49.96_aliado_oct29",
                  "<Conditions>k__BackingField": {
                    "<MinimumQuantity>k__BackingField": 0,
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "RestrictionsBins",
                        "<Value>k__BackingField": "526808"
                      }
                    ]
                  },

                  "<Effects>k__BackingField": {
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "PercentualDiscount",
                        "<Value>k__BackingField": "49.96"
                      }
                    ]
                  }
                },
                
              ]
            }
          }
        ],
        itemId: "12345489"
      }
    ]
  };

  let teasersVisa= {
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
              price: "$1.000.000",
              Teasers: [
                {
                  "<Name>k__BackingField": "visa_49.96_aliado_oct29",
                  "<Conditions>k__BackingField": {
                    "<MinimumQuantity>k__BackingField": 0,
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "RestrictionsBins",
                        "<Value>k__BackingField": "526808"
                      }
                    ]
                  },

                  "<Effects>k__BackingField": {
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "PercentualDiscount",
                        "<Value>k__BackingField": "49.96"
                      }
                    ]
                  }
                },
                
              ]
            }
          }
        ],
        itemId: "12345489"
      }
    ]
  };

  let teasersAval = {
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
              price: "$1.000.000",
              Teasers: [
                {
                  "<Name>k__BackingField": "aval_49.96_aliado_oct29",
                  "<Conditions>k__BackingField": {
                    "<MinimumQuantity>k__BackingField": 0,
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "RestrictionsBins",
                        "<Value>k__BackingField": "526808"
                      }
                    ]
                  },

                  "<Effects>k__BackingField": {
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "PercentualDiscount",
                        "<Value>k__BackingField": "49.96"
                      }
                    ]
                  }
                },
                
              ]
            }
          }
        ],
        itemId: "12345489"
      }
    ]
  };

  let teaserOccidente1 = {
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
              price: "$1.000.000",
              Teasers: [
                {
                  "<Name>k__BackingField": "occidente1_49.96_aliado_oct29",
                  "<Conditions>k__BackingField": {
                    "<MinimumQuantity>k__BackingField": 0,
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "RestrictionsBins",
                        "<Value>k__BackingField": "526808"
                      }
                    ]
                  },

                  "<Effects>k__BackingField": {
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "PercentualDiscount",
                        "<Value>k__BackingField": "49.96"
                      }
                    ]
                  }
                },
                
              ]
            }
          }
        ],
        itemId: "12345489"
      }
    ]
  };

  let teaserBogota2 = {
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
              price: "$1.000.000",
              Teasers: [
                {
                  "<Name>k__BackingField": "bogota2_49.96_aliado_oct29",
                  "<Conditions>k__BackingField": {
                    "<MinimumQuantity>k__BackingField": 0,
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "RestrictionsBins",
                        "<Value>k__BackingField": "526808"
                      }
                    ]
                  },

                  "<Effects>k__BackingField": {
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "PercentualDiscount",
                        "<Value>k__BackingField": "49.96"
                      }
                    ]
                  }
                },
                
              ]
            }
          }
        ],
        itemId: "12345489"
      }
    ]
  };

  let teaserMastercard = {
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
              price: "$1.000.000",
              Teasers: [
                {
                  "<Name>k__BackingField": "mastercard_49.96_aliado_oct29",
                  "<Conditions>k__BackingField": {
                    "<MinimumQuantity>k__BackingField": 0,
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "RestrictionsBins",
                        "<Value>k__BackingField": "526808"
                      }
                    ]
                  },

                  "<Effects>k__BackingField": {
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "PercentualDiscount",
                        "<Value>k__BackingField": "49.96"
                      }
                    ]
                  }
                },
                
              ]
            }
          }
        ],
        itemId: "12345489"
      }
    ]
  };
  

  let teaserDavivienda1 = {
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
              price: "$1.000.000",
              Teasers: [
                {
                  "<Name>k__BackingField": "davivienda1_49.96_aliado_oct29",
                  "<Conditions>k__BackingField": {
                    "<MinimumQuantity>k__BackingField": 0,
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "RestrictionsBins",
                        "<Value>k__BackingField": "526808"
                      }
                    ]
                  },

                  "<Effects>k__BackingField": {
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "PercentualDiscount",
                        "<Value>k__BackingField": "49.96"
                      }
                    ]
                  }
                },
                
              ]
            }
          }
        ],
        itemId: "12345489"
      }
    ]
  };
  
  let teaserDavivienda3= {
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
              price: "$1.000.000",
              Teasers: [
                {
                  "<Name>k__BackingField": "davivienda3_49.96_aliado_oct29",
                  "<Conditions>k__BackingField": {
                    "<MinimumQuantity>k__BackingField": 0,
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "RestrictionsBins",
                        "<Value>k__BackingField": "526808"
                      }
                    ]
                  },

                  "<Effects>k__BackingField": {
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "PercentualDiscount",
                        "<Value>k__BackingField": "49.96"
                      }
                    ]
                  }
                },
                
              ]
            }
          }
        ],
        itemId: "12345489"
      }
    ]
  };

  let teaserCodensa1= {
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
              price: "$1.000.000",
              Teasers: [
                {
                  "<Name>k__BackingField": "codensa1_49.96_aliado_oct29",
                  "<Conditions>k__BackingField": {
                    "<MinimumQuantity>k__BackingField": 0,
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "RestrictionsBins",
                        "<Value>k__BackingField": "526808"
                      }
                    ]
                  },

                  "<Effects>k__BackingField": {
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "PercentualDiscount",
                        "<Value>k__BackingField": "49.96"
                      }
                    ]
                  }
                },
                
              ]
            }
          }
        ],
        itemId: "12345489"
      }
    ]
  };
  
  let teaserBancolombia2= {
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
              price: "$1.000.000",
              Teasers: [
                {
                  "<Name>k__BackingField": "bancolombia2_49.96_aliado_oct29",
                  "<Conditions>k__BackingField": {
                    "<MinimumQuantity>k__BackingField": 0,
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "RestrictionsBins",
                        "<Value>k__BackingField": "526808"
                      }
                    ]
                  },

                  "<Effects>k__BackingField": {
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "PercentualDiscount",
                        "<Value>k__BackingField": "49.96"
                      }
                    ]
                  }
                },
                
              ]
            }
          }
        ],
        itemId: "12345489"
      }
    ]
  };
  
  let teaserBancolombia1= {
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
              price: "$1.000.000",
              Teasers: [
                {
                  "<Name>k__BackingField": "bancolombia1_49.96_aliado_oct29",
                  "<Conditions>k__BackingField": {
                    "<MinimumQuantity>k__BackingField": 0,
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "RestrictionsBins",
                        "<Value>k__BackingField": "526808"
                      }
                    ]
                  },

                  "<Effects>k__BackingField": {
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "PercentualDiscount",
                        "<Value>k__BackingField": "49.96"
                      }
                    ]
                  }
                },
                
              ]
            }
          }
        ],
        itemId: "12345489"
      }
    ]
  };
  
  let teaserItau1 = {
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
              price: "$1.000.000",
              Teasers: [
                {
                  "<Name>k__BackingField": "itau1_49.96_aliado_oct29",
                  "<Conditions>k__BackingField": {
                    "<MinimumQuantity>k__BackingField": 0,
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "RestrictionsBins",
                        "<Value>k__BackingField": "526808"
                      }
                    ]
                  },

                  "<Effects>k__BackingField": {
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "PercentualDiscount",
                        "<Value>k__BackingField": "49.96"
                      }
                    ]
                  }
                },
                
              ]
            }
          }
        ],
        itemId: "12345489"
      }
    ]
  };
  
  let teaserPopular1= {
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
              price: "$1.000.000",
              Teasers: [
                {
                  "<Name>k__BackingField": "popular1_49.96_aliado_oct29",
                  "<Conditions>k__BackingField": {
                    "<MinimumQuantity>k__BackingField": 0,
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "RestrictionsBins",
                        "<Value>k__BackingField": "526808"
                      }
                    ]
                  },

                  "<Effects>k__BackingField": {
                    "<Parameters>k__BackingField": [
                      {
                        "<Name>k__BackingField": "PercentualDiscount",
                        "<Value>k__BackingField": "49.96"
                      }
                    ]
                  }
                },
                
              ]
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

  let category = [{
    id: 1,
    ordercategory: 1,
    link:
      "https://www.exito.com/home-mercado?utm_source=clickam&utm_medium=referral&utm_campaign=hoteles&utm_term=",
    imageurl:
      "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-categories/Categoria_mercado.jpg",
    description: "Mercado",
    oncreatedate: "2019-11-18T00:00:00",
    title: "Mercado"
  }];

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
        { provide: ContentService, useValue: mockContentService },
        { provide: UserService, useValue: mockUserService },
        { provide: MatDialogRef, useValue: mockDialogRef },
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
    mockUserService.getShortUrl.and.returnValue(of(shortUrl));
    mockContentService.getProductsPagination.and.returnValue(of(data));
    mockContentService.getAssured.and.returnValue(of(dataok));
    mockContentService.getTrips.and.returnValue(of(dataok));
    mockContentService.getCategory.and.returnValue(of(category));
  }));
  beforeEach(() => {
    localStorage.setItem(
      "ACCESS_TOKEN",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInVzZXJOYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInJvbGUiOiJDTElDS0VSIiwiZXhwIjoxNTcxODY2MDgwLCJpc3MiOiJwcmFjdGluY2FuZXRjb3JlLmNvbSIsImF1ZCI6IkVzdHVkaWFudGVzIn0.UJahw9VBALxwYizSTppjGJYnr618EKlaFW-d3YLugnU"
    );
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
    expect(mockContentService.getProductsPagination).toHaveBeenCalled();
  });

  it("paginate", () => {
    const dataPaginate = {
      previousPageIndex: 0,
      pageIndex: 1,
      pageSize: 5,
      length: 10
    };
    component.pagination(dataPaginate);
    expect(mockContentService.getProductsPagination).toHaveBeenCalled();
  });

  it("product data coomeva", () => {
    component.dataProduct(dataProduct);
    expect(mockUserService.getShortUrl).toHaveBeenCalled();
  });

  it("product data exito", () => {
    component.dataProduct(dataProduct2);
    expect(mockUserService.getShortUrl).toHaveBeenCalled();
  });

  it("product data colpatria 1", () => {
    component.dataProduct(teaserColpatria1);
    expect(mockUserService.getShortUrl).toHaveBeenCalled();
  });

  it("product data exito 2", () => {
    component.dataProduct(teaserExito2);
    expect(mockUserService.getShortUrl).toHaveBeenCalled();
  });

  it("product data bogota 1", () => {
    component.dataProduct(teaserBogota1);
    expect(mockUserService.getShortUrl).toHaveBeenCalled();
  });

  it("product data colpatriascotiabank1", () => {
    component.dataProduct(teaserColpatriascotiabank1);
    expect(mockUserService.getShortUrl).toHaveBeenCalled();
  });

  it("product data colpatria 2", () => {
    component.dataProduct(teaserColpatria2);
    expect(mockUserService.getShortUrl).toHaveBeenCalled();
  });

  it("product data colpatriascotiabank2", () => {
    component.dataProduct(teaserColpatriascotiabank2);
    expect(mockUserService.getShortUrl).toHaveBeenCalled();
  });

  it("product data scotiabank1", () => {
    component.dataProduct(teaserscotiabank1);
    expect(mockUserService.getShortUrl).toHaveBeenCalled();
  });

  it("product data popular1", () => {
    component.dataProduct(teaserPopular1);
    expect(mockUserService.getShortUrl).toHaveBeenCalled();
  });

  it("product data aval", () => {
    component.dataProduct(teasersAval);
    expect(mockUserService.getShortUrl).toHaveBeenCalled();
  });

  it("product data occidente1", () => {
    component.dataProduct(teaserOccidente1);
    expect(mockUserService.getShortUrl).toHaveBeenCalled();
  });

  it("product data bogota2", () => {
    component.dataProduct(teaserBogota2);
    expect(mockUserService.getShortUrl).toHaveBeenCalled();
  });

  it("product data visa", () => {
    component.dataProduct(teasersVisa);
    expect(mockUserService.getShortUrl).toHaveBeenCalled();
  });

  it("product data davivienda1", () => {
    component.dataProduct(teaserDavivienda1);
    expect(mockUserService.getShortUrl).toHaveBeenCalled();
  });

  it("product data davivienda3", () => {
    component.dataProduct(teaserDavivienda3);
    expect(mockUserService.getShortUrl).toHaveBeenCalled();
  });

  it("product data bancolombia2", () => {
    component.dataProduct(teaserBancolombia2);
    expect(mockUserService.getShortUrl).toHaveBeenCalled();
  });

  it("product data bancolombia1", () => {
    component.dataProduct(teaserBancolombia1);
    expect(mockUserService.getShortUrl).toHaveBeenCalled();
  });

  it("product data codensa1", () => {
    component.dataProduct(teaserCodensa1);
    expect(mockUserService.getShortUrl).toHaveBeenCalled();
  });

  it("product data mastercard", () => {
    component.dataProduct(teaserMastercard);
    expect(mockUserService.getShortUrl).toHaveBeenCalled();
  });

  it("product data itau1", () => {
    component.dataProduct(teaserItau1);
    expect(mockUserService.getShortUrl).toHaveBeenCalled();
  });

  it("Assured data", () => {
    component.dataAssured(dataAssured);
    expect(mockUserService.getShortUrl).toHaveBeenCalled();
  });

  it("Trip data", () => {
    component.dataTrip(dataAssured);
    expect(mockUserService.getShortUrl).toHaveBeenCalled();
  });

  it("list assured", () => {
    component.Assured();
    expect(mockContentService.getAssured).toHaveBeenCalled();
  });

  it("list trip", () => {
    component.Trip();
    expect(mockContentService.getTrips).toHaveBeenCalled();
  });

  it("next step", () => {
    component.showForm = false;
    component.nextStep();
    expect(component.showForm).toBeTruthy();
  });

  describe("No results on search", () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TabsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      mockContentService.getProductsPagination.and.returnValue(of(data));
    });

    it("search products not found", () => {
      component.searchProductPaginate("playstation");
      expect(mockContentService.getProductsPagination).toHaveBeenCalled();
    });

    it("save link", () => {
      component.urlshorten = "https://tyny.url/xaxa";
      component.identification = "123456789";
      component.plu = "123456";
      component.business = "exito";
      component.date = "2019/09/09";
      component.saveLink();
    });
  });
});
