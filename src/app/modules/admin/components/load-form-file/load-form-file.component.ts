import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-load-form-file',
  templateUrl: './load-form-file.component.html',
  styleUrls: ['./load-form-file.component.scss']
})
export class LoadFormFileComponent implements OnInit {

  fileUrl: string;
  @Input() fileForm: FormGroup;
  @Input() nameFile: string;
  // @Input() nameFileAssured: string;
  @Input() label: string;  
  @Output() uploadFile = new EventEmitter;

  constructor() {}
  
  ngOnInit() {
  }

  public onFileChange(event) {
    this.uploadFile.emit(event);
  }




}
