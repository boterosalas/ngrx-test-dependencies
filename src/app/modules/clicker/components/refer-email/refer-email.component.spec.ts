import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferEmailComponent } from './refer-email.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ReferEmailComponent', () => {
  let component: ReferEmailComponent;
  let fixture: ComponentFixture<ReferEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReferEmailComponent],
      imports: [TranslateModule.forRoot(), AppMaterialModule, ReactiveFormsModule, FormsModule, BrowserAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('send email', () => {
    component.sendEmail();
    expect(component.referForm.errors).toBeFalsy();
  });
});
