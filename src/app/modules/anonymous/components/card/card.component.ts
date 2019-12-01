import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger("simpleFadeAnimation", [
      // the "in" style determines the "resting" state of the element when it is visible.
      state("in", style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(":enter", [style({ opacity: 0 }), animate(600)]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(":leave", animate(600, style({ opacity: 0 })))
    ])
  ]
})
export class CardComponent implements OnInit {

  constructor() { }

  @Output() actionButton = new EventEmitter();

  @Input() idTitle: string;
  @Input() title: string;
  @Input() description: string;
  @Input() idAction: string;
  @Input() action: string;
  @Input() Class: string;
  @Input() template: TemplateRef<any>;
  

  ngOnInit() {
  }

  public showRegister() {
    this.actionButton.emit();
  }

}
