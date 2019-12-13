import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditComponent } from './dialog-edit.component';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

describe('DialogEditComponent', () => {
  let component: DialogEditComponent;
  let fixture: ComponentFixture<DialogEditComponent>;

  const dialogMock = {
    close: () => { }
   };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditComponent ],
      imports: [
        AppMaterialModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {provide: MatDialogRef, useValue: dialogMock},
       ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
