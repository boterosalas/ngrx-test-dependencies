import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-testimony',
  templateUrl: './form-testimony.component.html',
  styleUrls: ['./form-testimony.component.scss']
})
export class FormTestimonyComponent implements OnInit {
  testimonyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit(): void {
    this.formTestimony();
  }

  public formTestimony() {
    this.testimonyForm = this.fb.group({
      name: [this.data ? this.data.name : '', Validators.required],
      user: [this.data ? this.data.user : ''],
      testimony: [this.data ? this.data.testimony : '', [Validators.maxLength(300)]],
      video: [this.data ? this.data.video: ''],
      visible: [this.data ? this.data.visible : false]
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public saveTestimony() {
    console.log(this.testimonyForm.value);
    this.onNoClick();
  }

}
