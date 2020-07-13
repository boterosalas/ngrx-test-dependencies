import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionLevelComponent } from './mission-level.component';

describe('MissionLevelComponent', () => {
  let component: MissionLevelComponent;
  let fixture: ComponentFixture<MissionLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
