import { Component, OnInit, Inject, ViewEncapsulation, ViewChild, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import decode from 'jwt-decode';
import { ContentService } from 'src/app/services/content.service';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopupComponent implements OnInit, OnDestroy {
  @ViewChild('slickModal', { static: false })
  slickModal: SlickCarouselComponent;
  isMobile: boolean = true;
  breakpointSubscription: Subscription = new Subscription();
  currentId = 0;
  token = localStorage.getItem('ACCESS_TOKEN');
  tokenDecode = decode(this.token);
  userId = this.tokenDecode.userid;
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    autoplay: false,
    infinite: true,
    arrows: false,
    swipeToSlide: true,
    variableWidth: false,
  };
  showArrowButtons: boolean = false;

  constructor(
    private content: ContentService,
    public dialogRef: MatDialogRef<any>,
    private breakPointService: BreakpointService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log('DATA', data)
    if(data.length > 1) {
      this.showArrowButtons = true;
      this.slideConfig.dots = true;
    }
    // this.data = data.map(element => {
    //   element.imageurlweb = 'https://webclickamqa.blob.core.windows.net/img-ofertas/pic-offers-web/20220616103851_web.jpg';
    //   element.imageurlmobile = 'https://i.pinimg.com/originals/fb/a7/e9/fba7e90aae11ba301fe88f9da2a35875.jpg';
    //   return element;
    // })
  }

  ngOnInit() {
    this.dialogRef.beforeClosed()
      .subscribe(() => {
        this.saveVisitOffer();
        console.log('CERRANDING', this.currentId);
      });
    this.breakpoint();
  }

  breakpoint() {
    this.breakpointSubscription = this.breakPointService
      .isWidthLessThanBreakpoint('700')
      .subscribe((res: boolean) => {
        this.isMobile = res;
      });
  }

  slick({ slick }, saveVisit = false) {
    const currentSlide = slick.currentSlide;
    this.currentId = parseInt(slick.$slides[currentSlide].getAttribute('data-key'));
    saveVisit && this.saveVisitOffer();
  }

  afterChange({ slick }) {
    const currentSlide = slick.currentSlide;
    this.currentId = parseInt(slick.$slides[currentSlide].getAttribute('data-key'));
  }

  saveVisitOffer() {
    const currentElement = this.data.find(element => element.id.toString() === this.currentId.toString());
    if (!currentElement.new) {
      this.content.saveVisitOffer({ idoffer: this.currentId, userId: parseInt(this.userId) }).subscribe();
      this.data = this.data.map(element => {
        if (element.id.toString() === this.currentId.toString()) element.new = true;
        return element;
      })
    }
  }

  closeMatDialog(): void {
    this.dialogRef.close();
  }

  next() {
    this.slickModal.slickNext();
  }

  prev() {
    this.slickModal.slickPrev();
  }

  ngOnDestroy(): void {
    this.breakpointSubscription && this.breakpointSubscription.unsubscribe();
  }
}
