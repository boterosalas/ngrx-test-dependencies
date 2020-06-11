import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportClickamComponent } from './report-clickam.component';

describe('ReportClickamComponent', () => {
  let component: ReportClickamComponent;
  let fixture: ComponentFixture<ReportClickamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportClickamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportClickamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
