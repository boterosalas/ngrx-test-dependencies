import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigoConfirmacionComponent } from './codigo-confirmacion.component';

xdescribe('CodigoConfirmacionComponent', () => {
  let component: CodigoConfirmacionComponent;
  let fixture: ComponentFixture<CodigoConfirmacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodigoConfirmacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodigoConfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
