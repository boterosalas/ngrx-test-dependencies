import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-refer-share',
  templateUrl: './refer-share.component.html',
  styleUrls: ['./refer-share.component.scss']
})
export class ReferShareComponent implements OnInit {

  @Output() urlClicker = new EventEmitter();
  @Output() shareMobile = new EventEmitter();
  @ViewChild("linkInput", { static: false }) copy: ElementRef<any>;
  @Input() urlValue:string;

  url:string;
  urlWhatsapp:string;
  formLink: FormGroup;
  tokenInfo: any;
  idClicker: string;

  constructor(
    private fb: FormBuilder,
    private token: TokenService
  ) { }

  ngOnInit() {
    this.generateUrl();
    this.urlValue = this.formLink.controls.link.value;
  }

  public generateUrl(){
    this.tokenInfo = this.token.userInfo();
    this.idClicker = this.tokenInfo.idclicker;
    let domain = document.location.origin;
    this.urlWhatsapp = encodeURI(`${domain}/#/inicio?code=${this.idClicker.replace(' ', '%20')}`);
    this.url = encodeURI(`${domain}/#/inicio?code=${this.idClicker}`);
    this.formLink = this.fb.group({
      link: [this.url]
    });
  }
  
  public copyUrl() {
    this.urlClicker.emit(this.copy.nativeElement);
  }

  public share() {
    this.shareMobile.emit(this.url);
  }
  
}
