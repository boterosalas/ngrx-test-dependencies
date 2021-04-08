import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageComisionBussinessComponent } from './manage-comision-bussiness.component';

describe('ManageComisionBussinessComponent', () => {
  let component: ManageComisionBussinessComponent;
  let fixture: ComponentFixture<ManageComisionBussinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageComisionBussinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageComisionBussinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
