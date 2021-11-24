import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  @ViewChild('templateVideo', { static: false })
  templateVideo: TemplateRef<any>;
  video: any;

  constructor(
    private utils:UtilsService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
  }

  begin(){
    this.utils.showloginForm();
  }

  works() {
    const id = 'video-modal';
    const template = this.templateVideo;
    const title = '';
    this.video = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + 'AeFNbNgcOdM?rel=0&amp;autoplay=1');

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
