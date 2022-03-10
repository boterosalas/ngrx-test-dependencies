import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit, OnDestroy {
  constructor(private content: ContentService) {}
  private subscription: Subscription = new Subscription();

  catalogs = [];

  ngOnInit(): void {
    this.getCatalog();
  }

  public getCatalog() {
    this.subscription = this.content.getCatalog(false).subscribe((catalogs: ResponseService) => {
      this.catalogs = catalogs.objectResponse.published;
      console.log(this.catalogs);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
