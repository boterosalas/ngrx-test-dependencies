import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOnboardingComponent } from './dialog-onboarding.component';

describe('DialogOnboardingComponent', () => {
  let component: DialogOnboardingComponent;
  let fixture: ComponentFixture<DialogOnboardingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogOnboardingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
