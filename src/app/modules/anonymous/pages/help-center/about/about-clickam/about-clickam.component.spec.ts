import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutClickamComponent } from './about-clickam.component';

describe('AboutClickamComponent', () => {
  let component: AboutClickamComponent;
  let fixture: ComponentFixture<AboutClickamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutClickamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutClickamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
