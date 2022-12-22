import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsByBussinessComponent } from './rewards-by-bussiness.component';

describe('RewardsByBussinessComponent', () => {
  let component: RewardsByBussinessComponent;
  let fixture: ComponentFixture<RewardsByBussinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardsByBussinessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardsByBussinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
