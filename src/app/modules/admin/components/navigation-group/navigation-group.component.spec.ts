import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { JwtModule } from "@auth0/angular-jwt";
import { TranslateModule } from "@ngx-translate/core";
import { AppMaterialModule } from "src/app/modules/shared/app-material/app-material.module";
import { ContentService } from "src/app/services/content.service";
import { NavigationGroupComponent } from "./navigation-group.component";

describe("NavigationGroupComponent", () => {
  let component: NavigationGroupComponent;
  let fixture: ComponentFixture<NavigationGroupComponent>;

  const mockContentService = jasmine.createSpyObj("ContentService", [
    "saveFooterSection",
  ]);
  const dialogMock = {
    close: () => {},
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationGroupComponent],
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
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationGroupComponent);
    component = fixture.componentInstance;
    component.section = {
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
    };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("edit Navigation Group", () => {
    component.editNavigationGroup();
    expect(component).toBeTruthy();
  });

  it("addNavigationItem", () => {
    component.addNavigationItem();
    expect(component).toBeTruthy();
  });

  it("openDeleteNavigationSection", () => {
    component.openDeleteNavigationSection();
    expect(component).toBeTruthy();
  });

  it("editNavigationGroup", () => {
    component.editNavigationGroup();
    expect(component).toBeTruthy();
  });

  it("editNavigationItem", () => {
    component.editNavigationItem({ id: 1, description: "test" });
    expect(component).toBeTruthy();
  });

  it("deleteNavigationItem", () => {
    component.deleteNavigationItem({ id: 1, description: "test" });
    expect(component).toBeTruthy();
  });
});
