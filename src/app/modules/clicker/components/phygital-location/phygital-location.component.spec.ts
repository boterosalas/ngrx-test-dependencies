import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhygitalLocationComponent } from './phygital-location.component';

describe('PhygitalLocationComponent', () => {
  let component: PhygitalLocationComponent;
  let fixture: ComponentFixture<PhygitalLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhygitalLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhygitalLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
