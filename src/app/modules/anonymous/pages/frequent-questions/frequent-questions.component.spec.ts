import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequentQuestionsComponent } from './frequent-questions.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('FrequentQuestionsComponent', () => {
  let component: FrequentQuestionsComponent;
  let fixture: ComponentFixture<FrequentQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrequentQuestionsComponent ],
      imports: [
        TranslateModule.forRoot({}),
        AppMaterialModule,
        BrowserAnimationsModule,
        SharedModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrequentQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
