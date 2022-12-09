import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-codigo-confirmacion',
  templateUrl: './codigo-confirmacion.component.html',
  styleUrls: ['./codigo-confirmacion.component.scss']
})
export class CodigoConfirmacionComponent implements OnInit {


  codeControl: FormControl = new FormControl(null, [Validators.required]);
  codeForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.codeForm = this.fb.group({
      code: this.codeControl
    });
  }

  ngOnInit(): void {
  }

  sendCode(){
    console.log('sending code', this.codeControl.value)
  }

}
