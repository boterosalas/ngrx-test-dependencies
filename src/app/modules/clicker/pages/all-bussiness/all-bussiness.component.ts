import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ContentService } from 'src/app/services/content.service';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-all-bussiness',
  templateUrl: './all-bussiness.component.html',
  styleUrls: ['./all-bussiness.component.scss'],
})
export class AllBussinessComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  bussiness: Array<any> = [];
  isEmployee: any;
  role: string;
  userId: any;
  message: any;
  sliderWeb = [];
  category: Object[] = [];

  constructor(public router: Router, public auth: AuthService, private content: ContentService) {}

  ngOnInit() {
    this.getBussinessByCategory();
    this.carousel();
    this.getCategoriesBusiness();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public getCategoriesBusiness() {
    this.content.getCategories().subscribe((categories) => {
       this.category = categories;
    })
  }

  public selectCategory(data: any) {
    const id = data.value;
    this.getBussinessByCategory(id);
  }

  public getBussinessByCategory(id?:number) {
    this.subscription = this.content
      .getBusinessByCategory(id)
      .pipe(distinctUntilChanged())
      .subscribe((bussiness) => {
        this.bussiness = bussiness;
      });
  }

  public bussinessNavigation(bussiness) {
    const params = {
      id: bussiness.id,
      code: bussiness.code,
      infoAditional: bussiness.infoaditional,
      imageurl: bussiness.imageurl,
      description: bussiness.description,
    };
    this.router.navigate([
      '/bussiness',
      {
        id: params.id,
        code: params.code,
        infoAditional: params.infoAditional,
        imageurl: params.imageurl,
        allBussiness: true,
        description: params.description,
      },
    ]);
  }

  public carousel() {
    this.subscription = this.content.getOffersbyType({ id: 'CARROUSEL', admin: false }).subscribe((resp) => {
      this.sliderWeb = resp;
    });

  }

}
