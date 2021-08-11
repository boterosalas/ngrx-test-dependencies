import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';

export interface FooterElement {
  drag: any;
  section: any;
}
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['description', 'link', 'actions'];

  constructor(private content: ContentService) {}

  dataSource: any;
  @ViewChild('table', { static: false }) table: MatTable<FooterElement>;

  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.getAllFooterSections();
  }

  public getAllFooterSections() {
    this.subscription = this.content.getFooter('ADMIN').subscribe((resp) => {
      this.dataSource = resp;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
