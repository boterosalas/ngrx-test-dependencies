import { Component, OnInit } from '@angular/core';
import { ProductSearchService } from 'src/app/services/product-search.service';
import { SearchProduct } from 'src/app/interfaces/search-product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private sp: ProductSearchService) { }

  productsList:SearchProduct;
  showResults: boolean;
  showNotFound: boolean;

  ngOnInit() {
    this.showNotFound = false;
    this.showResults = false;
  }

  public searchProduct(term:string){
    this.sp.getProducts(term).subscribe((resp: SearchProduct) => {
      if(resp.length > 0 ) {
        this.showResults = true;
        this.productsList = resp;
      } else {
        this.showNotFound = true;
        this.showResults = false;
      }
    })
  }

}
