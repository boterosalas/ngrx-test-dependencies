import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductComponent, TruncatePipe ],
      imports: [
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('emit info product', () => {
  //   spyOn(component.infoProduct, 'emit');
  //   const nativeElement = fixture.nativeElement;
  //   const button = nativeElement.querySelector('button');
  //   button.dispatchEvent(new Event('click'));
  //   fixture.detectChanges();
  //   component.product();    
  //   expect(component.infoProduct.emit).toHaveBeenCalled();
  // });
  

});
