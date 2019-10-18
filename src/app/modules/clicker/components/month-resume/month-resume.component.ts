import { Component, OnInit } from "@angular/core";
import { LinksService } from "src/app/services/links.service";
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

  linksCreated: string;
  identification: string;
  totalComissions: string;
  isLoggedIn: any;

  title = 'Performance del Clicker';
   type = 'ComboChart';
   data = [];
   columnNames = ['Mes', 'Links Creados', 'Comisión'];

   options = {   
    colors: ['#FF6F11', '#B5B8BC'],
      hAxis: {
         title: 'Últimos 30 días'
      },
      vAxes:{
         0: {title: 'Links Creados'},
         1: {title: 'Comisión'}
      },
      seriesType: 'bars',
      series: {
        0: {type: 'line', targetAxisIndex: 0},
        1: {type:'bar', targetAxisIndex: 1}
      },
      is3D: true,
      legend: { position: 'top', alignment: 'center' }
   };

   
   width = 550;
   height = 400;

  


  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();

    /**
     * verifica si el usuario esta logueado y se obtiene la identificacion
     */

    if (this.isLoggedIn) {
      this.user.userInfo$.pipe(distinctUntilChanged()).subscribe(val => {
        if (!!val) {
          this.identification = val.identification;
          this.getInfomonth();
        }
      });
    }
    
    
  }

  /**
   * Metodo para obtener el resumen del mes generados
   */

  private getInfomonth() {
    this.link.getReports(this.identification).subscribe((resume: any) => {
      this.linksCreated = resume.MonthResume.TotalLink;
      this.totalComissions = resume.MonthResume.TotalCommissions;
      this.data = resume.MonthResume.DaysResume;
    });
  }
}
