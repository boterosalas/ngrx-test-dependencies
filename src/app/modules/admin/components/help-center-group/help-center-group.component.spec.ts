import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpCenterGroupComponent } from './help-center-group.component';

describe('HelpCenterGroupComponent', () => {
  let component: HelpCenterGroupComponent;
  let fixture: ComponentFixture<HelpCenterGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpCenterGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpCenterGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
