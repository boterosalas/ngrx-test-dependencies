import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-story',
  templateUrl: './dialog-story.component.html',
  styleUrls: ['./dialog-story.component.scss']
})
export class DialogStoryComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) { }

  storieForm: FormGroup;
  image: string;
  nameFile: string = '';
  file: any;
  showErrorImg: boolean = false;
  dataReal = [];
  validFormat: boolean;

  ngOnInit() {
    this.formStory();
  }

  public formStory() {
    this.storieForm = this.fb.group({
      nameContent: [null, Validators.required],
      link: [null, Validators.required],
      commission: [null, Validators.required],
      image: [null, Validators.required],
      date: [null],
      hour: [null],
      eraser: [null]
    });
  }

}
