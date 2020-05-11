import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferShareComponent } from './refer-share.component';

describe('ReferShareComponent', () => {
  let component: ReferShareComponent;
  let fixture: ComponentFixture<ReferShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
