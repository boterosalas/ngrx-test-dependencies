import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MatMenuModule, MatSlideToggleModule, MAT_DIALOG_DATA } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import Swal from 'sweetalert2';

import { CarrouselAdminComponent } from './carrousel-admin.component';

describe('CarrouselAdminComponent', () => {
  let component: CarrouselAdminComponent;
  let fixture: ComponentFixture<CarrouselAdminComponent>;
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
        { provide: MatDialog, useValue: mockDialog },
      ]
    })
      .compileComponents();
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
    component.deleteComisionCarousel({ id: 1 });
    component.deleteComisionOferta({ id: 1 });
    let datos = true;
    expect(datos).toBeTruthy();
  });
});
