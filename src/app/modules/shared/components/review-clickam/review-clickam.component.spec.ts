import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewClickamComponent } from './review-clickam.component';

describe('ReviewClickamComponent', () => {
  let component: ReviewClickamComponent;
  let fixture: ComponentFixture<ReviewClickamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewClickamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewClickamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
