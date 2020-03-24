import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderDeliverComponent } from './slider-deliver.component';

describe('SliderDeliverComponent', () => {
  let component: SliderDeliverComponent;
  let fixture: ComponentFixture<SliderDeliverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderDeliverComponent ]
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
