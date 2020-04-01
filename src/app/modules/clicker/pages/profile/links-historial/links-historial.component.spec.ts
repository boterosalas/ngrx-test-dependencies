import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksHistorialComponent } from './links-historial.component';

describe('LinksHistorialComponent', () => {
  let component: LinksHistorialComponent;
  let fixture: ComponentFixture<LinksHistorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinksHistorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinksHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
