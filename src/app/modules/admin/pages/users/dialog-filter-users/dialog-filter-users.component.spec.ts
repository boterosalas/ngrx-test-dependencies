import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFilterUsersComponent } from './dialog-filter-users.component';

describe('DialogFilterUsersComponent', () => {
  let component: DialogFilterUsersComponent;
  let fixture: ComponentFixture<DialogFilterUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFilterUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFilterUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
