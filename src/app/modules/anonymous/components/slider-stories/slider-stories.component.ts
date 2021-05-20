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
  storiesBusiness = []
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
          data.objectResponse.forEach(storyS => {
            let bussinessStory = this.bussiness.filter(b => b.id === storyS.idbusiness)[0]

            let objectStory = {
              idbusiness: storyS.idbusiness,
              id: storyS.id,
              businessName: bussinessStory ? bussinessStory.description : '',
              name: storyS.description,
              image: storyS.imageurl,
              infoAditional: storyS.infoaditional,
              businessCode: bussinessStory ? bussinessStory.code : '',
              businessImage: bussinessStory ? bussinessStory.imageurl : '',
              date: new Date(storyS.date),
              link: storyS.link,
              pause: true,
              stateView: !storyS.new,
            }

            this.stories.push(objectStory)
          });

          this.stories.forEach(story => {
            if (!this.storiesBusiness.some(x => x.idbusiness === story.idbusiness)) {
              this.storiesBusiness.push({
                idbusiness: story.idbusiness,
                businessImage: story.businessImage,
                businessName: story.businessName,
                stateView: story.stateView,
                pause: true
              })
            }
          })

          console.log("getStories",this.storiesBusiness, this.stories)
        }
      }
    })
  }

  public openDialogStories(index: number = 0) {
    this.dialog.open(DialogStoriesComponent, {
      data: {
        stories: this.stories,
        storiesBusiness: this.storiesBusiness,
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