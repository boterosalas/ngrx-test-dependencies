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

  it('Should onInit', () => {
    const spyCreateGraphData = spyOn(component,'createGraphData').and.callFake(()=>true);
    const spyCreateChart = spyOn(component,'createChart').and.callFake(()=>true);
    component.ngOnInit();
    expect(spyCreateGraphData).toHaveBeenCalled();
    expect(spyCreateChart).toHaveBeenCalled();
  });
});
