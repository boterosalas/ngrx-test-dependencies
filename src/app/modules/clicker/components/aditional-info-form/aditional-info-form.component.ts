import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-aditional-info-form',
  templateUrl: './aditional-info-form.component.html',
  styleUrls: ['./aditional-info-form.component.scss']
})
export class AditionalInfoFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) { }

  personalForm: FormGroup;

  ngOnInit() {
  }

  public personalFormInfo() {
    this.personalForm = this.fb.group({
      
    })
  }

}
