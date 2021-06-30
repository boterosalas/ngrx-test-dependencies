import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Subscription } from "rxjs";
import { ResponseService } from "src/app/interfaces/response";
import { AuthService } from "src/app/services/auth.service";
import { ContentService } from "src/app/services/content.service";

@Component({
  selector: "app-dialog-navigation-group",
  templateUrl: "./dialog-navigation-group.component.html",
  styleUrls: ["./dialog-navigation-group.component.scss"],
})
export class DialogNavigationGroupComponent implements OnInit {
  private subscription: Subscription = new Subscription();

  dateForm: FormGroup;

  constructor(
    private content: ContentService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.loadSection();
  }

  loadSection() {
    if (this.data.edit === 1) {
      this.dateForm = this.fb.group({
        description: [this.data.description, Validators.required],
      });
    } else {
      this.dateForm = this.fb.group({
        description: [null, Validators.required],
      });
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  saveSection() {

    let section;
    if (this.data.isMenu) {
      if (this.data.edit === 0) {
        section = {
          description: this.dateForm.controls.description.value,
        };
      } else {
        section = {
          id: this.data.id,
          description: this.dateForm.controls.description.value,
          orderby: this.data.orderby,
        };
      }
      this.auth
        .saveMenuGroup(section)
        .subscribe((resp: ResponseService) => {
          if (resp.state === "Success") {
            this.dialogRef.close();
          }
        });
    } else {
      if (this.data.edit === 0) {
        section = {
          description: this.dateForm.controls.description.value,
        };
      } else {
        section = {
          id: this.data.id,
          description: this.dateForm.controls.description.value,
          orderby: this.data.orderby,
        };
      }
      this.content
        .saveFooterSection(section)
        .subscribe((resp: ResponseService) => {
          if (resp.state === "Success") {
            this.dialogRef.close();
          }
        });
    }
  }
}
