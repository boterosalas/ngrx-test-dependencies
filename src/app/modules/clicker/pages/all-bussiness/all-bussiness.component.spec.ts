import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBussinessComponent } from './all-bussiness.component';

describe('AllBussinessComponent', () => {
  let component: AllBussinessComponent;
  let fixture: ComponentFixture<AllBussinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllBussinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBussinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
