import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHistoryComponent } from './dialog-history.component';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

describe('DialogHistoryComponent', () => {
  let component: DialogHistoryComponent;
  let fixture: ComponentFixture<DialogHistoryComponent>;

  const dialogMock = {
    close: () => { }
   };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogHistoryComponent ],
      imports: [
        AppMaterialModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {provide: MatDialogRef, useValue: dialogMock},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
