import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  isHome: boolean;
  internal: boolean;

  constructor(translate: TranslateService, private router: Router) {
    translate.setDefaultLang("es");
    translate.use("es");
    const path = window.location.pathname;

    router.events.subscribe((url: any) => {
      if (path === "/") {
        this.isHome = true;
        this.internal = false
      } else {
        this.isHome = false;
        this.internal = true;
      }
    });
  }
}
