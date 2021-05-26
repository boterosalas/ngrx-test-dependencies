import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { UtilsService } from "src/app/services/utils.service";
import { ContentService } from "src/app/services/content.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  panelOpenState = false;
  // sectionsLinks: any;
  private subscription: Subscription = new Subscription();

  constructor(
    public auth: AuthService,
    private router: Router,
    private utils: UtilsService,
    private content: ContentService
  ) {}

  public getSections() {
    this.subscription = this.content
      .getFooter()
      .subscribe((resp) => {
        this.sectionsLinks = resp;
      });
  }

  sectionsLinks = [
    {
      id: 3,
      description: "Legales",
      orderby: 1,
      date: "2021-05-25T08:49:41.757",
      links: null,
    },
    {
      id: 2,
      description: "Soporte",
      orderby: 2,
      date: "2021-05-25T08:49:35.617",
      links: [
        {
          id: 6,
          idseccion: 2,
          link: "https://www.google.com.co",
          description: "EPC",
          orderby: 0,
          date: "2021-05-25T14:42:43.923",
        },
      ],
    },
    {
      id: 1,
      description: "clickam",
      orderby: 3,
      date: "2021-05-25T08:48:42.533",
      links: [
        {
          id: 4,
          idseccion: 1,
          link: "https://www.google.com.co",
          description: "¿Tienes un sitio web? Regístralo Aqui!",
          orderby: 1,
          date: "2021-05-25T09:16:06.897",
        },
        {
          id: 3,
          idseccion: 1,
          link: "https://www.google.com.co",
          description: "Tabla de comisiones",
          orderby: 2,
          date: "2021-05-25T09:15:51.24",
        },
        {
          id: 2,
          idseccion: 1,
          link: "https://www.google.com.co",
          description: "Click Academy",
          orderby: 3,
          date: "2021-05-25T09:15:14.56",
        },
        {
          id: 1,
          idseccion: 1,
          link: "https://www.google.com.co",
          description: "Blog",
          orderby: 4,
          date: "2021-05-25T09:16:35.603",
        },
      ],
    },
  ];

  ngOnInit() {
    // this.getSections();
  }

  goTerms() {
    this.router.navigate(["/terminos-y-condiciones"]);
    this.utils.hideloginForm();
  }
}
