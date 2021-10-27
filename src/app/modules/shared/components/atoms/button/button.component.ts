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
  @Input() classIcon:string;
  @Input() disabled:boolean;
  @Output() action = new EventEmitter();
  @Input() haveIcon = true;
  @Input() color = 'orange';

  constructor() { }

  ngOnInit(): void {
  }

  public actionButtton(){
    this.action.emit();
  }

}
