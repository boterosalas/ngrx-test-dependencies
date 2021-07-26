import { Component, HostListener, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
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
  titleSelect = "Seleccionar";
  innerWidth: number;

  constructor(
    private _content: ContentService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router:Router
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
          this.date = this.notifications[0].datepublish;
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
    if (this.innerWidth < 600 || window.innerWidth < 600) {
      this.router.navigate(['/notificacion-mobile', data.idnotification, data.id  ]);
    }
  }

  public formNotifications() {
    this.checkboxGroup = this.fb.group({
      checks: [false],
    });
  }

  onCheckChange(event) {
    if (event.checked) {
      this.formArray.push(event.source.value);
    } else {
      const index = this.formArray.indexOf(event.source.value);
      if (index >= 0) {
        this.formArray.splice(index, 1);
      }
    }
    if(this.formArray.length > 0) {
      this.titleSelect = 'Seleccionar';
    } else {
      this.titleSelect = 'Deseleccionar';
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
        this.checkboxGroup.controls.checks.setValue(false);
        setTimeout(() => {
          if(this.notifications.length){
            this.titleMail = this.notifications[0].title;
            this.date = this.notifications[0].datepublish;
            this.content = this.notifications[0].content;
            this.dataToSend[0].id = this.notifications[0].id;
            this.viewNotification(this.dataToSend);
          } else{
            this.titleMail = "";
            this.date = "";
            this.content = "";
          }
        }, 1000);
      });
  }

  public viewedAll(){
    this.formArray.forEach(element => {
      this.dataToSend[0].id = element;
      this.viewNotification(this.dataToSend);
    });
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
        this.formArray.push(element.id);
      });
    } else{
      this.titleSelect = 'Seleccionar';
      this.checkboxGroup.controls.checks.setValue(false);
      this.formArray = []     
    }

  }

  
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.innerWidth = event.target.innerWidth;
  }


}
