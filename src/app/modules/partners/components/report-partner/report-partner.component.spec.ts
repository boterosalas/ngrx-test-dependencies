import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPartnerComponent } from './report-partner.component';

describe('ReportPartnerComponent', () => {
  let component: ReportPartnerComponent;
  let fixture: ComponentFixture<ReportPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportPartnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
