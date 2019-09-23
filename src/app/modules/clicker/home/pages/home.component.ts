import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { ProductSearchService } from "src/app/services/product-search.service";
import { SearchProduct } from "src/app/interfaces/search-product";
import { Subscription } from "rxjs";
import { LoaderService } from "src/app/services/loader.service";
import { PageEvent } from "@angular/material/paginator";
import { MatDialog } from "@angular/material";
import { DialogComponent } from "src/app/modules/shared/components/dialog/dialog.component";
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(
    private sp: ProductSearchService,
    private loading: LoaderService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private user: UserService
  ) {}

  @ViewChild("templateDialog", { static: false }) template: TemplateRef<any>;

  private subscription: Subscription = new Subscription();
  productsList: SearchProduct;
  showResults: boolean;
  showNotFound: boolean;
  paginate: string;
  totalItems: number;
  pageSize: number = 5;
  pageTo: number = 5;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  url =
    "https://www.exito.com/?utm_source=clickam&utm_medium=referral&utm_campaign=productosexito&utm_content=1017200776";
  formLink: FormGroup;

  ngOnInit() {
    this.showNotFound = false;
    this.showResults = false;

    this.formLink = this.fb.group(
      {
        link: [this.url]
      }
    )

    this.user.getProfile().subscribe(user=> {
      console.log(user);
    })

  }

  private totalItemsSearch(term: string) {
    const params = { term };
    this.subscription = this.sp
      .getTotalItems(params)
      .subscribe((resp: SearchProduct) => {
        this.totalItems = resp.length;
      });
  }

  public searchProductPaginate(
    term: string,
    from = "1",
    to = this.pageTo.toString()
  ) {
    this.loading.show();
    this.paginate = term;
    const params = { term, from, to };
    this.totalItemsSearch(term);
    this.subscription = this.sp
      .getProductsPagination(params)
      .subscribe((resp: SearchProduct) => {
        this.loading.hide();
        if (resp.length > 0) {
          this.showResults = true;
          this.showNotFound = false;
          this.productsList = resp;
        } else {
          this.showNotFound = true;
          this.showResults = false;
        }
      });
  }

  public pagination(paginate: any) {
    paginate.length = this.totalItems;
    const from = (paginate.pageSize * paginate.pageIndex + 1).toString();
    const to = (paginate.pageSize * (paginate.pageIndex + 1)).toString();
    this.searchProductPaginate(this.paginate, from, to);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // MatPaginator Output
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(",").map(str => +str);
  }

  dataProduct(product) {
    console.log(product);
    const title = product.productName;
    const id = product.productId;
    const template = this.template;
    const showClose = true;
    const buttonClose = "Cerrar";
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { title, template, showClose, buttonClose, id }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  /* To copy Text from Textbox */
  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.openSnackBar('Se ha copiado el link al portapapeles', 'Cerrar')
  }

}
