import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerMedalComponent } from './banner-medal.component';

describe('BannerMedalComponent', () => {
  let component: BannerMedalComponent;
  let fixture: ComponentFixture<BannerMedalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerMedalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerMedalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
