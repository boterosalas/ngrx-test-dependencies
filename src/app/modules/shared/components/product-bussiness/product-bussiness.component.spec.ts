import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBussinessComponent } from './product-bussiness.component';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';

describe('ProductBussinessComponent', () => {
  let component: ProductBussinessComponent;
  let fixture: ComponentFixture<ProductBussinessComponent>;

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [SharedModule, AppMaterialModule, FormsModule, ReactiveFormsModule],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBussinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    spyOn(component.infoProduct, 'emit');
    component.product('container');
    expect(component.infoProduct.emit).toHaveBeenCalled();
  });
});
