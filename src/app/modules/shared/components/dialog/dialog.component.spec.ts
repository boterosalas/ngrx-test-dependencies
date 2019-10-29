import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  const dialogMock = {
    dismiss: () => { }
   };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DialogComponent
       ],
       imports: [
        AppMaterialModule
       ],
       providers: [
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
        {provide: MatBottomSheetRef, useValue: dialogMock},
       ],
       schemas: [
         NO_ERRORS_SCHEMA
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('close dialog', () => {
    let spy = spyOn(component.dialogRef, 'dismiss').and.callThrough();
    component.onNoClick();
    expect(spy).toHaveBeenCalled();    
  });
  

});
