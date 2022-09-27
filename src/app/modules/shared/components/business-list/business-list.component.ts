import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.scss']
})
export class BusinessListComponent implements OnInit {

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

}