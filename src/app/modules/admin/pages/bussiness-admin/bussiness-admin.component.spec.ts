import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BussinessAdminComponent } from "./bussiness-admin.component";
import { TranslateModule } from "@ngx-translate/core";
import { AppMaterialModule } from "src/app/modules/shared/app-material/app-material.module";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { JwtModule } from "@auth0/angular-jwt";
//import { ContentService } from "src/app/services/content.service";
import { of } from "rxjs/internal/observable/of";
import { ContentService } from "src/app/services/content.service";
import { SharedModule } from "src/app/modules/shared/shared.module";
import { AdminModule } from '../../admin.module';
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { DialogCategoryComponent } from "../../components/dialog-category/dialog-category.component";
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

describe("ControllerAdminComponent", () => {
  let component: BussinessAdminComponent;
  let fixture: ComponentFixture<BussinessAdminComponent>;
  const dialogMock = {
    close: () => { },
    beforeClosed: () => { }
  };
  const audit = {
    state: "Success",
    userMessage: "se ha enviado un correo",
    objectResponse: []
  };
  const error = {
    state: "Error",
    userMessage: "se ha enviado un correo",
    objectResponse: []
  };
  const mockDialog = jasmine.createSpyObj("MatDialog", [
    "open",
    "closeAll"
  ]);
  //const mockDialogR = jasmine.createSpy(component.dialogRef,['beforeClosed'])
  const mockDialogRef = jasmine.createSpyObj("MatDialogRef", [
    "close",
    "afterClosed",
    "componentInstance",
    "event ",
    "beforeClosed"
  ]);
  const mockContentService = jasmine.createSpyObj("ContentService", [
    "getBusinessContent",
    "biggySearchExito",
    "biggySearchCarulla",
    "orderCategory",
    "deleteCategory",
    "getAllBusinessContent"
  ]);

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
      infoaditional: "",
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        AdminModule,
        TranslateModule.forRoot(),
        AppMaterialModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        SharedModule,
        MatDialogModule,
        RouterTestingModule.withRoutes([]),
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
        { provide: ContentService, useValue: mockContentService },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MatDialog, useValue: mockDialog },
      ]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [DialogCategoryComponent]
      }
    })
      .compileComponents();
    mockContentService.getBusinessContent.and.returnValue(of(bussiness));
    mockContentService.getAllBusinessContent.and.returnValue(of(bussiness));
    mockContentService.orderCategory.and.returnValue(of(audit));

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BussinessAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create Admin Buss", () => {
    expect(component).toBeTruthy();
    expect(mockContentService.getAllBusinessContent).toHaveBeenCalled();
  });
  it('save Order', () => {
    mockContentService.orderCategory.and.returnValue(of(audit));
    component.saveOrder([{ id: 1, orderby: 2 }, { id: 2, orderby: 1 }]);
    expect(mockContentService.orderCategory).toHaveBeenCalled();
    mockContentService.orderCategory.and.returnValue(of(error));
    component.saveOrder([{ id: 1, orderby: 2 }, { id: 2, orderby: 1 }]);
    expect(mockContentService.orderCategory).toHaveBeenCalled();
  });
  it('delete a category', () => {
    mockContentService.deleteCategory.and.returnValue(of(audit));
    component.datosEliminar = { id: 1 };
    component.deleteCategoryService();
    expect(mockContentService.deleteCategory).toHaveBeenCalled();
    mockContentService.deleteCategory.and.returnValue(of(error));
    component.datosEliminar = { id: 1 };
    component.deleteCategoryService();
    expect(mockContentService.deleteCategory).toHaveBeenCalled();
  });
  it('cancel delete', () => {

    component.cancelDelete();
    expect(mockDialog.closeAll).toHaveBeenCalled();

    //spyOn(component.dialogRef, 'beforeClosed').and.returnValue(of(audit));
    //component.deleteCategory({ id: 1 });
    //expect(bussiness).not.toBeUndefined();

    //  expect(mockDialogRef.beforeClosed).toHaveBeenCalled();
  });
  //it('delete Category', () => {
  //jasmine.createSpy(component.dialogRef,['beforeClosed']).and.callThrough();
  //  spyOn(component.dialogRef, 'beforeClosed');
  //  component.deleteCategory({ id: 1 });
  //  expect(mockDialogRef.beforeClosed).toHaveBeenCalled();
  //});
  //it('add Category', () => {
  //  component.id = "1";
  //  component.agregarCategory();
  //  expect(bussiness).not.toBeUndefined();
  //});
  //it('edit Category', () => {

  //  component.id = "1";
  //  component.editCategory({ id: 1, description: "Salud", imageurl: "URL", link: "ULR", commission: "2" });
  //  expect(bussiness).not.toBeUndefined();
  //});
});
