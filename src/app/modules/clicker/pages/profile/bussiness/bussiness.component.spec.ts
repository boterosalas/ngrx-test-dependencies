import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BussinessComponent } from "./bussiness.component";
import { SharedModule } from "src/app/modules/shared/shared.module";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatFormFieldModule,
  MatDialogRef,
  MAT_BOTTOM_SHEET_DATA
} from "@angular/material";
import { ShareModule } from "@ngx-share/core";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { JwtModule } from "@auth0/angular-jwt";
import { AppMaterialModule } from "src/app/modules/shared/app-material/app-material.module";
import { ContentService } from "src/app/services/content.service";
import { of } from "rxjs/internal/observable/of";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { DialogComponent } from "src/app/modules/shared/components/dialog/dialog.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommentStmt } from '@angular/compiler';

describe("BussinessComponent", () => {
  let component: BussinessComponent;
  let fixture: ComponentFixture<BussinessComponent>;

  const mockContentService = jasmine.createSpyObj("ContentService", [
    "getBusinessContent"
  ]);

  const mockDialog = jasmine.createSpyObj("MatDialog", ["open"]);

  const mockDialogRef = jasmine.createSpyObj("MatDialogRef", [
    "close",
    "afterClosed",
    "componentInstance"
  ]);

  let categorys = {
    id: 25,
    orderby: 26,
    link:
      "https://www.exito.com/ferreteria?utm_source=clickam&utm_medium=referral&utm_campaign=",
    imageurl:
      "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-content/ferreteria-vehiculos.png",
    description: "Ferreteria y vehiculos",
    commission: 0,
    idbusiness: 1,
    infoaditional: ""
  };

  let bussiness = [
    {
      id: 25,
      orderby: 26,
      link:
        "https://www.exito.com/ferreteria?utm_source=clickam&utm_medium=referral&utm_campaign=",
      imageurl:
        "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-content/ferreteria-vehiculos.png",
      description: "Ferreteria y vehiculos",
      commission: 0,
      idbusiness: 1,
      infoaditional: ""
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BussinessComponent],
      imports: [
        SharedModule,
        TranslateModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        ShareModule,
        AppMaterialModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
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
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: mockDialog }
      ]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [DialogComponent]
        }
      })
      .compileComponents();
    mockContentService.getBusinessContent.and.returnValue(of(bussiness));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BussinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
    expect(mockContentService.getBusinessContent).toHaveBeenCalled();
  });

  it("go back", () => {
    component.goback();
  });

  it("save link", () => {
    component.urlshorten = "https://tyny.url/xaxa";
    component.identification = "123456789";
    component.plu = "123456";
    component.business = "exito";
    component.date = "2019/09/09";
    component.saveLink();
  });

  it("save reference", () => {
    component.urlshorten = "https://tyny.url/xaxa";
    component.identification = "123456789";
    component.plu = "123456";
    component.business = "exito";
    component.date = "2019/09/09";
    component.saveLinkReference();
  });

  it("showReference", () => {
    component.reference = false;
    component.showReference();
    expect(component.reference).toBeTruthy();
  });

  it("data category", () => {
    component.dataCategory(categorys);
    expect(mockDialog.open).toBeTruthy();
  });

  it("next step", () => {
    component.showForm = true;
    component.showFormCustomer = false;
    component.nextStep();
    expect(component.showForm).toBeFalsy();
    expect(component.showFormCustomer).toBeTruthy();
  });

  it('share mobile', () => {
    component.share();
  });

  it('buy', () => {
    component.buy();
  });
  

  it("copyInputMessage", () => {
    // const buttonModal = document.querySelector(".gtmInicioClicL");
    // buttonModal.dispatchEvent(new Event("click"));
    const button = document.querySelector(".gtmInicioClicFiltroExitocomCopiarLink");
    button.dispatchEvent(new Event("click"));
    const nativeElementInput = fixture.nativeElement;
    const input = nativeElementInput.querySelector("input");
  });
  
});
