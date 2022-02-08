import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateTestimonyComponent } from './rate-testimony.component';

describe('RateTestimonyComponent', () => {
  let component: RateTestimonyComponent;
  let fixture: ComponentFixture<RateTestimonyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateTestimonyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateTestimonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
