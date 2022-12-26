import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeCardsContainerComponent } from './resume-cards-container.component';

describe('ResumeCardsContainerComponent', () => {
  let component: ResumeCardsContainerComponent;
  let fixture: ComponentFixture<ResumeCardsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeCardsContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeCardsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
