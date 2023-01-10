import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-video-home-card',
  templateUrl: './video-home-card.component.html',
  styleUrls: ['./video-home-card.component.scss'],
})
export class VideoHomeCardComponent implements OnInit, OnDestroy {
  videoHome$: Subscription = new Subscription();
  breakpoint$: Subscription = new Subscription();
  currentImage: string = '';
  videoHome: any = {};

  constructor(
    private content: ContentService,
    private breakPointService: BreakpointService,
  ) { }

  ngOnInit() {
    this.getVideoHome();
  }

  getVideoHome() {
    this.videoHome$ = this.content.getOffersbyType({ id: 'VIDEOHOME', admin: false }).subscribe(res => {
      this.videoHome = res[0] || {};
      console.log({ videoHome: res });
      this.breakpoint();
    });
  }

  breakpoint() {
    this.breakpoint$ = this.breakPointService
      .isWidthLessThanBreakpoint('840')
      .subscribe((res: boolean) => {
        if (this.videoHome) {
          this.currentImage = res ? this.videoHome.imageurlmobile : this.videoHome.imageurlweb;
        }
      });
  }

  ngOnDestroy(): void {
    this.videoHome$.unsubscribe();
    this.breakpoint$.unsubscribe();
  }
}
