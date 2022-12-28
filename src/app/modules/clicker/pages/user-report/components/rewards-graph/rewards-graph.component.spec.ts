import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsGraphComponent } from './rewards-graph.component';

describe('RewardsGraphComponent', () => {
  let component: RewardsGraphComponent;
  let fixture: ComponentFixture<RewardsGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardsGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
