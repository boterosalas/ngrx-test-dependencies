import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogStoriesComponent } from '../../../shared/components/dialog-stories/dialog-stories.component'
import { ContentService } from 'src/app/services/content.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from "rxjs";
import { ResponseService } from "src/app/interfaces/response";
import decode from "jwt-decode";

@Component({
  selector: 'app-slider-stories',
  templateUrl: './slider-stories.component.html',
  styleUrls: ['./slider-stories.component.scss']
})
export class SliderStoriesComponent implements OnInit, OnDestroy {
  stories = []
  bussiness: any
  userId: string

  constructor(
    private user: UserService,
    private dialog: MatDialog,
    private content: ContentService,
  ) { }

  private subscription: Subscription = new Subscription();

  ngOnInit() {
    let token = localStorage.getItem("ACCESS_TOKEN");
    let tokenDecode = decode(token);
    this.userId = tokenDecode.userid;
    this.getBusiness()
  }

  public getBusiness() {
    this.content.getBusiness().subscribe((bussiness) => {
      this.bussiness = bussiness
      this.getStories()
    });
  }

  public getStories() {
    this.content.getStories(false).subscribe((data: ResponseService) => {
      if (data.state === "Success") {
        if (data.objectResponse) {
          data.objectResponse.forEach(story => {
            let bussiness = this.bussiness.filter(b => b.id === story.idbusiness)[0]

            this.stories.push({
              id: story.id,
              idbusiness: story.idbusiness,
              name: story.description,
              businessName: bussiness ? bussiness.description : '',
              infoAditional: story.infoaditional,
              image: story.imageurl,
              businessImage: bussiness ? bussiness.imageurl : '',
              businessCode: bussiness ? bussiness.code : '',
              link: story.link,
              date: new Date(story.date),
              stateView: !story.new,
              pause: true
            })
          });
        }
      }
    })
  }

  public openDialogStories(index: number = 0) {
    this.dialog.open(DialogStoriesComponent, {
      data: {
        stories: this.stories,
        id: index.toString(),
        showArrows: true,
        userId: this.userId,
        showCarousel: true
      },
      panelClass: 'dialog-stories',
      hasBackdrop: false,
      width: '100vw',
      maxWidth: '100vw',
      height: '100vh'
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
   }
}