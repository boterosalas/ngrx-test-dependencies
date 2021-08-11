import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recoverpassword',
  templateUrl: './recoverpassword.component.html',
  styleUrls: ['./recoverpassword.component.scss'],
})
export class RecoverpasswordComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    /**
     * verifica si el usuario esta logueado y lo envia a la pagina de clicker, para no mostrar recuperar contraseña
     */

    if (this.auth.isLoggedIn()) {
      this.router.navigate(['clicker']);
    }
  }
}
