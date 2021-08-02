import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAdminStoryComponent } from './card-admin-story.component';

describe('CardAdminStoryComponent', () => {
  let component: CardAdminStoryComponent;
  let fixture: ComponentFixture<CardAdminStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardAdminStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardAdminStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
