import { async, ComponentFixture, TestBed, inject } from "@angular/core/testing";

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
import { UserService } from 'src/app/services/user.service';
import { ClickerModule } from '../../../clicker.module';
import { LinksService } from 'src/app/services/links.service';
import { Router } from '@angular/router';

describe("BussinessComponent", () => {
  let component: BussinessComponent;
  let fixture: ComponentFixture<BussinessComponent>;

  const mockContentService = jasmine.createSpyObj("ContentService", [
    "getBusinessContent",
  ]);

  const mockLinksService = jasmine.createSpyObj("LinksService", ["saveLink"]);

  const mockUserService = jasmine.createSpyObj("UserService", ["getShortUrl", "getuserdata"]);

  const mockDialog = jasmine.createSpyObj("MatDialog", ["open"]);

  const mockDialogRef = jasmine.createSpyObj("MatDialogRef", [
    "close",
    "afterClosed",
    "componentInstance"
  ]);

  let dataUserC = {
    acceptTermsDeliver: true
  }

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

  const resp = {
    state: "Success",
    userMessage: "se ha guardado el link",
    objectResponse: 
    {
      id: 2656,
      link: "http://tinyurl.com/t7c5ouj",
      creationDate: "2020-04-03T12:07:15.3146043-05:00",
      userId: 220,
      plu: "C-HOME",
      business: "1",
      identification: null,
    }
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
        { provide: UserService, useValue: mockUserService },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: mockDialog },
        { provide: LinksService, useValue: mockLinksService }
      ]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [DialogComponent]
        }
      })
      .compileComponents();
    mockContentService.getBusinessContent.and.returnValue(of(bussiness));
    mockUserService.getuserdata.and.returnValue(of(dataUserC));
    mockUserService.getShortUrl.and.returnValue(of('http://tynyurl.com/12kusw'));
    mockLinksService.saveLink.and.returnValue(of(resp));
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

  it('go back', inject([Router], (router: Router) => {
    spyOn(router, 'navigate').and.stub();
    component.goback();
    expect(router.navigate).toHaveBeenCalledWith(['./']);
  }));

  it("save link", () => {
    component.urlshorten = "https://tyny.url/xaxa";
    component.identification = "123456789";
    component.plu = "123456";
    component.business = "exito";
    component.date = "2019/09/09";
    component.saveLink();
    expect(mockLinksService.saveLink).toHaveBeenCalled();
  });

  it("save reference", () => {
    component.urlshorten = "https://tyny.url/xaxa";
    component.identification = "123456789";
    component.plu = "123456";
    component.business = "exito";
    component.date = "2019/09/09";
    component.saveLinkReference();
    expect(mockLinksService.saveLink).toHaveBeenCalled();
  });

  it("showReference", () => {
    component.reference = false;
    component.showReference();
    expect(component.reference).toBeTruthy();
  });

  it("data category", () => {
    component.urlshorten = 'http://tynyurl.com/xsxsx';
    component.dataSliderCategory(categorys);
    expect(mockDialog.open).toBeTruthy();
  });

  it("next step", () => {
    component.urlshorten = 'http://tynyurl.com/xsxsx';
    component.showForm = true;
    component.showFormCustomer = false;
    component.nextStep();
    expect(component.showForm).toBeFalsy();
    expect(component.showFormCustomer).toBeTruthy();
  });

  it("back step", () => {
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

  // it('buy', () => {
  //   component.buy();
  // });

  it('get date', () => {
    let date = new Date();
    component.getDate();
    expect(date).toBeDefined();
  });
  
  it("copyInputMessage", () => {
    // const buttonModal = document.querySelector(".gtmInicioClicL");
    // buttonModal.dispatchEvent(new Event("click"));
    const button = document.querySelector("#btnCopy");
    button.dispatchEvent(new Event("click"));
    const nativeElementInput = fixture.nativeElement;
    const input = nativeElementInput.querySelector("input");
    expect(input).not.toBeUndefined();
  });
  
});
