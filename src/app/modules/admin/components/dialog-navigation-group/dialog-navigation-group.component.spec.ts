import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNavigationGroupComponent } from './dialog-navigation-group.component';

describe('DialogNavigationGroupComponent', () => {
  let component: DialogNavigationGroupComponent;
  let fixture: ComponentFixture<DialogNavigationGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogNavigationGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNavigationGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
