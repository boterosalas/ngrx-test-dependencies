import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableNoveltiesComponent } from './table-novelties.component';

describe('TableNoveltiesComponent', () => {
  let component: TableNoveltiesComponent;
  let fixture: ComponentFixture<TableNoveltiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableNoveltiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableNoveltiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
