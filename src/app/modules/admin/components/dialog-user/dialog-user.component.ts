import { Component, OnInit, Inject, Output, EventEmitter } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-dialog-user",
  templateUrl: "./dialog-user.component.html",
  styleUrls: ["./dialog-user.component.scss"]
})
export class DialogUserComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  @Output() state = new EventEmitter();
  @Output() comunications = new EventEmitter();
  @Output() verified = new EventEmitter();

  changeStatus() {
    this.state.emit(event);
  }

  changeComunications() {
    this.comunications.emit(event);
  }

  changeVerified() {
    this.verified.emit(event);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}
}
