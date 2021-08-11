import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogStoriesComponent } from '../../../shared/components/dialog-stories/dialog-stories.component';
import { ContentService } from 'src/app/services/content.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import decode from 'jwt-decode';

@Component({
  selector: 'app-slider-stories',
  templateUrl: './slider-stories.component.html',
  styleUrls: ['./slider-stories.component.scss'],
})
export class SliderStoriesComponent implements OnInit, OnDestroy {
  stories = [];
  storiesBusiness = [];
  bussiness: any;
  userId: string;

  constructor(private user: UserService, private dialog: MatDialog, private content: ContentService) {}

  private subscription: Subscription = new Subscription();

  ngOnInit() {
    const token = localStorage.getItem('ACCESS_TOKEN');
    const tokenDecode = decode(token);
    this.userId = tokenDecode.userid;
    this.getBusiness();
  }

  public getBusiness() {
    this.content.getBusiness().subscribe((bussiness) => {
      this.bussiness = bussiness;
      this.getStories();
    });
  }

  public getStories() {
    this.content.getStories(false).subscribe((data: ResponseService) => {
      if (data.state === 'Success') {
        if (data.objectResponse) {
          data.objectResponse.forEach((storyS) => {
            const bussinessStory = this.bussiness.filter((b) => b.id === storyS.idbusiness)[0];

            const extensionsImg = ['jpg', 'jpeg', 'png'];
            const isImage = extensionsImg.includes(this.getExtension(storyS.imageurl));

            const objectStory = {
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
              isImage,
            };

            this.stories.push(objectStory);

            if (!this.storiesBusiness.some((x) => x.idbusiness === storyS.idbusiness)) {
              this.storiesBusiness.push({
                idbusiness: storyS.idbusiness,
                businessImage: bussinessStory ? bussinessStory.imageurl : '',
                businessName: bussinessStory ? bussinessStory.description : '',
                stateView: data.objectResponse.filter((x) => x.idbusiness === storyS.idbusiness).some((x) => !x.new),
                pause: true,
              });
            }
          });

          this.storiesBusiness.sort((a, b) => b.stateView - a.stateView);
        }
      }
    });
  }

  private getExtension(nameFile: string) {
    if (nameFile) {
      const splitExt = nameFile.split('.');
      return splitExt[splitExt.length - 1].toLocaleLowerCase();
    }

    return null;
  }

  public openDialogStories(index: number = 0) {
    this.dialog.open(DialogStoriesComponent, {
      data: {
        stories: this.stories,
        storiesBusiness: this.storiesBusiness,
        id: index.toString(),
        showArrows: true,
        userId: this.userId,
        showCarousel: true,
      },
      panelClass: 'dialog-stories',
      hasBackdrop: false,
      width: '100vw',
      maxWidth: '100vw',
      height: '100vh',
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
