import {
  Component,
  OnInit,
  Inject,
  Output,
  EventEmitter,
  OnDestroy,
  ViewChild,
  TemplateRef
} from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Subscription } from "rxjs";
import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/services/auth.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ModalGenericComponent } from "src/app/modules/shared/components/modal-generic/modal-generic.component";

@Component({
  selector: 'app-dialog-news',
  templateUrl: './dialog-news.component.html',
  styleUrls: ['./dialog-news.component.scss']
})
export class DialogNewsComponent implements OnInit {
  dateForm: FormGroup;
  @ViewChild("templateImage", { static: false }) templateVideo: TemplateRef<
    any
  >;
  selecteds = [{
    titulo: "Pendiente"
  }, {
    titulo: "Solucionado"
  },
  {
    titulo: "En revisión"
  }
  ]
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private user: UserService,
    private auth: AuthService
  ) {
  }

  ngOnInit() {
    this.dateForm = this.fb.group({
      status: [null],
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public viewerImage() {
    const title = "";
    const template = this.templateVideo;
    const id = "video-modal";
    this.dialog.open(ModalGenericComponent, {
      panelClass: "image-clickacademy",
      maxWidth: "600px",
      data: {
        id,
        title,
        template,
      },
      backdropClass: 'backdropBackground'
    });
  }
}
