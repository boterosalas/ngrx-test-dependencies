import {
  async,
  ComponentFixture,
  TestBed,
  inject,
} from "@angular/core/testing";

import { ReferComponent } from "./refer.component";
import { TranslateModule } from "@ngx-translate/core";
import { AppMaterialModule } from "src/app/modules/shared/app-material/app-material.module";
import { SharedModule } from "src/app/modules/shared/shared.module";
import { ClickerModule } from "../../clicker.module";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { LinksService } from "src/app/services/links.service";
import { of, throwError } from "rxjs";
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe("ReferComponent", () => {
  let component: ReferComponent;
  let fixture: ComponentFixture<ReferComponent>;

  let mockLinksService = jasmine.createSpyObj("LinksService", [
    "saveLinkRefer",
    "getReferrals",
  ]);


  let sendError = {
    objectResponse: null,
    state: "Error",
    userMessage:
      "La persona con el email davidbet2@hotmail.com ya es un clicker",
  };

  let sendOk = {
    objectResponse: null,
    state: "Success",
    userMessage: "Se ha guardado correctament",
  };
  let split = {
    objectResponse: null,
    state: "Success",
    userMessage: "Se ha guardado correctament",
  };

  const InvalidRquest = {
    state: "Error",
    error: {
      userMessage: "Internal server error",
    },
  };

  let referals = {
    state: "Success",
    userMessage: "",
    objectResponse: {
      total: 5,
      referrals: [
        {
          name: "eisner",
          email: "eisner@gmail.com",
          registered: false,
          qualified: false,
          date: "2020-05-13T16:23:55.297",
        },
        {
          name: "eisner271190",
          email: "eisner271190@gmail.com",
          registered: false,
          qualified: false,
          date: "2020-05-13T07:37:54.47",
        },
        {
          name: "eisner27119",
          email: "eisner27119@gmail.com",
          registered: true,
          qualified: false,
          date: "2020-05-13T06:42:12.683",
        },
        {
          name: "eisner271190",
          email: "eisner271190@hotmail.com",
          registered: true,
          qualified: false,
          date: "2019-10-25T22:09:29.707",
        },
        {
          name: "eisner.puerta",
          email: "eisner.puerta@pragma.com.co",
          registered: true,
          qualified: false,
          date: "2019-10-25T20:29:10.283",
        },
      ],
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReferComponent],
      imports: [
        TranslateModule.forRoot(),
        AppMaterialModule,
        SharedModule,
        // ClickerModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,

      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [{ provide: LinksService, useValue: mockLinksService },
      ],
    }).compileComponents();
    mockLinksService.getReferrals.and.returnValue(of(referals));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it("should create", () => {
    expect(component).toBeTruthy();
    expect(mockLinksService.getReferrals).toHaveBeenCalled();
  });

  // it("copyInputMessage", () => {
  //   const button = document.querySelector("#btnCopy");
  //   button.dispatchEvent(new Event("click"));
  //   const nativeElementInput = fixture.nativeElement;
  //   const input = nativeElementInput.querySelector("input");
  //   expect(input).not.toBeUndefined();
  // });

  it("share mobile", () => {
    let url = "http://www.clickam.com.co/inicio?code=ñañito77";
    component.shareEvent(url);
    expect(url).toBeDefined();
  });

  it("go back", inject([Router], (router: Router) => {
    spyOn(router, "navigate").and.stub();
    component.goback();
    expect(router.navigate).toHaveBeenCalledWith(["./"]);
  }));

  it("send email ok", () => {

    mockLinksService.saveLinkRefer.and.returnValue(of(sendOk));
    let email = "davidbet2@hotmail.com";
    component.sendEmail(email);
    expect(mockLinksService.saveLinkRefer).toHaveBeenCalled();
  });

  it("send email error", () => {

    mockLinksService.saveLinkRefer.and.returnValue(of(sendError));

    let email = "davidbet2@hotmail.com";
    component.sendEmail(email);
    expect(mockLinksService.saveLinkRefer).toHaveBeenCalled();
  });

  it("send email invalid request", () => {

    mockLinksService.saveLinkRefer.and.returnValue(throwError(sendError));
    let email = "davidbet2@hotmail.com";
    component.sendEmail(email);
    expect(mockLinksService.saveLinkRefer).toHaveBeenCalled();
  });


  it('token exist', () => {
    localStorage.setItem('ACCESS_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInVzZXJOYW1lIjoiZGF2aWQuYmV0YW5jdXJAcHJhZ21hLmNvbS5jbyIsInJvbGUiOiJDTElDS0VSIiwiZXhwIjoxNTcxODY2MDgwLCJpc3MiOiJwcmFjdGluY2FuZXRjb3JlLmNvbSIsImF1ZCI6IkVzdHVkaWFudGVzIn0.UJahw9VBALxwYizSTppjGJYnr618EKlaFW-d3YLugnU');
    let token = localStorage.getItem(('ACCESS_TOKEN'));
    expect(token).not.toBeUndefined()
  });

});
