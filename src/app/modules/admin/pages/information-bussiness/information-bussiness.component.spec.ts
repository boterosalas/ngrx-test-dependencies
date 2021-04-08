import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationBussinessComponent } from './information-bussiness.component';

describe('InformationBussinessComponent', () => {
  let component: InformationBussinessComponent;
  let fixture: ComponentFixture<InformationBussinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationBussinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationBussinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
