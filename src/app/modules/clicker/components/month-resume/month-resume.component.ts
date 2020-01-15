import { Component, OnInit, OnDestroy } from "@angular/core";
import { LinksService } from "src/app/services/links.service";
import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/services/auth.service";
import { distinctUntilChanged } from "rxjs/operators";
import { Subscription } from "rxjs";
import { TokenService } from "src/app/services/token.service";

@Component({
  selector: "app-month-resume",
  templateUrl: "./month-resume.component.html",
  styleUrls: ["./month-resume.component.scss"]
})
export class MonthResumeComponent implements OnInit, OnDestroy {
  constructor(
    private link: LinksService,
    private user: UserService,
    private auth: AuthService,
    private token: TokenService
  ) {}

  linksCreated: string;
  identification: string;
  totalComissions: string;
  isLoggedIn: any;
  private subscription: Subscription = new Subscription();

  title = "Performance del Clicker";
  type = "ComboChart";
  data = [];
  columnNames = ["Mes", "Links Creados", "Comisión"];

  options = {
    colors: ["#FF6F11", "#B5B8BC"],
    hAxis: {
      title: "Últimos 30 días"
    },
    vAxes: {
      0: { title: "Links Creados" },
      1: { title: "Comisión" }
    },
    seriesType: "bars",
    series: {
      0: { type: "line", targetAxisIndex: 0 },
      1: { type: "bar", targetAxisIndex: 1 }
    },
    is3D: true,
    legend: { position: "top", alignment: "center" }
  };

  width = 350;
  height = 400;

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();

    /**
     * verifica si el usuario esta logueado y se obtiene la identificacion
     */

    if (this.isLoggedIn) {
      this.identification = this.token.userInfo().identification;
      this.getInfomonth();
    }
  }

  /**
   * Metodo para obtener el resumen del mes generados
   */

  private getInfomonth() {
    this.subscription = this.link.getReports(this.identification).subscribe((resume: any) => {
      this.linksCreated = resume.monthResume.totalLink;
      this.totalComissions = resume.monthResume.totalCommissions;
      this.data = resume.monthResume.daysResume;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
