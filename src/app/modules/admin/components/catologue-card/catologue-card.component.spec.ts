import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatologueCardComponent } from './catologue-card.component';

describe('CatologueCardComponent', () => {
  let component: CatologueCardComponent;
  let fixture: ComponentFixture<CatologueCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatologueCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatologueCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
