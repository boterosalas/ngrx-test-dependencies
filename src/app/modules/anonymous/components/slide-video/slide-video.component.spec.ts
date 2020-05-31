import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideVideoComponent } from './slide-video.component';

describe('SlideVideoComponent', () => {
  let component: SlideVideoComponent;
  let fixture: ComponentFixture<SlideVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
