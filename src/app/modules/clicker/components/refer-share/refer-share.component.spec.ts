import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferShareComponent } from './refer-share.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ReferShareComponent', () => {
  let component: ReferShareComponent;
  let fixture: ComponentFixture<ReferShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferShareComponent ],
      imports: [
        TranslateModule.forRoot(),
        AppMaterialModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        ShareButtonsModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
