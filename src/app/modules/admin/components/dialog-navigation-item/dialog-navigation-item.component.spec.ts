import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNavigationItemComponent } from './dialog-navigation-item.component';

describe('DialogNavigationItemComponent', () => {
  let component: DialogNavigationItemComponent;
  let fixture: ComponentFixture<DialogNavigationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogNavigationItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNavigationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
