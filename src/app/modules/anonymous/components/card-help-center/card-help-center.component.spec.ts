import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHelpCenterComponent } from './card-help-center.component';

describe('CardHelpCenterComponent', () => {
  let component: CardHelpCenterComponent;
  let fixture: ComponentFixture<CardHelpCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardHelpCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardHelpCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
