import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTestimonyComponent } from './table-testimony.component';

describe('TableTestimonyComponent', () => {
  let component: TableTestimonyComponent;
  let fixture: ComponentFixture<TableTestimonyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableTestimonyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTestimonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
