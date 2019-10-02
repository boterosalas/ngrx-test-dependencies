import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sectionbg',
  templateUrl: './sectionbg.component.html',
  styleUrls: ['./sectionbg.component.scss']
})
export class SectionbgComponent implements OnInit {

  constructor() { }

  @Input() title: string;
  @Input() img: string;
  @Input() description: string;
  @Input() textbutton: string;
  @Input() alt: string;
  @Input() textDirection: string;
  

  ngOnInit() {
  }

}
