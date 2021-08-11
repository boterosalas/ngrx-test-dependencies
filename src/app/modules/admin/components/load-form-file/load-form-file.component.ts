import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-load-form-file',
  templateUrl: './load-form-file.component.html',
  styleUrls: ['./load-form-file.component.scss'],
})
export class LoadFormFileComponent implements OnInit {
  fileUrl: string;
  @Input() fileForm: FormGroup;
  @Input() nameFile: string;
  @Input() label: string;
  @Output() uploadFile = new EventEmitter();
  @ViewChild('form', { static: false }) form;

  constructor() {}

  ngOnInit() {}

  reset() {
    this.form.nativeElement.reset();
  }

  public onFileChange(event) {
    this.uploadFile.emit(event);
  }
}
