import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Subscription } from "rxjs";
import { ResponseService } from "src/app/interfaces/response";
import { ContentService } from "src/app/services/content.service";

@Component({
  selector: "app-dialog-navigation-item",
  templateUrl: "./dialog-navigation-item.component.html",
  styleUrls: ["./dialog-navigation-item.component.scss"],
})
export class DialogNavigationItemComponent implements OnInit {
  private subscription: Subscription = new Subscription();

  dateForm: FormGroup;

  constructor(
    private content: ContentService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loadItem();
  }

  loadItem() {
    if (this.data.edit === 1) {
      this.dateForm = this.fb.group({
        id: [this.data.id, Validators.required],
        idseccion: [this.data.idseccion, Validators.required],
        link: [this.data.link, Validators.required],
        description: [this.data.description, Validators.required],
        icon: [this.data.icon],
      });
    } else {
      this.dateForm = this.fb.group({
        idseccion: [this.data.idseccion, Validators.required],
        link: [null, Validators.required],
        description: [null, Validators.required],
        icon: [null],
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveItem() {
    let item;
    if (this.data.edit === 0) {
      item = {
        idseccion: this.data.idseccion,
        link: this.dateForm.controls.link.value,
        description: this.dateForm.controls.description.value,
      };
    } else {
      item = {
        id: this.data.id,
        idseccion: this.data.idseccion,
        link: this.dateForm.controls.link.value,
        description: this.dateForm.controls.description.value,
        orderby: this.data.orderby,

      };
    }
    this.content.saveFooterLink(item).subscribe((resp: ResponseService) => {
      if (resp.state === "Success") {
        this.dialogRef.close();
      }
    });
  }
}
