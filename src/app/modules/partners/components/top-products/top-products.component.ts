import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LinksService } from 'src/app/services/links.service';

@Component({
  selector: 'app-top-products',
  templateUrl: './top-products.component.html',
  styleUrls: ['./top-products.component.scss']
})
export class TopProductsComponent implements OnInit {

  private subscription: Subscription = new Subscription();

  constructor(private links:LinksService) {}

 dataSource = [
   {productname: 'Electrodomésticos', users:'123', links: '1235', clicks: '1012', sell: '750', reward:'1155000'},
   {productname: 'Electrodomésticos', users:'123', links: '1235', clicks: '1012', sell: '750', reward:'1155000'},
   {productname: 'Electrodomésticos', users:'123', links: '1235', clicks: '1012', sell: '750', reward:'1155000'},
   {productname: 'Electrodomésticos', users:'123', links: '1235', clicks: '1012', sell: '750', reward:'1155000'},
   {productname: 'Electrodomésticos', users:'123', links: '1235', clicks: '1012', sell: '750', reward:'1155000'},
   {productname: 'Electrodomésticos', users:'123', links: '1235', clicks: '1012', sell: '750', reward:'1155000'},
   {productname: 'Electrodomésticos', users:'123', links: '1235', clicks: '1012', sell: '750', reward:'1155000'}
 ]

  displayedColumns: string[] = ['productname', 'user', 'links', 'clicks', 'sell', 'reward'];

  ngOnInit() {
    // this.getLinksHistory();
  }


  // public getLinksHistory(from = 1, to = 5, orderBy = 'QUANTITY' , orderOrigin = 'DESC', startDate = '', endDate = '') {
  //   const params = { from, to, orderOrigin , orderBy, startDate, endDate };
  //   this.subscription = this.links.getLinkHistory(params).subscribe((resp) => {
  //     this.dataSource = resp.linkHistory;
  //   });
  // }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
