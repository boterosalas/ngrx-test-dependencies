import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramFriendComponent } from './program-friend.component';

describe('ProgramFriendComponent', () => {
  let component: ProgramFriendComponent;
  let fixture: ComponentFixture<ProgramFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramFriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
