import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinCommissionComponent } from './win-commission.component';

describe('WinCommissionComponent', () => {
  let component: WinCommissionComponent;
  let fixture: ComponentFixture<WinCommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinCommissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
