import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTestimonyComponent } from './form-testimony.component';

describe('FormTestimonyComponent', () => {
  let component: FormTestimonyComponent;
  let fixture: ComponentFixture<FormTestimonyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTestimonyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTestimonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
