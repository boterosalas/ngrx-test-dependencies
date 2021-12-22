import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { LinksService } from 'src/app/services/links.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sales-info',
  templateUrl: './sales-info.component.html',
  styleUrls: ['./sales-info.component.scss']
})
export class SalesInfoComponent implements OnInit, OnDestroy {
  
  userId: string;

  constructor(private user: UserService, private link: LinksService, private token: TokenService) { 
    this.userId = token.user.userid;
  }

  private subscription: Subscription = new Subscription();

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

  public getUserdata(){
    this.subscription = this.user.getuserdata().subscribe(({firstNames, lastNames}) => {
      this.fullName = `${firstNames} ${lastNames}`;
      this.initialName = firstNames.charAt(0);
      this.initialLastName = lastNames.charAt(0);
    });
  }

  public getInfomonth() {
    this.link.getReportUser(this.userId).subscribe((resp: ResponseService) => {
      const {generalResume} = resp.objectResponse
      this.totalComission = generalResume.totalCommissions;
      this.linksCreated = generalResume.totalLinks;
      this.sellProducts =  generalResume.totalLinks;
      this.conversionRate =  generalResume.conversionRate;
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
