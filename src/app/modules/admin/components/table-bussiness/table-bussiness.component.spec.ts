import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBussinessComponent } from './table-bussiness.component';

describe('TableBussinessComponent', () => {
  let component: TableBussinessComponent;
  let fixture: ComponentFixture<TableBussinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableBussinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBussinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
