import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ContentService } from 'src/app/services/content.service';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-all-bussiness',
  templateUrl: './all-bussiness.component.html',
  styleUrls: ['./all-bussiness.component.scss']
})
export class AllBussinessComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  bussiness: Array<any> = [];
  isEmployee: any;
  role: string;
  userId: any;
  message: any;

  constructor(
    public router: Router,
    public auth: AuthService,
    private content: ContentService  ) {
  }

  ngOnInit() {
    this.getBussiness();
  }

  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  
  public getBussiness() {
    this.subscription = this.content
      .getBusiness()
      .pipe(distinctUntilChanged())
      .subscribe((bussiness) => {
        this.bussiness = bussiness;
      });
  }

  public bussinessNavigation(bussiness) {
    
    let params = {
      id: bussiness.id,
      code: bussiness.code,
      infoAditional: bussiness.infoaditional,
      imageurl: bussiness.imageurl,
    };
    this.router.navigate([
      "/bussiness",
      {
        id: params.id,
        code: params.code,
        infoAditional: params.infoAditional,
        imageurl: params.imageurl,
        allBussiness: true
      },
    ]);
  }


}
