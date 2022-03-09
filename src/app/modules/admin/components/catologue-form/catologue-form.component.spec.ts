import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatologueFormComponent } from './catologue-form.component';

describe('CatologueFormComponent', () => {
  let component: CatologueFormComponent;
  let fixture: ComponentFixture<CatologueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatologueFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatologueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
