import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { LinksService } from 'src/app/services/links.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sales-info',
  templateUrl: './sales-info.component.html',
  styleUrls: ['./sales-info.component.scss'],
})
export class SalesInfoComponent implements OnInit, OnDestroy {
  userId: string;

  constructor(private user: UserService, private link: LinksService, private token: TokenService) {
    this.userId = token.user.userid;
  }

  private subscription: Subscription = new Subscription();

  @Input()
  className: string = 'card-sales-info';

  fullName: string;
  initialName: string;
  initialLastName: string;
  totalComission: string;
  linksCreated: string;
  sellProducts: string;
  conversionRate: string;

  ngOnInit(): void {
    this.getUserdata();
    this.getInfomonth();
  }

  public getUserdata() {
    this.subscription = this.user.getuserdata().subscribe(({ firstnames, lastnames }) => {
      this.fullName = `${firstnames} ${lastnames}`;
      this.initialName = firstnames?.charAt(0);
      this.initialLastName = lastnames?.charAt(0);
    });
  }

  public getInfomonth() {
    this.link.getReportUser(this.userId).subscribe({
      next: (resp: ResponseService) => {
        const { generalResume } = resp.objectResponse;
        this.totalComission = generalResume.totalCommissions;
        this.linksCreated = generalResume.totalLinks;
        this.sellProducts = generalResume.totalProducts;
        this.conversionRate = generalResume.conversionRate;
      },
      error: () => {
        this.totalComission = '0';
        this.linksCreated = '0';
        this.sellProducts = '0';
        this.conversionRate = '0';
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
