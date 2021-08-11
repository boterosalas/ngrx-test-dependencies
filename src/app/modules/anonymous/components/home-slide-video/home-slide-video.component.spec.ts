import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSlideVideoComponent } from './home-slide-video.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

describe('HomeSlideVideoComponent', () => {
  let component: HomeSlideVideoComponent;
  let fixture: ComponentFixture<HomeSlideVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeSlideVideoComponent],
      imports: [SlickCarouselModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSlideVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
