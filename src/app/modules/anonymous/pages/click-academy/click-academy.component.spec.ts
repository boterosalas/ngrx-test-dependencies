import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickAcademyComponent } from './click-academy.component';

describe('ClickAcademyComponent', () => {
  let component: ClickAcademyComponent;
  let fixture: ComponentFixture<ClickAcademyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClickAcademyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickAcademyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
