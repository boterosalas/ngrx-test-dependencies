import { Component, OnInit, ViewChild } from "@angular/core";
import { GoogleChartComponent } from "angular-google-charts";
import { LinksService } from "src/app/services/links.service";
import { ResponseService } from "src/app/interfaces/response";
import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/services/auth.service";
import { distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-month-resume",
  templateUrl: "./month-resume.component.html",
  styleUrls: ["./month-resume.component.scss"]
})
export class MonthResumeComponent implements OnInit {
  constructor(
    private link: LinksService,
    private user: UserService,
    private auth: AuthService
  ) {}

  linksGenerated: string;
  identification: string;
  isLoggedIn: any;

  myoptions = {
    title: "Monthly Coffee Production by Country",
    vAxis: { title: "Cups" },
    hAxis: { title: "Month" },
    seriesType: "bars",
    series: { 5: { type: "BarChart" } }
  };

  myData = [["clicks", 136, 6], ["Comisiones", 20000, 500]];

  ngOnInit() {

    this.isLoggedIn = this.auth.isLoggedIn();
    if (this.isLoggedIn) {
      this.user.userInfo$.pipe(distinctUntilChanged()).subscribe(val => {
        if (!!val) {
          this.identification = val.identification;
        }
      });
    }
    setTimeout(() => {
      this.getLinksGenerated();
    }, 1000);
  }

  public getLinksGenerated() {
    this.link.getLink(this.identification).subscribe((link: any) => {
      this.linksGenerated = link.totalLinks;
    });
  }
}
