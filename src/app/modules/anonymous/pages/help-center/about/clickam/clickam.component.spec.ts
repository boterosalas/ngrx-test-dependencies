import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickamComponent } from './clickam.component';

describe('ClickamComponent', () => {
  let component: ClickamComponent;
  let fixture: ComponentFixture<ClickamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClickamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
