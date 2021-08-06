import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { JwtModule } from "@auth0/angular-jwt";
import { TranslateModule } from "@ngx-translate/core";
import { of } from "rxjs";
import { AppMaterialModule } from "src/app/modules/shared/app-material/app-material.module";
import { ContentService } from "src/app/services/content.service";
import { DialogStoryComponent } from "../../components/dialog-story/dialog-story.component";

import { StoriesComponent } from "./stories.component";

export class MatDialogMock {
  open() {
    return {
      beforeClosed: () => of(true),
    };
  }
  closeAll() {
    return {
      closeAll: () => of(true),
    };
  }
}

describe("StoriesComponent", () => {
  let component: StoriesComponent;
  let fixture: ComponentFixture<StoriesComponent>;

  const mockContentService = jasmine.createSpyObj("ContentService", [
    "getAllBusiness",
    "getStoriesadmin",
    "deleteStories"
  ]);
  
  const resp = {
    state: "Success",
    userMessage: "",
    objectResponse: []
  };
  
  let allBusiness = [
    {
      id: 1,
      code: "exito",
      imageurl:
        "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-exito.svg",
      infoaditional: "Hasta 9.6% de ganancia",
      description: "Almacenes Éxito",
      orderby: 1,
      active: false,
    },
    {
      id: 14,
      code: "movil-exito",
      imageurl:
        "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-movil-exito.svg",
      infoaditional: "Ahora 10% de comisión",
      description: "Móvil Éxito",
      orderby: 5,
      active: true,
    },
    {
      id: 3,
      code: "seguros",
      imageurl:
        "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-seguros.svg",
      infoaditional: "Hasta $32.000 de ganancia",
      description: "Seguros Éxito",
      orderby: 3,
      active: true,
    },
    {
      id: 4,
      code: "viajes",
      imageurl:
        "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-viajes.svg",
      infoaditional: "Hasta $40.000 de ganancia",
      description: "Viajes Éxito",
      orderby: 4,
      active: true,
    },
    {
      id: 5,
      code: "wesura",
      imageurl:
        "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-wesura.svg",
      infoaditional: "Hasta 12.000 de ganancia",
      description: "Wesura",
      orderby: 6,
      active: true,
    },
  ];
  
  const stories = [
    {
      description: "e1",
      id: 43,
      imageurl:
        "https://webclickamdev.blob.core.windows.net/img-ofertas/stories/20210806082635.jpg",
      link: null,
      idbusiness: 1,
      infoaditional: null,
      active: true,
      orderby: null,
      date: "2021-08-06T08:26:35.433",
      new: false,
      datepublish: null,
      extension: "jpg",
    },
    {
      description: "e2",
      id: 44,
      imageurl:
        "https://webclickamdev.blob.core.windows.net/img-ofertas/stories/20210806082650.jpg",
      link: null,
      idbusiness: 1,
      infoaditional: null,
      active: true,
      orderby: null,
      date: "2021-08-06T08:26:50.667",
      new: false,
      datepublish: null,
      extension: "jpg",
    },
  ];

  const dialogMock = {
    close: () => {},
  };

  const matDialog = new MatDialogMock();

  const mockDialog = jasmine.createSpyObj("MatDialog", ["open", "closeAll"]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StoriesComponent, DialogStoryComponent],
      imports: [
        AppMaterialModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({}),
        FormsModule,
        ReactiveFormsModule,
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
        { provide: MatDialog, useValue: matDialog },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: {active: [allBusiness[0]]} },
        { provide: ContentService, useValue: mockContentService }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [DialogStoryComponent]
      }
    }).compileComponents();
    mockContentService.getAllBusiness.and.returnValue(of(allBusiness));
    mockContentService.getStoriesadmin.and.returnValue(of(stories));
    mockContentService.deleteStories.and.returnValue(of(resp));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
    expect(mockContentService.getAllBusiness).toHaveBeenCalled();
  });

  it('change bussines', () => {
    let business =  {
      id: 1,
      code: "exito",
      imageurl:
        "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-exito.svg",
      infoaditional: "Hasta 9.6% de ganancia",
      description: "Almacenes Éxito",
      orderby: 1,
      active: false,
    }
    component.onChangeSelected(business);
    expect(mockContentService.getStoriesadmin).toHaveBeenCalled();
  });
  
  it('delete all stories', () => {
    component.deletetAll();
    expect(mockContentService.deleteStories).toHaveBeenCalled();
  });
  
  it('select all', () => {
    component.selectAll();
    expect(component.active).not.toBeUndefined();
  });

 it('new story', () => {
   component.newStory();
   expect(mockContentService.getStoriesadmin).toHaveBeenCalled();
 });
 
  
  
  

});
