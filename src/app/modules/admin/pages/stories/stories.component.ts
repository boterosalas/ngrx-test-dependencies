import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit, OnDestroy {

  constructor(
    private content: ContentService
  ) { }

  private subscription: Subscription = new Subscription();
  business = [];

  ngOnInit() {
    this.getAllBusiness();
  }

  public getAllBusiness() {
    this.subscription = this.content.getAllBusiness().subscribe(resp => {
      this.business = resp;
    })
  }

  public onChangeSelected(business) {
    console.log(business);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
