import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralResumeComponent } from './general-resume.component';
import { TranslateModule } from '@ngx-translate/core';

describe('GeneralResumeComponent', () => {
  let component: GeneralResumeComponent;
  let fixture: ComponentFixture<GeneralResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralResumeComponent ],
      imports: [
        TranslateModule.forRoot({})
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
