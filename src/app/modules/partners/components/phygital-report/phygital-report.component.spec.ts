import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhygitalReportComponent } from './phygital-report.component';

describe('PhygitalReportComponent', () => {
  let component: PhygitalReportComponent;
  let fixture: ComponentFixture<PhygitalReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhygitalReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhygitalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
