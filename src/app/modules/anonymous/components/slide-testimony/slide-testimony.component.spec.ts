import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideTestimonyComponent } from './slide-testimony.component';

describe('SlideTestimonyComponent', () => {
  let component: SlideTestimonyComponent;
  let fixture: ComponentFixture<SlideTestimonyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideTestimonyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideTestimonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
