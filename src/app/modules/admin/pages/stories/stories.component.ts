import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ContentService } from "src/app/services/content.service";

@Component({
  selector: "app-stories",
  templateUrl: "./stories.component.html",
  styleUrls: ["./stories.component.scss"],
})
export class StoriesComponent implements OnInit, OnDestroy {
  constructor(private content: ContentService) {}

  private subscription: Subscription = new Subscription();
  business = [];
  active = [
    {
      description: "Gane y Viaje",
      id: 58,
      imageurl:
        "https://webclickamqa.blob.core.windows.net/img-ofertas/stories/20210521144953.jpg",
      link: "https://www.loteriadebogota.com/ganaste/?utm_source=clickam&utm_medium=referral&utm_campaign={1}",
      idbusiness: 22,
      infoaditional: "Hasta 2%",
      active: true,
      orderby: null,
      date: "2021-05-21T14:49:53.31",
      new: false,
      extension: 'jpg'

    }
  ];
  scheduled = [
    {
      description: "Gane y Refiere",
      id: 60,
      imageurl:
        "https://webclickamqa.blob.core.windows.net/img-ofertas/stories/20210521144953.jpg",
      link: "https://www.loteriadebogota.com/ganaste/?utm_source=clickam&utm_medium=referral&utm_campaign={1}",
      idbusiness: 22,
      infoaditional: "Hasta 3%",
      active: true,
      orderby: null,
      date: "2021-05-21T14:49:53.31",
      new: false,
      extension: 'jpg'
    },
  ];
  drafts = [
    {
      description: "Gane y Viaje",
      id: 58,
      imageurl:
        "https://webclickamqa.blob.core.windows.net/img-ofertas/stories/20210521144953.jpg",
      link: "https://www.loteriadebogota.com/ganaste/?utm_source=clickam&utm_medium=referral&utm_campaign={1}",
      idbusiness: 22,
      infoaditional: "Hasta 2%",
      active: true,
      orderby: null,
      date: "2021-05-21T14:49:53.31",
      new: false,
      extension: 'jpg'
    },
  ];
  defeated = [
    {
      description: "Gane y Viaje",
      id: 58,
      imageurl:
        "https://webclickamqa.blob.core.windows.net/img-ofertas/stories/20210521144953.jpg",
      link: "https://www.loteriadebogota.com/ganaste/?utm_source=clickam&utm_medium=referral&utm_campaign={1}",
      idbusiness: 22,
      infoaditional: "Hasta 2%",
      active: true,
      orderby: null,
      date: "2021-05-21T14:49:53.31",
      new: false,
      extension: 'jpg'
    },
  ];

  ngOnInit() {
    this.getAllBusiness();
  }

  public getAllBusiness() {
    this.subscription = this.content.getAllBusiness().subscribe((resp) => {
      this.business = resp;
    });
  }

  public onChangeSelected(business) {
    console.log(business);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
