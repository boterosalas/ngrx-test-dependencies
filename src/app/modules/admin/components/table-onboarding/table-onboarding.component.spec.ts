import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOnboardingComponent } from './table-onboarding.component';

describe('TableOnboardingComponent', () => {
  let component: TableOnboardingComponent;
  let fixture: ComponentFixture<TableOnboardingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableOnboardingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
