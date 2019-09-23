import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { AppMaterialModule } from 'src/app/modules/shared/app-material/app-material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductSearchService } from 'src/app/services/product-search.service';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const mockProductSearchService = jasmine.createSpyObj("ProductSearchService", ["getProductsPagination", "getTotalItems"]);

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
         HttpClientTestingModule,
         TranslateModule.forRoot({})
       ],
       providers:[
         {provide: ProductSearchService, useValue: mockProductSearchService}
       ],
       schemas:[
         NO_ERRORS_SCHEMA
       ]
    })
    .compileComponents();
    mockProductSearchService.getProductsPagination.and.returnValue(of(data));
    mockProductSearchService.getTotalItems.and.returnValue(of(data));
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
    component.searchProductPaginate('cocina');
    expect(mockProductSearchService.getProductsPagination).toHaveBeenCalled();
  });

  it('paginate', () => {
    const dataPaginate = {previousPageIndex: 0, pageIndex: 1, pageSize: 5, length: 10}
    component.pagination(dataPaginate);
    expect(mockProductSearchService.getProductsPagination).toHaveBeenCalled();
  });
  

  describe('No results on search', () => {

    beforeEach(function() {
      mockProductSearchService.getProductsPagination.and.returnValue(of(dataEmpty));
    });
    

    it('search products not found', () => {
      component.searchProductPaginate('playstation');
      expect(mockProductSearchService.getProductsPagination).toHaveBeenCalled();
    });

  });
  
  

});
