import { Component, Input, OnChanges, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';

@Component({
  selector: 'app-slide-testimony',
  templateUrl: './slide-testimony.component.html',
  styleUrls: ['./slide-testimony.component.scss']
})
export class SlideTestimonyComponent implements OnInit {

  @Input() testimony: Array<any>;

  @ViewChild('slickModal', { static: false })
  slickModal: SlickCarouselComponent;
  video: any;

  
  @ViewChild('templateVideo', { static: false })
  templateVideo: TemplateRef<any>;
  @Input() slideConfig: object;

  

  constructor(
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
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

  next() {
    this.slickModal.slickNext();
  }

  prev() {
    this.slickModal.slickPrev();
  }

}