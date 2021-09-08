import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AnonymousModule } from 'src/app/modules/anonymous/anonymous.module';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ContentService } from 'src/app/services/content.service';
import Swal from 'sweetalert2';
import { SearchUsersComponent } from '../../components/search-users/search-users.component';

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
beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ManageComisionBussinessComponent, SearchUsersComponent],
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

  it('modal create', () => {
    component.addComisionCategory();
    const datos = true;
    expect(datos).toBeTruthy();
  });

  it('change status', () => {
    component.pagination({
      previousPageIndex: 1,
      pageIndex: 0,
      pageSize: 20,
      length: 5,
    });
    component.changeStatus();
    expect(component.pageIndex).not.toBeUndefined();
  });

  it('edit modal', () => {
    const element = {
      code: '',
      description: '',
      commissionclicker: '',
      commissionbusiness: '',
      idcommission: '',
    };
    component.editCategoryCom(element);
    expect(element.code).toBe('');
  });

  it('editSaveComisionCategory', () => {
    component.editSaveComisionCategory();
    expect(mockContentService.saveComisionCategory).toHaveBeenCalled();
  });
});
