import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';

import { ClickamerWayComponent } from './clickamer-way.component';

describe('ClickamerWayComponent', () => {
  let component: ClickamerWayComponent;
  let fixture: ComponentFixture<ClickamerWayComponent>;

  const dialogMock = {
    close: () => {},
  };


  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ClickamerWayComponent],
      imports: [AppMaterialModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickamerWayComponent);
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
