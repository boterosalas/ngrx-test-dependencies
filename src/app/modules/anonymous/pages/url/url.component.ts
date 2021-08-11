import { Component, OnInit } from '@angular/core';
import { LinksService } from 'src/app/services/links.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.scss'],
})
export class UrlComponent implements OnInit {
  code: string;
  showMessage = false;
  show  = true;

  constructor(private link: LinksService, private route: ActivatedRoute, private router: Router, private metaTagService: Meta) {
    this.route.params.subscribe((param) => {
      this.code = param.shortCode;
    });
  }

  ngOnInit() {
    this.getUrl();

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
