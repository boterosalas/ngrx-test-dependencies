import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-link-generator',
  templateUrl: './link-generator.component.html',
  styleUrls: ['./link-generator.component.scss'],
})
export class LinkGeneratorComponent implements OnInit, OnDestroy {
  constructor(private content: ContentService, private utils: UtilsService) {}

  ngOnInit() {
    this.getBussiness();
    this.checkRole();
  }
  checkRole() {
    this.utils.checkPermision();
  }
  private subscription: Subscription = new Subscription();
  bussiness = [];
  url: string = '';
  enableButton = false;

  public getBussiness() {
    this.subscription = this.content.getBusiness().subscribe((bussiness) => {
      this.bussiness = bussiness;
    });
  }

  public generateLink(formValue) {
    this.subscription = this.content
      .getLinkBusiness(formValue)
      .subscribe((resp) => {
        this.url = resp;
        if (this.url !== '') {
          this.enableButton = true;
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
