import { Component, OnInit } from '@angular/core';
import { LinksService } from 'src/app/services/links.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ContentService } from 'src/app/services/content.service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.scss'],
})
export class UrlComponent implements OnInit {
  code: string;
  showMessage = false;
  show = true;
  showLogin = false;

  constructor(
    private link: LinksService,
    private authSvc: AuthService,
    private route: ActivatedRoute,
    private utilsSvc: UtilsService,
    private userSvc: UserService,
    private router: Router,
    private metaTagService: Meta
  ) {
    this.route.params.subscribe((param) => {
      this.code = param.shortCode;
    });
  }

  ngOnInit() {
    if (this.authSvc.isLoggedIn()) {
      this.getUrl();
    } else {
      this.utilsSvc.showloginForm();
      this.utilsSvc.change.subscribe((isOpen) => {
        if (this.authSvc.isLoggedIn() && !isOpen) {
          this.getUrl();
        }
      });
    }

    this.metaTagService.addTags([
      {
        name: 'keywords',
        content: 'clickam, exito.com, carulla.com, seguros, referidos, viajes, cashback ',
      },
      {
        name: 'description',
        content:
          '¡Te han referido! Realiza tus compras, disfruta los mejores productos y servicios del mercado. Con Clickam gana dinero al recomendar lo que más te gusta.',
      },
    ]);
  }

  public getUrl() {
    let exist = environment.idsBussinesWidget.find((code) => code.code === this.code);

    if (exist) {
      this.userSvc.getProfile();
      this.userSvc.userInfo$.subscribe((user) => {
        if (user) {
          const data = { idBusiness: exist.id, userId: user.userId, url: exist.url };
          this.link.getUrlWidget(data).subscribe((resp) => {
            console.log(resp);
            //window.location.replace(url);
          });
        }
      });
    } else {
      this.link.getUrl(this.code).subscribe((url) => {
        if (url !== null) {
          window.location.replace(url);
        }
        if (url === null) {
          this.showMessage = true;
          this.router.navigate(['/']);
          this.show = false;
        }
      });
    }
  }
}
