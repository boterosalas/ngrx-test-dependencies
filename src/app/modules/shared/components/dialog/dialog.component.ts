import { Component, OnInit, Output, EventEmitter, Input, TemplateRef } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  // @Output() infoProduct = new EventEmitter();

  @Input() id: string;
  @Input() title: string;
  @Input() template: TemplateRef<any>;
  @Input() showClose: boolean;
  @Input() showOk: boolean;
  @Input() buttonClose: string;
  @Input() buttonOk: string;
  

  constructor( public dialogRef: MatDialogRef<any>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
