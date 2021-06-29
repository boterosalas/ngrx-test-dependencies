import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Subscription } from "rxjs";
import { ResponseService } from "src/app/interfaces/response";
import { AuthService } from "src/app/services/auth.service";
import { ContentService } from "src/app/services/content.service";

@Component({
  selector: "app-dialog-navigation-item",
  templateUrl: "./dialog-navigation-item.component.html",
  styleUrls: ["./dialog-navigation-item.component.scss"],
})
export class DialogNavigationItemComponent implements OnInit {
  private subscription: Subscription = new Subscription();

  dateForm: FormGroup;
  iconSelected: string;

  iconList = [
    { name: "tio-link" },
    { name: "tio-home" },
    { name: "tio-info" },
    { name: "tio-education" },
    { name: "tio-play_circle" },
    { name: "tio-pin" },
    { name: "tio-edit" },
    { name: "tio-help" },
    { name: "tio-calendar_month" },
    { name: "tio-dollar" },
    { name: "tio-verified" },
    { name: "tio-notice" },
    { name: "tio-share_vs" },
    { name: "tio-account_circle" },
    { name: "tio-bookmark" },
    { name: "tio-chart_bar_3" },
    { name: "tio-heart" },
    { name: "tio-shopping_basket" },
    { name: "tio-award" },
    { name: "tio-star" },
    { name: "tio-menu_vs" },
    { name: "tio-notifications" },
    { name: "tio-settings" },
    { name: "tio-send" },
    { name: "tio-document_text" },
    { name: "tio-image" },
    { name: "tio-document_text" },
    { name: "tio-image" },
    { name: "tio-carousel_horizontal" },
    { name: "tio-diamond" },
  ];

  constructor(
    private content: ContentService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.loadItem();
  }

  loadItem() {
    this.iconSelected = this.data.icon

    if (this.data.edit === 1) {
      this.dateForm = this.fb.group({
        id: [this.data.id],
        idseccion: [this.data.idseccion || this.data.idgrupo],
        link: [this.data.link || this.data.route],
        description: [this.data.description || this.data.name],
        icon: [this.data.icon],        
      });
    } else {
      this.dateForm = this.fb.group({
        idseccion: [this.data.idseccion || this.data.idgrupo],
        link: [null],
        description: [null],
        icon: [null],
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveItem() { 
    
    let item;
    if (this.data.isMenu) {
      if (this.data.edit === 0) {
        item = {
          id: 0,
          route: this.dateForm.controls.link.value,
          name: this.dateForm.controls.description.value,
          icon: this.iconSelected,
          idgrupo: null,
          active: true
        };
      } else {
        item = {
          id: this.data.id,
          route: this.dateForm.controls.link.value,
          name: this.dateForm.controls.description.value,
          icon: this.iconSelected,
          idgrupo: this.data.idgrupo,
          orderby: this.data.orderby,
        };
      }

      item.rol = this.data.rol;

      this.auth.saveMenu(item).subscribe((resp: ResponseService) => {
        if (resp.state === "Success") {
          this.dialogRef.close();
        }
      });
    } else {
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
}
