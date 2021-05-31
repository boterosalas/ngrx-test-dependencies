import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { UtilsService } from "src/app/services/utils.service";
import { ContentService } from "src/app/services/content.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-navigation-footer',
  templateUrl: './navigation-footer.component.html',
  styleUrls: ['./navigation-footer.component.scss']
})
export class NavigationFooterComponent implements OnInit {
  sectionsLinks: any;
  private subscription: Subscription = new Subscription();
  
  constructor(private content: ContentService) { }

  public getSections() {
    this.subscription = this.content
      .getFooter()
      .subscribe((resp) => {
        this.sectionsLinks = resp;
      });
  }

  ngOnInit() {
    this.getSections();
  }

}
