import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductSearchService } from 'src/app/services/product-search.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const mockProductSearchService = jasmine.createSpyObj("ProductSearchService", ["getProducts"]);

  let data = [{
    productName: 'olla',
    items: [
      {
        images: [
          {
            imageUrl: 'gato.jpg'
          }
        ],
        sellers: [
          {
            commertialOffer: {
              PriceWithoutDiscount: '100000000'
            }
          }
      ]
    }
    ]
  }]

  let dataEmpty = [];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        HomeComponent
       ],
       imports:[
         AppMaterialModule,
         HttpClientTestingModule
       ],
       providers:[
         {provide: ProductSearchService, useValue: mockProductSearchService}
       ],
       schemas:[
         NO_ERRORS_SCHEMA
       ]
    })
    .compileComponents();
    mockProductSearchService.getProducts.and.returnValue(of(data));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('search products', () => {
    component.searchProduct('cocina');
    expect(mockProductSearchService.getProducts).toHaveBeenCalled();
  });

  describe('No results on search', () => {

    beforeEach(function() {
      mockProductSearchService.getProducts.and.returnValue(of(dataEmpty));
    });
    

    it('search products not found', () => {
      component.searchProduct('playstation');
      expect(mockProductSearchService.getProducts).toHaveBeenCalled();
    });

  });
  
  

});
