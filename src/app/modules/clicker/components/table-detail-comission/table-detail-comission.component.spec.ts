import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDetailComissionComponent } from './table-detail-comission.component';

describe('TableDetailComissionComponent', () => {
  let component: TableDetailComissionComponent;
  let fixture: ComponentFixture<TableDetailComissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDetailComissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDetailComissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
