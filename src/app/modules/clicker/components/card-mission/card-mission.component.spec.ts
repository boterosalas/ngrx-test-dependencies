import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMissionComponent } from './card-mission.component';

describe('CardMissionComponent', () => {
  let component: CardMissionComponent;
  let fixture: ComponentFixture<CardMissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardMissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
