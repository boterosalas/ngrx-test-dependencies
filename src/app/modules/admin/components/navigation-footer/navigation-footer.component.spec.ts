import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { JwtModule } from "@auth0/angular-jwt";
import { TranslateModule } from "@ngx-translate/core";
import { of } from "rxjs";
import { AppMaterialModule } from "src/app/modules/shared/app-material/app-material.module";
import { ContentService } from "src/app/services/content.service";
import "zone.js/dist/zone-testing";
import { NavigationFooterComponent } from "./navigation-footer.component";

describe("NavigationFooterComponent", () => {
  let component: NavigationFooterComponent;
  let fixture: ComponentFixture<NavigationFooterComponent>;

  const mockDialog = jasmine.createSpyObj("MatDialog", ["open"]);

  const mockContentService = jasmine.createSpyObj("ContentService", [
    "getFooter",
    "saveOrderFooterLinks",
    "saveOrderFooterSections",
    "deleteFooterSection",
    "deleteFooterLink",
  ]);

  let response = {
    Status: "Success",
  };
  
  const dialogMock = {
    close: () => {},
  };

  const sectionsLinks = [
    {
      id: 1,
      description: "Clickam",
      orderby: 1,
      date: "2021-05-25T08:48:42.533",
      links: [
        {
          id: 4,
          idseccion: 1,
          link: "https://www.google.com.co",
          description: "¿Tienes un sitio web? Regístralo Aqui!",
          orderby: 1,
          date: "2021-05-25T09:16:06.897",
        },
        {
          id: 3,
          idseccion: 1,
          link: "https://www.google.com.co",
          description: "Tabla de comisiones",
          orderby: 2,
          date: "2021-05-25T09:15:51.24",
        },
        {
          id: 2,
          idseccion: 1,
          link: "https://www.google.com.co",
          description: "Click Academy",
          orderby: 3,
          date: "2021-05-25T09:15:14.56",
        },
        {
          id: 1,
          idseccion: 1,
          link: "https://www.google.com.co",
          description: "Blog",
          orderby: 4,
          date: "2021-05-25T09:16:35.603",
        },
      ],
    },
    {
      id: 2,
      description: "Soporte",
      orderby: 2,
      date: "2021-05-25T08:49:35.617",
      links: [
        {
          id: 7,
          idseccion: 2,
          link: "https://www.google.com.co",
          description: "Centro de Ayuda",
          orderby: 1,
          date: "2021-05-27T00:00:00",
        },
        {
          id: 8,
          idseccion: 2,
          link: "https://www.google.com.co",
          description: "Whatsapp",
          orderby: 2,
          date: "2021-05-27T00:00:00",
        },
        {
          id: 9,
          idseccion: 2,
          link: "https://www.google.com.co",
          description: "Correo",
          orderby: 3,
          date: "2021-05-27T00:00:00",
        },
      ],
    },
    {
      id: 3,
      description: "Legales",
      orderby: 3,
      date: "2021-05-25T08:49:41.757",
      links: [
        {
          id: 10,
          idseccion: 3,
          link: "https://www.google.com.co",
          description: "Términos y condiciones",
          orderby: 1,
          date: "2021-05-27T00:00:00",
        },
        {
          id: 11,
          idseccion: 3,
          link: "https://www.google.com.co",
          description: "Términos legales del usuario",
          orderby: 2,
          date: "2021-05-27T00:00:00",
        },
        {
          id: 12,
          idseccion: 3,
          link: "https://www.google.com.co",
          description: "Protección de datos",
          orderby: 3,
          date: "2021-05-27T00:00:00",
        },
        {
          id: 13,
          idseccion: 3,
          link: "https://www.google.com.co",
          description: "Programa de referidos",
          orderby: 4,
          date: "2021-05-27T00:00:00",
        },
      ],
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationFooterComponent],
      imports: [
        TranslateModule.forRoot(),
        AppMaterialModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem("ACCESS_TOKEN");
            },
            throwNoTokenError: true,
            whitelistedDomains: [],
            blacklistedRoutes: [],
          },
        }),
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: ContentService, useValue: mockContentService },
        { provide: MatDialog, useValue: mockDialog },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    mockContentService.getFooter.and.returnValue(of(sectionsLinks));
    mockContentService.saveOrderFooterLinks.and.returnValue(of(response));
    mockContentService.saveOrderFooterSections.and.returnValue(of(response));
    mockContentService.deleteFooterSection.and.returnValue(of(response));
    mockContentService.deleteFooterLink.and.returnValue(of(response));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("saveOrderItems", () => {
    component.saveOrderItems([{ id: 1, orderBy: 1 }]);
    expect(mockContentService.saveOrderFooterLinks).toHaveBeenCalled();
  });

  it("saveOrderSections", () => {
    component.saveOrderSections([{ id: 1, orderBy: 1 }]);
    expect(mockContentService.saveOrderFooterSections).toHaveBeenCalled();
  });

  
  it("getSections", () => {
    component.getSections();
    expect(mockContentService.getFooter).toHaveBeenCalled();
  });
});
