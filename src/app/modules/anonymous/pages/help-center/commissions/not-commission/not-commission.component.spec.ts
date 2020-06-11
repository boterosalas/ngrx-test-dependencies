import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotCommissionComponent } from './not-commission.component';

describe('NotCommissionComponent', () => {
  let component: NotCommissionComponent;
  let fixture: ComponentFixture<NotCommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotCommissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
