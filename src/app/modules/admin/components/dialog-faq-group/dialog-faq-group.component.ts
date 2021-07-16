import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Subscription } from "rxjs";
import { ResponseService } from "src/app/interfaces/response";
import { AuthService } from "src/app/services/auth.service";
import { ContentService } from "src/app/services/content.service";
import { ListIcons } from "src/app/services/icons";

@Component({
  selector: "app-dialog-faq-group",
  templateUrl: "./dialog-faq-group.component.html",
  styleUrls: ["./dialog-faq-group.component.scss"],
})
export class DialogFaqGroupComponent implements OnInit {
  private subscription: Subscription = new Subscription();

  faqForm: FormGroup;
  section: any;

  constructor(
    private content: ContentService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public auth: AuthService
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

    this.content
      .saveFaqgroups(this.section)
      .subscribe((resp: ResponseService) => {
        if (resp.state === "Success") {
          this.dialogRef.close();
        }
      });
  }
}
