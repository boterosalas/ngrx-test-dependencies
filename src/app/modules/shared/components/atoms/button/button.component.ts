import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() title:string;
  @Input() id:string;
  @Input() classButton:string;
  @Input() gtm = '';
  @Input() classIcon:string;
  @Input() disabled:boolean;
  @Output() action = new EventEmitter();
  @Input() haveIcon = true;
  @Input() haveTitle = true;
  @Input() color = 'orange';
  @Input() direction = 'row';
  @Input() align = 'space-between center';

  constructor() { }

  ngOnInit(): void {
  }

  public actionButtton(){
    this.action.emit();
  }

}
