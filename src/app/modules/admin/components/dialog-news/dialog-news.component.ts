import {
    Component,
    OnInit,
    Inject,
    ViewChild,
    TemplateRef
} from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
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
    image: string;
    selecteds = [{
        titulo: "Pendiente"
    },
    {
        titulo: "En revisión"
    },
    {
        titulo: "Solucionado"
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
        if (this.data.documenturl === "") {
            this.image = ""
        } else {
            let datos = this.data.element.documenturl.split("/");
            this.image = datos[datos.length - 1]
        }
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
    public viewerImage() {
        if (this.data.element.urlImage === "") {
            console.log("No hay imagenes")
        } else {
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
    public saveChanges() {
        let datos = {
            id: this.data.element.id,
            status: this.dateForm.controls.status.value
        }
        this.user.setStatus(datos).subscribe((resp: any) => {
            console.log("Estado cambiado")
            if (resp.state === "Success") {
                this.dialogRef.close();
            }

        })
    }
}
