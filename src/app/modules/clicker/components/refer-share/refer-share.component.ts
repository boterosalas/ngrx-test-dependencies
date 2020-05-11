import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-refer-share',
  templateUrl: './refer-share.component.html',
  styleUrls: ['./refer-share.component.scss']
})
export class ReferShareComponent implements OnInit {

  @Output() urlClicker = new EventEmitter();
  @ViewChild("linkInput", { static: false }) copy: ElementRef<any>;

  
  formLink: FormGroup;
  url:string;
  tokenInfo: any;
  idClicker: string;

  constructor(
    private fb: FormBuilder,
    private token: TokenService
  ) { }

  ngOnInit() {
    this.generateUrl();
  }



  public generateUrl(){
    this.tokenInfo = this.token.userInfo();
    this.idClicker = this.tokenInfo.idclicker;
    let domain = document.location.origin;
    this.url = `${domain}/#/inicio?code=${this.idClicker}`;
    this.formLink = this.fb.group({
      link: [this.url]
    });
  }
  
  public copyUrl() {
    this.urlClicker.emit(this.copy.nativeElement);
  }
  
}
