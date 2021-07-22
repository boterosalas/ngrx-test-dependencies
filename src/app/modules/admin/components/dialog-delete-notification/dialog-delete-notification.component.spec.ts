import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';

import { DialogDeleteNotificationComponent } from './dialog-delete-notification.component';

describe('DialogDeleteNotificationComponent', () => {
  let component: DialogDeleteNotificationComponent;
  let fixture: ComponentFixture<DialogDeleteNotificationComponent>;

  const dialogMock = {
    close: () => { }
   };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDeleteNotificationComponent ],
      imports: [
        AppMaterialModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {provide: MatDialogRef, useValue: dialogMock},
       ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
