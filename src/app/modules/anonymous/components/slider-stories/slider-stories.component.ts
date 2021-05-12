import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogStoriesComponent } from '../../../shared/components/dialog-stories/dialog-stories.component'
import { ContentService } from 'src/app/services/content.service';
import { Subscription } from "rxjs";
import { ResponseService } from "src/app/interfaces/response";

@Component({
  selector: 'app-slider-stories',
  templateUrl: './slider-stories.component.html',
  styleUrls: ['./slider-stories.component.scss']
})
export class SliderStoriesComponent implements OnInit {
  stories = []

  constructor(
    private dialog: MatDialog,
    private content: ContentService,
  ) { }

  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.subscription = this.content.getStories(false).subscribe((data: ResponseService) => {
      if (data.state === "Success") {
        if (data.objectResponse) {
          data.objectResponse.forEach(story => {
            this.stories.push({
              id: story.id,
              idbusiness: story.idbusiness,
              name: story.description,
              infoAditional: story.infoaditional,
              image: story.imageurl,
              link: story.link,
              state: story.new,
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
        id: index.toString()
      },
      panelClass: 'dialog-stories',
      hasBackdrop: false,
      width: '100vw',
      maxWidth: '100vw',
      height: '100vh'
    });
  }


}
