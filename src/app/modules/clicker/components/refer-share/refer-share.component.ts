import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { ContentService } from 'src/app/services/content.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-refer-share',
  templateUrl: './refer-share.component.html',
  styleUrls: ['./refer-share.component.scss'],
})
export class ReferShareComponent implements OnInit {
  @Output() urlClicker = new EventEmitter();
  @Output() shareMobile = new EventEmitter();
  @ViewChild('linkInput', { static: false }) copy: ElementRef<any>;
  @Input() urlValue: string;

  url: string;
  urlWhatsapp: string;
  formLink: UntypedFormGroup;
  tokenInfo: any;
  idClicker: string;

  constructor(private fb: UntypedFormBuilder, private token: TokenService, private content: ContentService) {}

  ngOnInit() {
    this.generateUrl();
    this.urlValue = this.formLink.controls.link.value;
  }

  public generateUrl() {
    this.tokenInfo = this.token.userInfo();
    this.idClicker = this.tokenInfo.idclicker;
    const domain = document.location.origin;
    this.urlWhatsapp = encodeURI(`${domain}/inicio?code=${this.idClicker.replace(' ', '%20')}`);
    this.url = encodeURI(`${domain}/inicio?code=${this.idClicker}`);
    this.formLink = this.fb.group({
      link: [this.url],
    });
  }

  public copyUrl() {
    this.generateLink();
    this.urlClicker.emit(this.copy.nativeElement);
  }

  public share() {
    this.generateLink();
    this.shareMobile.emit(this.url);
  }
  public generateLink() {
    const formData: FormData = new FormData();
    formData.append('idClicker', this.idClicker);
    formData.append('type', 'Generate');
    this.content.setClick(formData).subscribe();
  }
}
