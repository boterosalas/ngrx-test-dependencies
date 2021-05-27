import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { UtilsService } from "src/app/services/utils.service";
import { ContentService } from "src/app/services/content.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  panelOpenState = false;
  sectionsLinks: any;
  private subscription: Subscription = new Subscription();

  constructor(
    public auth: AuthService,
    private router: Router,
    private utils: UtilsService,
    private content: ContentService
  ) {}

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

  goTerms() {
    this.router.navigate(["/terminos-y-condiciones"]);
    this.utils.hideloginForm();
  }
}
