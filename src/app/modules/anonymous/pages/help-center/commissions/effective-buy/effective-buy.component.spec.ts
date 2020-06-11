import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectiveBuyComponent } from './effective-buy.component';

describe('EffectiveBuyComponent', () => {
  let component: EffectiveBuyComponent;
  let fixture: ComponentFixture<EffectiveBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EffectiveBuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EffectiveBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
