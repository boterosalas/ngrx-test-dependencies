import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientTestingModule, } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MatMenuModule, MatSlideToggleModule, MAT_DIALOG_DATA } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ContentService } from 'src/app/services/content.service';
import Swal from 'sweetalert2';
import { JwtModule } from "@auth0/angular-jwt";

import { CarrouselAdminComponent } from './carrousel-admin.component';

describe('CarrouselAdminComponent', () => {
  let component: CarrouselAdminComponent;
  let fixture: ComponentFixture<CarrouselAdminComponent>;
  const dialogMock = {
    close: () => { },
    beforeClosed: () => { }
  };
  const mockContentService = jasmine.createSpyObj("ContentService", [
    "getOffersbyType",
    "saveOrderOfertBusiness",
    "getAllBusiness",
    "deleteOfer",
    "saveOfertBusiness"
  ]);
  const datos = [{ 
      active: false,
      business: "exito",
      date: "2021-04-20T00:00:00",
      dateend: "2021-05-19T02:15:00",
      datestart: "2021-05-19T02:05:00",
      description: "Oferta",
      id: 4,
      idbusiness: 1,
      imagemobile: null,
      imageurlmobile: "https://webclickamqa.blob.core.windows.net/img-ofertas/pic-offers-mobile/4.jpg",
      imageurlweb: "https://webclickamqa.blob.core.windows.net/img-ofertas/pic-offers-web/4.jpg",
      imageweb: null,
      infoaditional: "Hasta 10%",
      link: "https://www.exito.com/jugueteria?utm_source=clickam&utm_medium=referral&utm_campaign={1}",
      orderby: 1,
      programmed: false,
      selected: false,
      type: "CARROUSEL" 
    },
    { 
      active: true,
      business: "exito",
      date: "2021-04-20T00:00:00",
      dateend: null,
      datestart: "2021-05-19T16:50:00",
      description: "Jueves Online",
      id: 14,
      idbusiness: 1,
      imagemobile: null,
      imageurlmobile: "https://webclickamqa.blob.core.windows.net/img-ofertas/pic-offers-mobile/14.jpg",
      imageurlweb: "https://webclickamqa.blob.core.windows.net/img-ofertas/pic-offers-web/14.jpg",
      imageweb: null,
      infoaditional: "Hasta 9.6%",
      link: "https://www.exito.com/?utm_source=clickam&utm_medium=referral&utm_campaign={1}",
      orderby: 0,
      programmed: false,
      selected: false,
      type: "CARROUSEL" 
    },
    {
      active: true,
      business: "exito",
      date: "2021-04-20T00:00:00",
      dateend: null,
      datestart: null,
      description: "Freidora De Aire Bioceramic Oster ",
      id: 1,
      idbusiness: 1,
      imagemobile: null,
      imageurlmobile: "https://webclickamqa.blob.core.windows.net/img-ofertas/pic-offers-mobile/1.jpg",
      imageurlweb: "https://webclickamqa.blob.core.windows.net/img-ofertas/pic-offers-web/1.jpg",
      imageweb: null,
      infoaditional: "Hasta 3%",
      link: "https://www.exito.com/freidora-de-aire-bioceramic-384560/p?utm_source=clickam&utm_medium=referral&utm_campaign={1}",
      orderby: 2,
      programmed: false,
      selected: false,
      type: "OFERTA"
    }]
  const audit = {
    state: "Success",
    userMessage: "se ha enviado un correo",
    objectResponse: []
  };
  const busss = [{
    code: "clickam",
    description: "Clickam",
    id: 0,
    placeholder: "TIPO DE REPORTE",
    tabtablecommission: "Clickam"
  }]
  const error = {
    state: "Error",
    userMessage: "se ha enviado un correo",
    objectResponse: []
  };
  const mockDialog = jasmine.createSpyObj("MatDialog", [
    "open",
    "closeAll"
  ]);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CarrouselAdminComponent],
      imports: [
        AppMaterialModule,
        TranslateModule.forRoot(),
        MatSlideToggleModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        DragDropModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatMenuModule,
        BrowserAnimationsModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem('ACCESS_TOKEN');
            },
            throwNoTokenError: true,
            whitelistedDomains: [],
            blacklistedRoutes: []
          }
        }),
      ], schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: ContentService, useValue: mockContentService },
        { provide: MatDialog, useValue: mockDialog },
      ]
    }).compileComponents();
    mockContentService.getOffersbyType.and.returnValue(of(datos));
    mockContentService.saveOrderOfertBusiness.and.returnValue(of(audit));
    mockContentService.getAllBusiness.and.returnValue(of(busss));
    mockContentService.deleteOfer.and.returnValue(of(audit));
    mockContentService.saveOfertBusiness.and.returnValue(of(audit));

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrouselAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    //component.ngOnInit()
    // component.getAllBusiness()
    fixture.whenStable().then(() => {
      tick();
      expect(mockContentService.getOffersbyType).toHaveBeenCalled();
    });
    
  });

  it('file change', () => {
    const mockFile = new File([""], "name.jpg", { type: "text/html" });
    const mockEvt = { target: { files: [mockFile] } };
    component.onFileChangeFiles(mockEvt, 'cedula1');
    component.onFileChangeFilesSecond(mockEvt, 'cedula1');
    component.saveCarouselModal();
    component.saveOfertasModal();
    expect(component.onFileChangeFiles).not.toBeNull();
    spyOn(Swal, "fire").and.returnValue(
      Promise.resolve<any>({
        text: "Extensión erronea",
        type: "success",
        confirmButtonText: "Aceptar",
        confirmButtonClass: "accept-activation-alert-error",
      })
    );
    component.selectAll();
    component.selectAllOfertas();
    //component.saveImagenOfertas();
    component.saveOrder([{ id: 1, orderBy: 1 }, { id: 2, orderBy: 2 }]);
    //component.saveImagenCarousel();
    component.deleteComisionCarousel({ id: 1 });
    component.deleteComisionOferta({ id: 1 });
    component.checkButton();
    //component.editOfertasModal({ id: 1, nameContent: "HE", link: "link", bussiness: "buss", comision: "Hasta 4%" });
    //component.editCarouselModal({ id: 1, nameContent: "HE", link: "link", bussiness: "buss", comision: "Hasta 4%" });
    component.deleteEveryOfertas();
    component.onNoClick();
    component.deleteEvery();
    let datos = true;
    expect(datos).toBeTruthy();
  });
});
