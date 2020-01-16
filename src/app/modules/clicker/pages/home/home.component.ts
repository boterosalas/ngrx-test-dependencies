import { Component, OnInit, OnDestroy } from "@angular/core";
import { LinksService } from 'src/app/services/links.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor( 
    private link: LinksService,
    private auth: AuthService,
    private token: TokenService
    ) {}

  isLoggedIn: any;
  private subscription: Subscription = new Subscription();
  identification: string;
  available: string;
  account:string;

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
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
      this.available = resume.money.available;
      this.account = resume.money.account;
    });
  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }


}
