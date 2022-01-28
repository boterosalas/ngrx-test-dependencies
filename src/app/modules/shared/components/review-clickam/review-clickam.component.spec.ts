import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';

import { ReviewClickamComponent } from './review-clickam.component';

describe('ReviewClickamComponent', () => {
  let component: ReviewClickamComponent;
  let fixture: ComponentFixture<ReviewClickamComponent>;

  const dialogMock = {
    close: () => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewClickamComponent ],
      imports: [],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
      ]
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

  it('review', () => {
    component.qualify();
    expect(dialogMock).toBeDefined();
  });
  

});
