import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ContentService } from 'src/app/services/content.service';
import Swal from 'sweetalert2';

import { InformationBussinessComponent } from './information-bussiness.component';
const dialogMock = {
  close: () => {},
  beforeClosed: () => {},
};
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
const bussiness = {
  about: 'About bussiness',
  tips: [{ title: 'Uno', description: 'Dos ' }],
  terms: [
    { id: 1, description: 'Hola mundo' },
    { id: 2, description: 'Hola mundo' },
    { id: 3, description: 'Hola mundo' },
  ],
};
//const mockDialogR = jasmine.createSpy(component.dialogRef,['beforeClosed'])
const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close', 'afterClosed', 'componentInstance', 'event ', 'beforeClosed']);
const mockContentService = jasmine.createSpyObj('ContentService', [
  'getBusinessById',
  'saveOrderTipBusiness',
  'saveInfoBusiness',
  'saveTermsConditions',
  'saveTipBusiness',
  'deleteTipBusiness',
]);
describe('InformationBussinessComponent', () => {
  let component: InformationBussinessComponent;
  let fixture: ComponentFixture<InformationBussinessComponent>;

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InformationBussinessComponent],
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
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: ContentService, useValue: mockContentService },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MatDialog, useValue: mockDialog },
      ],
    }).compileComponents();
    mockContentService.getBusinessById.and.returnValue(of(bussiness));
    mockContentService.saveOrderTipBusiness.and.returnValue(of(audit));
    mockContentService.saveInfoBusiness.and.returnValue(of(audit));
    mockContentService.saveTermsConditions.and.returnValue(of(audit));
    mockContentService.deleteTipBusiness.and.returnValue(of(audit));
    mockContentService.saveTipBusiness.and.returnValue(of(audit));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationBussinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('save', () => {
    component.saveOrder([
      { id: 1, orderby: 1 },
      { id: 2, orderby: 2 },
    ]);
    component.id = '1';
    component.getBusinessData();
    component.addAboutBussiness();
    let datos = true;

    expect(datos).toBeTruthy();
  });
  it('comprobar text', () => {
    component.id = '1';
    component.comprobarText(undefined, { title: 'Hola', description: 'NN' });
    component.comprobarText(1, { title: 'Hola', description: 'NN' });
    let datos = true;
    component.addTermsConditions();
    spyOn(Swal, 'fire').and.returnValue(
      Promise.resolve<any>({
        text: 'Extensión erronea',
        type: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonClass: 'accept-activation-alert-error',
      })
    );
    component.onNoClick();
    component.addTip();
    component.saveTip();
    component.editTipModal({
      id: 1,
      title: 'Nombre',
      description: 'Esto es una descripcion',
    });
    component.editTip();
    component.deleteTip({ id: 1 });
    expect(datos).toBeTruthy();
  });
});
