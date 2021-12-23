import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportRewardComponent } from './report-reward.component';

describe('ReportRewardComponent', () => {
  let component: ReportRewardComponent;
  let fixture: ComponentFixture<ReportRewardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportRewardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
