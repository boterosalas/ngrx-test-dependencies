import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-top-products',
  templateUrl: './top-products.component.html',
  styleUrls: ['./top-products.component.scss'],
})
export class TopProductsComponent implements OnInit {
  private subscription: Subscription = new Subscription();

  constructor(private user: UserService) {}

  dataSource = [];

  displayedColumns: string[] = ['productname', 'user', 'links', 'clicks', 'sell', 'reward'];

  ngOnInit() {
    this.getTopCategories();
  }

  public getTopCategories() {
    this.subscription = this.user.getTop().subscribe((resp:ResponseService) => {
       this.dataSource = resp.objectResponse;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
