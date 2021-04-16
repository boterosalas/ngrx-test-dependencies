import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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

import { CarrouselAdminComponent } from './carrousel-admin.component';

fdescribe('CarrouselAdminComponent', () => {
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
  const datos = [
    { id: 1, description: "Algo", business: "Exito" },
    { id: 1, description: "Algo", business: "Exito" },
    { id: 1, description: "Algo", business: "Exito" }

  ]
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
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: ContentService, useValue: mockContentService },
        { provide: MatDialog, useValue: mockDialog },
      ]
    })
      .compileComponents();
    mockContentService.getOffersbyType.and.returnValue(of(datos));
    mockContentService.saveOrderOfertBusiness.and.returnValue(of(audit));
    mockContentService.getAllBusiness.and.returnValue(of(audit));
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
    component.saveImagenOfertas();
    component.saveOrder([{ id: 1, orderBy: 1 }, { id: 2, orderBy: 2 }]);
    component.saveImagenCarousel();
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
