import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderDeliverComponent } from './slider-deliver.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

describe('SliderDeliverComponent', () => {
  let component: SliderDeliverComponent;
  let fixture: ComponentFixture<SliderDeliverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderDeliverComponent ],
      imports:[
        SlickCarouselModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderDeliverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
