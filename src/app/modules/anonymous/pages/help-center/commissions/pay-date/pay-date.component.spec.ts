import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayDateComponent } from './pay-date.component';

describe('PayDateComponent', () => {
  let component: PayDateComponent;
  let fixture: ComponentFixture<PayDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
