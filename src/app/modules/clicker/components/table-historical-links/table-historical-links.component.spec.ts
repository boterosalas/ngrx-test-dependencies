import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHistoricalLinksComponent } from './table-historical-links.component';

describe('TableHistoricalLinksComponent', () => {
  let component: TableHistoricalLinksComponent;
  let fixture: ComponentFixture<TableHistoricalLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableHistoricalLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableHistoricalLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
