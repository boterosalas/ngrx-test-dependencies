import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-sectionbg',
  templateUrl: './sectionbg.component.html',
  styleUrls: ['./sectionbg.component.scss']
})
export class SectionbgComponent implements OnInit {

  constructor() { }

  @Output() open = new EventEmitter;

  @Input() title: string;
  @Input() img: string;
  @Input() description: string;
  @Input() textbutton: string;
  @Input() alt: string;
  @Input() textDirection: string;
  

  ngOnInit() {
  }

   /**emite una accion que es abrir el formulario de registro */

  public openRegister() {
    this.open.emit();
  }

}
