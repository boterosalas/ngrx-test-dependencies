import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-text',
  templateUrl: './image-text.component.html',
  styleUrls: ['./image-text.component.scss']
})
export class ImageTextComponent implements OnInit {

  @Input() directionMobile:string;
  @Input() directionWeb:string;
  @Input() imageClass:string;
  @Input() src:string;
  @Input() alt:string;
  @Input() title:string;
  @Input() text:string;
  @Input() classTitleMobile:string;
  @Input() classTitleWeb:string;
  @Input() classTextWeb:string;
  @Input() classTextMobile:string;
  @Input() generalWeb:string;
  @Input() generalMobile:string;

  constructor() { }

  ngOnInit(): void {
  }

}
