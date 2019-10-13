import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthResumeComponent } from './month-resume.component';
import { TranslateModule } from '@ngx-translate/core';
import { GoogleChartsModule } from 'angular-google-charts';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('MonthResumeComponent', () => {
  let component: MonthResumeComponent;
  let fixture: ComponentFixture<MonthResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthResumeComponent ],
      imports: [
        TranslateModule.forRoot({}),
        GoogleChartsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
