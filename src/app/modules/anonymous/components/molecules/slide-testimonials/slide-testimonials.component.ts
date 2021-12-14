import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';

@Component({
  selector: 'app-slide-testimonials',
  templateUrl: './slide-testimonials.component.html',
  styleUrls: ['./slide-testimonials.component.scss']
})
export class SlideTestimonialsComponent implements OnInit {

  @ViewChild('slickModal', { static: false })
  slickModal: SlickCarouselComponent;
  video: any;

  
  @ViewChild('templateVideo', { static: false })
  templateVideo: TemplateRef<any>;
  

  @Input() slideConfig: object;
  @Input() slider: Array<any>;
  

  constructor(
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
  }

  next() {
    this.slickModal.slickNext();
  }

  prev() {
    this.slickModal.slickPrev();
  }

  openVideo(link:string) {
    const id = 'video-modal';
    const template = this.templateVideo;
    const title = '';
    this.video = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + link);
    this.dialog.open(ModalGenericComponent, {
      panelClass: 'video-clickacademy',
      data: {
        id,
        title,
        template,
      },
    });
  }

}
