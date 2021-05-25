import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  panelOpenState = false;

  constructor(public auth: AuthService, private router: Router, private utils: UtilsService) {

   }

  ngOnInit() {
  }

  goTerms() {
    this.router.navigate(['/terminos-y-condiciones']);
    this.utils.hideloginForm();
  }

}
