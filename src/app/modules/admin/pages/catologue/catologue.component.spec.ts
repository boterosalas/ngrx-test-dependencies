import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatologueComponent } from './catologue.component';

describe('CatologueComponent', () => {
  let component: CatologueComponent;
  let fixture: ComponentFixture<CatologueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatologueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatologueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
