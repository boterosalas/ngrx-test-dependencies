import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Subscription } from "rxjs";
import { ResponseService } from "src/app/interfaces/response";
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

  active = [];
  scheduled = [];
  drafts = [];
  defeated = [];

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

    this.content.getStoriesadmin(true, this.idBussiness).subscribe((resp: ResponseService) => {
      this.active = resp.objectResponse.active;
      this.scheduled = resp.objectResponse.scheduled;
      this.drafts = resp.objectResponse.drafts;
      this.defeated = resp.objectResponse.defeated;
    });

  }

  public newStory() {
    const newStory = this.dialog.open(DialogStoryComponent, {
      width: '800px',
      data: this.idBussiness
    });

    newStory.beforeClosed().subscribe(() => {
      this.content.getStoriesadmin(true, this.idBussiness).subscribe((resp: ResponseService) => {
        this.active = resp.objectResponse.active;
        this.scheduled = resp.objectResponse.scheduled;
        this.drafts = resp.objectResponse.drafts;
        this.defeated = resp.objectResponse.defeated;
      });
    });

  }

  selectAll(){
    console.log('select');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
