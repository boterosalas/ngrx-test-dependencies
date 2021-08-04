import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Subscription } from "rxjs";
import { ContentService } from "src/app/services/content.service";
import { DialogFaqGroupComponent } from "../../components/dialog-faq-group/dialog-faq-group.component";
import { DialogStoryComponent } from "../../components/dialog-story/dialog-story.component";

@Component({
  selector: "app-stories",
  templateUrl: "./stories.component.html",
  styleUrls: ["./stories.component.scss"],
})
export class StoriesComponent implements OnInit, OnDestroy {
  constructor(private content: ContentService, private dialog: MatDialog) {}

  private subscription: Subscription = new Subscription();
  business = [];
  newStoryActiveButton = true;
  idBussiness:number;

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
    if(business !== ''){
      this.newStoryActiveButton = false;
      this.idBussiness = business.id;
    } else{
      this.newStoryActiveButton = true;
    }
  }

  public newStory() {
    this.dialog.open(DialogStoryComponent, {
      width: '800px',
      data: this.idBussiness
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
