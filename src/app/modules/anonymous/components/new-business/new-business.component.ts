import { Component, OnInit, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-new-business',
  templateUrl: './new-business.component.html',
  styleUrls: ['./new-business.component.scss']
})
export class NewBusinessComponent implements OnInit {

  @Output() openModal = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  public registerBusiness() {
    this.openModal.emit();
    
  }

}
