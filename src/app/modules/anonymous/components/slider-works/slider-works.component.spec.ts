import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderWorksComponent } from './slider-works.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TranslateModule } from '@ngx-translate/core';

describe('SliderWorksComponent', () => {
  let component: SliderWorksComponent;
  let fixture: ComponentFixture<SliderWorksComponent>;

beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [SliderWorksComponent],
      imports: [SlickCarouselModule, TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('next', () => {
    component.next();
    expect(component.next).toBeTruthy();
  });

  it('prev', () => {
    component.prev();
    expect(component.prev).toBeTruthy();
  });
});
