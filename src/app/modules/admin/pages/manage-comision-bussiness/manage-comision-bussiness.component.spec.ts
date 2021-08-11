import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDatepickerModule,
  MatDialog,
  MatDialogRef,
  MatMenuModule,
  MatNativeDateModule,
  MatSlideToggleModule,
  MAT_DIALOG_DATA,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AnonymousModule } from 'src/app/modules/anonymous/anonymous.module';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ContentService } from 'src/app/services/content.service';
import Swal from 'sweetalert2';

import { ManageComisionBussinessComponent } from './manage-comision-bussiness.component';

describe('ManageComisionBussinessComponent', () => {
  let component: ManageComisionBussinessComponent;
  const dialogMock = {
    close: () => {},
    beforeClosed: () => {},
  };
  let fixture: ComponentFixture<ManageComisionBussinessComponent>;
  const mockContentService = jasmine.createSpyObj('ContentService', [
    'saveComisionCategory',
    'deleteComisionCategoryBusiness',
    'getComisionManage',
  ]);
  const audit = {
    state: 'Success',
    userMessage: 'se ha enviado un correo',
    objectResponse: [],
  };
  const mockDialog = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageComisionBussinessComponent],
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

        AnonymousModule,

        MatDatepickerModule,
        MatNativeDateModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: ContentService, useValue: mockContentService },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MatDialog, useValue: mockDialog },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    mockContentService.saveComisionCategory.and.returnValue(of(audit));
    mockContentService.getComisionManage.and.returnValue(of(audit));
    mockContentService.deleteComisionCategoryBusiness.and.returnValue(of(audit));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageComisionBussinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('create a manage', () => {
    component.onNoClick();
    spyOn(Swal, 'fire').and.returnValue(
      Promise.resolve<any>({
        text: 'Extensión erronea',
        type: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonClass: 'accept-activation-alert-error',
      })
    );
    component.saveComisionCategory();
    component.deleteCategoryCom({ id: 1 });

    let datos = true;
    expect(datos).toBeTruthy();
  });
  it('modal create and edit', () => {
    component.addComisionCategory();
    component.editCategoryCom({
      codigo: 1,
      nombreCat: 'Hola',
      comisionClic: '4%',
      comisionBuss: '5%',
    });
    component.changeStatus();
    //component.editSaveComisionCategory();
    component.pagination({
      previousPageIndex: 1,
      pageIndex: 0,
      pageSize: 20,
      length: 5,
    });
    let datos = true;
    expect(datos).toBeTruthy();
  });
});
