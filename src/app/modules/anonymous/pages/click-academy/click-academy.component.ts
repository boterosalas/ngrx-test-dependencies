import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-click-academy',
  templateUrl: './click-academy.component.html',
  styleUrls: ['./click-academy.component.scss']
})
export class ClickAcademyComponent implements OnInit {

  pdf:string;

  constructor(
    private user: UserService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      document.querySelector('.mat-tab-label[aria-posinset="1"]').classList.add("gtmClicAcademyClicExitocom");
      document.querySelector('.mat-tab-label[aria-posinset="2"]').classList.add("gtmClicAcademyClicSeguros");
      document.querySelector('.mat-tab-label[aria-posinset="3"]').classList.add("gtmClicAcademyClicViajes");
    }, 1000);
    this.pdf = environment.PDF;
  }

  public resetOnboarding() {
    this.user.saveOnboarding(false).subscribe();
    setTimeout(() => {
      this.router.navigate(['./inicio']);
    }, 500);
  }

}
