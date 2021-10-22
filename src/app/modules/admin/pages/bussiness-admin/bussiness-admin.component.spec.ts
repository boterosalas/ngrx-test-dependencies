import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinessAdminComponent } from './bussiness-admin.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
//import { ContentService } from "src/app/services/content.service";
import { of } from 'rxjs/internal/observable/of';
import { ContentService } from 'src/app/services/content.service';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AdminModule } from '../../admin.module';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DialogCategoryComponent } from '../../components/dialog-category/dialog-category.component';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';

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

describe('ControllerAdminComponent', () => {
  let component: BussinessAdminComponent;
  let fixture: ComponentFixture<BussinessAdminComponent>;

  const audit = {
    state: 'Success',
    userMessage: 'se ha enviado un correo',
    objectResponse: [],
  };

  const error = {
    state: 'Error',
    userMessage: 'se ha enviado un correo',
    objectResponse: [],
  };

  const mockDialog = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);

  const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close', 'afterClosed', 'componentInstance', 'event ', 'beforeClosed']);

  const mockContentService = jasmine.createSpyObj('ContentService', [
    'getBusinessContent',
    'biggySearchExito',
    'biggySearchCarulla',
    'orderCategory',
    'deleteCategory',
    'getAllBusinessContent',
  ]);

  let bussiness = [
    {
      id: 25,
      orderby: 26,
      link: 'https://www.exito.com/ferreteria?utm_source=clickam&utm_medium=referral&utm_campaign=',
      imageurl: 'https://webclickamdev.blob.core.windows.net/img-ofertas/pic-content/ferreteria-vehiculos.png',
      description: 'Ferreteria y vehiculos',
      commission: 0,
      idbusiness: 1,
      infoaditional: '',
    },
  ];

  const matDialog = new MatDialogMock();

beforeEach(waitForAsync(() => {
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
              return localStorage.getItem('ACCESS_TOKEN');
            },
            throwNoTokenError: true,
            allowedDomains: [],
            disallowedRoutes: [],
          },
        }),
      ],
      providers: [
        { provide: MatDialog, useValue: matDialog },
        { provide: ContentService, useValue: mockContentService },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: mockDialogRef },
      ],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [DialogCategoryComponent, ModalGenericComponent],
        },
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

  it('should create Admin Buss', () => {
    expect(component).toBeTruthy();
    expect(mockContentService.getAllBusinessContent).toHaveBeenCalled();
  });

  it('get content bussiness', () => {
    component.getContentBussiness();
    expect(mockContentService.getAllBusinessContent).toHaveBeenCalled();
  });

  it('save Order', () => {
    mockContentService.orderCategory.and.returnValue(of(audit));
    component.saveOrder([
      { id: 1, orderby: 2 },
      { id: 2, orderby: 1 },
    ]);
    expect(mockContentService.orderCategory).toHaveBeenCalled();
    mockContentService.orderCategory.and.returnValue(of(error));
    component.saveOrder([
      { id: 1, orderby: 2 },
      { id: 2, orderby: 1 },
    ]);
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

  // it('cancel delete', () => {
  //   component.cancelDelete();
  // });

  it('delete category', () => {
    component.deleteCategory({ title: 'eliminar categorira', template: '' });
    expect(mockContentService.getAllBusinessContent).toHaveBeenCalled();
  });

  it('add category', () => {
    component.agregarCategory();
    expect(mockContentService.getAllBusinessContent).toHaveBeenCalled();
  });

  it('edit category', () => {
    component.editCategory('Exito');
    expect(mockContentService.getAllBusinessContent).toHaveBeenCalled();
  });
});
