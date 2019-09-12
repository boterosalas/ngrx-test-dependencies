import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  showLoginForm: boolean;
  showRegisterForm: boolean;

  ngOnInit() {
    this.showLoginForm = true;
    this.showRegisterForm = false;
  }

  
  public showRegister() {
    this.showRegisterForm = true;
    this.showLoginForm = false;
  }

  public showLogin() {
    this.showRegisterForm = false;
    this.showLoginForm = true;
  }

}
