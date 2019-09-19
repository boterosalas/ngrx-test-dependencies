import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductSearchService } from 'src/app/services/product-search.service';
import { SearchProduct } from 'src/app/interfaces/search-product';

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
