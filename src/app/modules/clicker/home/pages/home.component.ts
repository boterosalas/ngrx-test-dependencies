import { Component, OnInit } from '@angular/core';
import { ProductSearchService } from 'src/app/services/product-search.service';
import { SearchProduct } from 'src/app/interfaces/search-product';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import {PageEvent} from '@angular/material/paginator';

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
  term: string;
  totalItems: number;
  pageSize: number = 5;
  pageTo:number = 5;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  

  ngOnInit() {
    this.showNotFound = false;
    this.showResults = false;
  }

  public searchProduct(term: string, from = '1', to = this.pageTo.toString()){
    this.loading.show();
    this.term = term;
    const params = {term, from , to};
    this.subscription = this.sp.getProducts(params).subscribe((resp: SearchProduct) => {
      this.loading.hide();
      this.totalItems = resp.length;
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

  public pagination(term: any) {
    const from = ((term.pageSize * term.pageIndex) + 1).toString();
    const to = (term.pageSize * (term.pageIndex + 1 )).toString();
    this.searchProduct(this.term, from, to);

  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }

   // MatPaginator Output
   pageEvent: PageEvent;

   setPageSizeOptions(setPageSizeOptionsInput: string) {
     this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
   }

  dataProduct(product) {
    console.log(product);
  }

}
