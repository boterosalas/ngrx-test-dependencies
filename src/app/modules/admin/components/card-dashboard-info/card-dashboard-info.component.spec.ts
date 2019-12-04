import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDashboardInfoComponent } from './card-dashboard-info.component';

describe('CardDashboardInfoComponent', () => {
  let component: CardDashboardInfoComponent;
  let fixture: ComponentFixture<CardDashboardInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardDashboardInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDashboardInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
