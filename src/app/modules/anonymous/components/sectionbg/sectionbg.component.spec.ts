import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionbgComponent } from './sectionbg.component';

describe('SectionbgComponent', () => {
  let component: SectionbgComponent;
  let fixture: ComponentFixture<SectionbgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionbgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionbgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
