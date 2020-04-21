import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBusinessFormComponent } from './new-business-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NewBusinessFormComponent', () => {
  let component: NewBusinessFormComponent;
  let fixture: ComponentFixture<NewBusinessFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBusinessFormComponent ],
      imports: [
        TranslateModule.forRoot(),
        AppMaterialModule,
        ReactiveFormsModule,
        FormsModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBusinessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
