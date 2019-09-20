import { Component, OnInit } from '@angular/core';
import { ProductSearchService } from 'src/app/services/product-search.service';
import { SearchProduct } from 'src/app/interfaces/search-product';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private sp: ProductSearchService, private loading: LoaderService) { }

  private subscription: Subscription = new Subscription();
  productsList:SearchProduct;
  showResults: boolean;
  showNotFound: boolean;

  ngOnInit() {
    this.showNotFound = false;
    this.showResults = false;
  }

  public searchProduct(term:string){
    this.loading.show();
    this.subscription = this.sp.getProducts(term).subscribe((resp: SearchProduct) => {
      this.loading.hide();
      if(resp.length > 0 ) {
        this.showResults = true;
        this.showNotFound = false;
        this.productsList = resp;
      } else {
        this.showNotFound = true;
        this.showResults = false;
      }
    })
  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
    
  }

  dataProduct(product) {
    console.log(product);
  }

}
