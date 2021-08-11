import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-dialog-faq-group',
  templateUrl: './dialog-faq-group.component.html',
  styleUrls: ['./dialog-faq-group.component.scss'],
})
export class DialogFaqGroupComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  faqForm: FormGroup;
  section: any;

  constructor(
    private content: ContentService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loadFaq();
  }

  loadFaq() {
    if (this.data.edit === 1) {
      this.faqForm = this.fb.group({
        description: [this.data.sectiontitle, Validators.required],
      });
    } else {
      this.faqForm = this.fb.group({
        description: [null, Validators.required],
      });
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  saveFaqGroup() {
    if (this.data.edit === 0) {
      this.section = {
        sectiontitle: this.faqForm.controls.description.value,
      };
    } else {
      this.section = {
        id: this.data.id,
        sectiontitle: this.faqForm.controls.description.value,
        orderby: this.data.orderby,
      };
    }

    this.subscription = this.content
      .saveFaqgroups(this.section)
      .subscribe((resp: ResponseService) => {
        if (resp.state === 'Success') {
          this.dialogRef.close();
        }
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
