import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LinksService } from 'src/app/services/links.service';

@Component({
  selector: 'app-top-reward',
  templateUrl: './top-reward.component.html',
  styleUrls: ['./top-reward.component.scss']
})
export class TopRewardComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  constructor(private links:LinksService) {}

 dataSource = []

  displayedColumns: string[] = ['productname', 'date', 'comission', 'total', 'visits'];

  ngOnInit() {
    this.getLinksHistory();
  }


  public getLinksHistory(from = 1, to = 5, orderBy = 'QUANTITY' , orderOrigin = 'DESC', startDate = '', endDate = '') {
    const params = { from, to, orderOrigin , orderBy, startDate, endDate };
    this.subscription = this.links.getLinkHistory(params).subscribe((resp) => {
      this.dataSource = resp.linkHistory;
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
