import { async, ComponentFixture, TestBed } from "@angular/core/testing";

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
    state: "Success",
    userMessage: null,
    objectResponse: {
      total: 8,
      json: [
        {
          images: [
            {
              imageUrl: "gato.jpg"
            }
          ],
          sellers: [
            {
              commertialOffer: {
                PriceWithoutDiscount: "100000000"
              }
            }
          ]
        }
      ]
    }
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

    mockProductSearchService.getProductsPagination.and.returnValue(of(data));
    mockProductUserService.getProfile.and.returnValue(of(user));
    mockShortenerService.getShortUrl.and.returnValue(of(shortUrl));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
    expect(mockProductUserService.getProfile).toHaveBeenCalled();
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
