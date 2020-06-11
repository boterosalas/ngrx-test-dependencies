import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsCommissionComponent } from './products-commission.component';

describe('ProductsCommissionComponent', () => {
  let component: ProductsCommissionComponent;
  let fixture: ComponentFixture<ProductsCommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsCommissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
