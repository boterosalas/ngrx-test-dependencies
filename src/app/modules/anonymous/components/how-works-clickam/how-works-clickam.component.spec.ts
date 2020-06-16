import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowWorksClickamComponent } from './how-works-clickam.component';
import { TranslateModule } from '@ngx-translate/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';

describe('HowWorksClickamComponent', () => {
  let component: HowWorksClickamComponent;
  let fixture: ComponentFixture<HowWorksClickamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowWorksClickamComponent ],
      imports: [
        TranslateModule.forRoot(),
        SlickCarouselModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowWorksClickamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
