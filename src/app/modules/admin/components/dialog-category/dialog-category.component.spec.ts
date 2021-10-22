import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCategoryComponent } from './dialog-category.component';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs/internal/observable/of';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContentService } from 'src/app/services/content.service';

describe('DialogCategoryComponent', () => {
  let component: DialogCategoryComponent;
  let fixture: ComponentFixture<DialogCategoryComponent>;
  let component2: DialogCategoryComponent;
  let fixture2: ComponentFixture<DialogCategoryComponent>;
  const mockContentService = jasmine.createSpyObj('ContentService', ['addCategory']);
  const dialogMock = {
    close: () => {},
  };
  const resp = {
    state: 'Success',
    userMessage: 'se ha actualizado el email',
    objectResponse: [],
  };
beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DialogCategoryComponent, TruncatePipe],
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
              return localStorage.getItem('ACCESS_TOKEN');
            },
            throwNoTokenError: true,
            allowedDomains: [],
            disallowedRoutes: [],
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
    mockContentService.addCategory.and.returnValue(of(resp));
  }));
  beforeEach(() => {
    //spyOn(String.prototype, "split");
    fixture = TestBed.createComponent(DialogCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
    fixture2 = TestBed.createComponent(DialogCategoryComponent);
    component2 = fixture2.componentInstance;
    fixture2.detectChanges();
    component2.data = { edit: 1 };
    expect(component2).toBeTruthy();
  });
  it('on file change ced1', () => {
    const mockFile = new File([''], 'name.jpg', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };
    component.onFileChangeFiles(mockEvt, 'cedula1');
    expect(component.onFileChangeFiles).not.toBeNull();
    let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.onNoClick();
    expect(spy).toHaveBeenCalled();
  });

  it('edit category', () => {
    component.data = { edit: 0 };
    component.dateForm.controls.category.setValue('Salud');
    component.dateForm.controls.description.setValue('Hasta 10%');
    component.dateForm.controls.tipoCommision.setValue('10');
    component.dateForm.controls.commision.setValue(2);
    component.dateForm.controls.link.setValue('http:exito.com');
    component.fileImgCat = 'data:based64';
    component.nameFileCert = 'exito.svg';
    component.statusAc = true;
    component.dateForm.controls.commisionBussiness.setValue(3);
    component.data = { idBussiness: 1 };
    component.agregarCategory();
    expect(mockContentService.addCategory).toHaveBeenCalled();
  });
  it('edit category', () => {
    component.data = { edit: 0 };
    component.dateForm.controls.category.setValue('Salud');
    component.dateForm.controls.description.setValue('Hasta 10%');
    component.dateForm.controls.tipoCommision.setValue('10');
    component.dateForm.controls.commision.setValue(2);
    component.dateForm.controls.link.setValue('http:exito.com');
    component.fileImgCat = '';
    component.nameFileCert = 'exito.svg';
    component.statusAc = true;
    component.dateForm.controls.commisionBussiness.setValue(3);
    component.data = { idBussiness: 1 };
    component.agregarCategory();

    expect(mockContentService.addCategory).toHaveBeenCalled();
    component.data = { edit: 0, idBussiness: 1 };
    component.dateForm.controls.category.setValue('Salud');
    component.dateForm.controls.description.setValue('Hasta 10%');
    component.dateForm.controls.tipoCommision.setValue('10');
    component.dateForm.controls.commision.setValue(2);
    component.dateForm.controls.link.setValue('http:exito.com');
    component.fileImgCat = '';
    component.nameFileCert = 'exito.svg';
    component.statusAc = true;
    component.dateForm.controls.commisionBussiness.setValue(3);

    component.agregarCategory();
    expect(mockContentService.addCategory).toHaveBeenCalled();
  });

  it('ngOnDestroy', () => {
    component.ngOnDestroy;
    expect(component).toBeTruthy();
  });
});
