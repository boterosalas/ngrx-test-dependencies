import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteBuyComponent } from './route-buy.component';

describe('RouteBuyComponent', () => {
  let component: RouteBuyComponent;
  let fixture: ComponentFixture<RouteBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteBuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
