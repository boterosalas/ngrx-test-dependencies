import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellReportFormComponent } from './sell-report-form.component';

describe('SellReportFormComponent', () => {
  let component: SellReportFormComponent;
  let fixture: ComponentFixture<SellReportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellReportFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
