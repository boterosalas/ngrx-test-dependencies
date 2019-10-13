import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  constructor() { }

  @Output() open = new EventEmitter;

  @Input() title: string;
  @Input() img: string;
  @Input() description: string;
  @Input() textbutton: string;
  @Input() sectionLeft: boolean;
  @Input() sectionRight: boolean;
  @Input() alt: string;
  @Input() textDirection: string;
  
  public openRegister() {
    this.open.emit();
  }

  ngOnInit() {
  }

}
