import { Component, OnInit } from '@angular/core';
import { LinksService } from 'src/app/services/links.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-general-resume',
  templateUrl: './general-resume.component.html',
  styleUrls: ['./general-resume.component.scss']
})
export class GeneralResumeComponent implements OnInit {

  constructor(
    private link: LinksService,
    private user: UserService,
    private auth: AuthService
  ) { }

  linksGenerated: string;
  identification: string;
  totalComissions: string;
  totalProducts: string;
  conversionRate: string;
  isLoggedIn: any;

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
   * Metodo para obtener la informacion del resumen general
   */

  private getInfomonth() {
    this.link.getReports(this.identification).subscribe((resume: any) => {
      this.linksGenerated = resume.GeneralResume.TotalLinks;
      this.totalComissions = resume.GeneralResume.TotalCommissions;
      this.totalProducts = resume.GeneralResume.TotalProducts;
      this.conversionRate = resume.GeneralResume.ConversionRate;
    });
  }
}
