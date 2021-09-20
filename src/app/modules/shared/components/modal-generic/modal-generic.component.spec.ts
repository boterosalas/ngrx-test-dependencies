import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGenericComponent } from './modal-generic.component';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('ModalGenericComponent', () => {
  let component: ModalGenericComponent;
  let fixture: ComponentFixture<ModalGenericComponent>;

  const dialogMock = {
    close: () => {},
  };

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ModalGenericComponent],
      imports: [AppMaterialModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('close modal', () => {
    let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.onNoClick();
    expect(spy).toHaveBeenCalled();
  });
});
