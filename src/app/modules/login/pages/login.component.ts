import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  showLoginForm: boolean;
  showRegisterForm: boolean;

  ngOnInit() {
    this.showLoginForm = true;
    this.showRegisterForm = false;
  }

  
  public showRegister() {
    this.router.navigate(['/registro']);
  }

}
