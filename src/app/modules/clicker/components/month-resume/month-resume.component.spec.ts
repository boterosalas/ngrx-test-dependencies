import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthResumeComponent } from './month-resume.component';

describe('MonthResumeComponent', () => {
  let component: MonthResumeComponent;
  let fixture: ComponentFixture<MonthResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthResumeComponent ]
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
