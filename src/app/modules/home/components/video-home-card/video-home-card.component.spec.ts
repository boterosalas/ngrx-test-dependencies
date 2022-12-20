/* import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonStoryComponent } from './video-home-card.component';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ButtonStoryComponent', () => {
  let component: ButtonStoryComponent;
  let fixture: ComponentFixture<ButtonStoryComponent>;

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonStoryComponent],
      imports: [AppMaterialModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('view story', () => {
    spyOn(component.openStory, 'emit');
    component.viewStory();
    expect(component.openStory.emit).toHaveBeenCalled();
  });
});
 */