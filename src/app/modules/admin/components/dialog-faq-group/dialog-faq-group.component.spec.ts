import { HttpClientTestingModule } from '@angular/common/http/testing';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { AdminModule } from '../../admin.module';

import { DialogFaqGroupComponent } from './dialog-faq-group.component';

describe('DialogFaqGroupComponent', () => {
  let component: DialogFaqGroupComponent;
  let fixture: ComponentFixture<DialogFaqGroupComponent>;

  const dialogMock = {
    close: () => {},
  };

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DialogFaqGroupComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({}),
        BrowserAnimationsModule,
        AppMaterialModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFaqGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
