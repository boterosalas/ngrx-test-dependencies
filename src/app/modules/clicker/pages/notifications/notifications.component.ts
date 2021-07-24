import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { ResponseService } from "src/app/interfaces/response";
import { ContentService } from "src/app/services/content.service";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.scss"],
})
export class NotificationsComponent implements OnInit {
  notifications = [];

  titleMail: string;
  date: any;
  content: any;
  dateSend = new Date();
  dataToSend = [{ id: [""], viewed: true, dateviewed: this.dateSend }];
  titleSelect = "Seleccionar"

  constructor(
    private _content: ContentService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getNotications();
    this.formNotifications();
  }

  formArray = [];

  checkboxGroup: FormGroup;

  public getNotications() {
    this._content
      .getNotificationAdmin(false)
      .subscribe((notification: ResponseService) => {
        this.notifications = notification.objectResponse.published;
        if(this.notifications.length){
          this.titleMail = this.notifications[0].title;
          this.date = this.notifications[0].date;
          this.content = this.notifications[0].content;
          this.dataToSend[0].id = this.notifications[0].id;
          this.viewNotification(this.dataToSend);
        }
      });
  }

  public getNoticationsLoad() {
    this._content
      .getNotificationAdmin(false)
      .subscribe((notification: ResponseService) => {
        this.notifications = notification.objectResponse.published;
      });
  }

  public showNotification(data: any) {
    this.titleMail = data.title;
    this.date = data.date;
    this.content = data.content;
    this.dataToSend[0].id = data.id;
    this.viewNotification(this.dataToSend);
  }

  public formNotifications() {
    this.checkboxGroup = this.fb.group({
      checks: [false],
    });
  }

  onCheckChange(event) {
    if (event.target.checked) {
      this.formArray.push(event.target.value);
    } else {
      const index = this.formArray.indexOf(event.target.value);

      if (index >= 0) {
        this.formArray.splice(index, 1);
      }
    }
    if(this.formArray.length > 0) {
      this.titleSelect = 'Deseleccionar';
    } else {
      this.titleSelect = 'Seleccionar';
    }
  }

  private viewNotification(data) {
    this._content.viewNotification(data).subscribe(() => {
      this.getNoticationsLoad();
    });
  }

  public deleteNotication() {
    this._content
      .deleteNotificationUser(this.formArray)
      .subscribe((notification) => {
        this.getNoticationsLoad();
        this.openSnackBar(notification.userMessage , "Cerrar");
        this.titleMail = "";
        this.date = "";
        this.content = "";
      });
  }

  public viewedAll(){
    this.dataToSend[0].id = this.formArray;
    this.viewNotification(this.dataToSend);
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  public selectAll() {
    if(this.checkboxGroup.controls.checks.value === false) {
      this.titleSelect = 'Deseleccionar';
      this.checkboxGroup.controls.checks.setValue(true);
      this.notifications.forEach(element => {
        this.formArray.push(element.id.toString());
      });
    } else{
      this.titleSelect = 'Seleccionar';
      this.checkboxGroup.controls.checks.setValue(false);
      this.formArray = []     
    }

  }

}
