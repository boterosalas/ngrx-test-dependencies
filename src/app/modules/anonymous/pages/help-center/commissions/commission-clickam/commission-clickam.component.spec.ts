import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionClickamComponent } from './commission-clickam.component';

describe('CommissionClickamComponent', () => {
  let component: CommissionClickamComponent;
  let fixture: ComponentFixture<CommissionClickamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionClickamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionClickamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
