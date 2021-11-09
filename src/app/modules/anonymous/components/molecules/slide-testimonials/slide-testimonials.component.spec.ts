import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { SlideTestimonialsComponent } from './slide-testimonials.component';

describe('SlideTestimonialsComponent', () => {
  let component: SlideTestimonialsComponent;
  let fixture: ComponentFixture<SlideTestimonialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideTestimonialsComponent ],
      imports: [
        SlickCarouselModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideTestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
