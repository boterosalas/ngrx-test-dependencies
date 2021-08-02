import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogStoryComponent } from './dialog-story.component';

describe('DialogStoryComponent', () => {
  let component: DialogStoryComponent;
  let fixture: ComponentFixture<DialogStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
