import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeCardComponent } from './resume-card.component';

describe('ResumeCardComponent', () => {
  let component: ResumeCardComponent;
  let fixture: ComponentFixture<ResumeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
