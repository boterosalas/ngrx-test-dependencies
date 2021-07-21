import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteNotificationComponent } from './dialog-delete-notification.component';

describe('DialogDeleteNotificationComponent', () => {
  let component: DialogDeleteNotificationComponent;
  let fixture: ComponentFixture<DialogDeleteNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDeleteNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
