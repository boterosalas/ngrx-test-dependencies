import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs/internal/observable/of";
import { JwtModule } from "@auth0/angular-jwt";
import { TranslateModule } from "@ngx-translate/core";
import { AppMaterialModule } from "src/app/modules/shared/app-material/app-material.module";
import { ContentService } from "src/app/services/content.service";
import { DialogNavigationGroupComponent } from "./dialog-navigation-group.component";

describe("DialogNavigationGroupComponent", () => {
  let component: DialogNavigationGroupComponent;
  let fixture: ComponentFixture<DialogNavigationGroupComponent>;

  const mockContentService = jasmine.createSpyObj("ContentService", [
    "saveFooterSection"
  ]);
  const dialogMock = {
    close: () => { }
  };
  const resp = {
    state: "Success",
    userMessage: "Se ha creado el grupo",
    objectResponse: []
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogNavigationGroupComponent],
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
    mockContentService.saveFooterSection.and.returnValue(of(resp));

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNavigationGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("add navigation section", () => {
    component.data = { edit: 0, orderby: 1 };
    component.dateForm.controls.description.setValue("Nuevo grupo");
    component.saveSection();
    expect(mockContentService.saveFooterSection).toHaveBeenCalled();
  })
});
