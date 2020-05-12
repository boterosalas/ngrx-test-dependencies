import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableReferComponent } from './table-refer.component';

describe('TableReferComponent', () => {
  let component: TableReferComponent;
  let fixture: ComponentFixture<TableReferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableReferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableReferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
