import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCarruselComponent } from './table-carrusel.component';

describe('TableCarruselComponent', () => {
  let component: TableCarruselComponent;
  let fixture: ComponentFixture<TableCarruselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCarruselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCarruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
