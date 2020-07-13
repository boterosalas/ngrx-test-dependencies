import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-banner-medal',
  templateUrl: './banner-medal.component.html',
  styleUrls: ['./banner-medal.component.scss']
})
export class BannerMedalComponent implements OnInit {

  constructor() { }

  @Input() img:string;
  @Input() classLevel:string;;
  @Input() percent:string;;
  @Input() icon:string;;
  @Input() level:string;;
  @Input() title:string;;
  @Input() nextLevel:string;;

  ngOnInit() {
  }

}
