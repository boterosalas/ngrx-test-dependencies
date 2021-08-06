import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from 'rxjs';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { ContentService } from 'src/app/services/content.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { DialogVideoPlayerComponent } from '../../components/dialog-video-player/dialog-video-player.component';
import { ResponseService } from "src/app/interfaces/response";
import { DialogStoriesComponent } from '../../../shared/components/dialog-stories/dialog-stories.component'

@Component({
    selector: 'app-stories-admin',
    templateUrl: './stories-admin.component.html',
    styleUrls: ['./stories-admin.component.scss']
})
export class StoriesAdminComponent implements OnInit {
    id: string;
    @ViewChild("templateDeleteContent", { static: false }) templateDelete: TemplateRef<
        any
    >;
    @ViewChild('inputFile', { static: false }) myInputVariable: ElementRef;
    @ViewChild("templateAddStory", { static: false }) templateAddStory: TemplateRef<any>;
    dataAddStory: FormGroup;
    title: string;
    active: boolean;
    image: string;
    nameFile: string = '';
    file: any;
    showErrorImg: boolean = false;
    dataReal = [];
    validFormat: boolean;
    extension: string;
    deleteStory = [];
    selectAllStories: string = "Seleccionar todos";
    private subscription: Subscription = new Subscription();

    stories = []
    bussiness: any

    constructor(
        private dialog: MatDialog,
        private content: ContentService,
        private route: ActivatedRoute,
        private _snackBar: MatSnackBar,
        private fb: FormBuilder,
        private user: UserService
    ) {
        this.subscription = this.route.params.subscribe((route) => {
            if (
                route.id === undefined &&
                route.titulo === undefined &&
                route.imagen === undefined

            ) {
                this.id = "1";
                this.title = "exito";
                this.image =
                    "https://webclickamdev.blob.core.windows.net/img-ofertas/pic-business/ico-exito.svg";
            } else {
                this.id = route.id;
                this.title = route.titulo;
                this.image = route.imagen;
            }
        });
    }

    ngOnInit() {
        this.dataAddStory = this.fb.group({
            nameContent: [null, Validators.required],
            link: [null, Validators.required],
            commission: [null, Validators.required],
            image: [null, Validators.required]
          });
        this.getBusiness();
    }
    public getBusiness() {
        this.subscription = this.content.getBusiness().subscribe((bussiness) => {
            this.bussiness = bussiness;
            this.getStories();
        });
    }
    public getStories() {
        this.subscription = this.content.getStories(true).subscribe((resp: ResponseService) => {
            if (resp.state === "Success") {
                if (resp.objectResponse) {
                    this.stories = []
                    this.dataReal = []
                    resp.objectResponse.forEach(story => {
                        if (story.idbusiness === Number.parseInt(this.id)) {
                            let bussiness = this.bussiness.filter(b => b.id === story.idbusiness)[0]

                            const extensionsImg = ["jpeg", "jpg", "png"]
                            let isImage = (extensionsImg.includes(this.getExtensionFileName(story.imageurl)))

                            this.stories.push({
                                id: story.id,
                                idbusiness: story.idbusiness,
                                name: story.description,
                                businessName: bussiness ? bussiness.description : "",
                                infoAditional: story.infoaditional,
                                image: story.imageurl,
                                isImage,
                                businessImage: bussiness ? bussiness.imageurl : '',
                                businessCode: bussiness ? bussiness.code : '',
                                link: story.link,
                                date: new Date(story.date),
                                stateView: !story.new,
                                pause: true
                            })
    
                            this.dataReal.push({
                                id: story.id,
                                dataR: false
                            })
                        }
                    });
                }
            } else {
                this.openSnackBar(resp.userMessage, "Cerrar");
            }
        });
    }
    public openDialogStories(index: number = 0) {
        this.dialog.open(DialogStoriesComponent, {
            data: {
                stories: this.stories,
                id: index.toString(),
                showArrows: false,
                showCarousel: true
            },
            panelClass: 'dialog-stories',
            hasBackdrop: false,
            width: '100vw',
            maxWidth: '100vw',
            height: '100vh'
        });
    }
    private getExtensionFileName(nameFileS: string) {
        if (nameFileS) {
          let splitExtS = nameFileS.split(".");
          return splitExtS[splitExtS.length - 1].toLocaleLowerCase();
        }
    
        return null
    }
    public selectAll() {
        if (this.selectAllStories === "Seleccionar todos") {
            for (let i = 0; i < this.dataReal.length; i++) {
                this.dataReal[i].dataR = true;
            }
            if (this.dataReal.length > 0) {
                this.active = true;
                this.selectAllStories = "Deseleccionar todos";
            }
        } else {
            for (let i = 0; i < this.dataReal.length; i++) {
                this.dataReal[i].dataR = false;
            }
            if (this.dataReal.length > 0) {
                this.active = false;
                this.selectAllStories = "Seleccionar todos";
            }
        }
    }
    public deleteEvery() {
        let id = '';
        let title = '';
        let template = this.templateDelete;
        this.dialog.open(ModalGenericComponent, {
            maxWidth: "600px",
            data: {
                id,
                title,
                template,
            },
        });
    }
    public addOrRemoveDeleted(check, index) {
        this.dataReal[index].dataR = check
        this.active = this.dataReal.some(data => data.dataR === true)
    }

    public getExtensionFile(nameFile: string, getSize: number) {
        let splitExt = nameFile.split(".");
        let getExt = splitExt[splitExt.length - 1].toLocaleLowerCase();
        this.validFormat = false;
        if (getExt === "jpg" || getExt === "jpeg" || getExt === "mp4") {
            this.validFormat = true;
            this.extension = getExt
        }
        if (getSize / 1000 > 7000 && (getExt === "jpg" || getExt === "jpeg")) {
            this.validFormat = false;
            Swal.fire({
                text: "No pudimos cargar el contenido, ten en cuenta que cada imagen no puede superar el tamaño de 7mb.",
                type: "error",
                confirmButtonText: "Aceptar",
                confirmButtonClass: 'accept-login-alert-error'
            });
        } else if (getSize / 1000 > 75000 && (getExt === "mp4")) {
            this.validFormat = false;
            Swal.fire({
                text: "No pudimos cargar el contenido, ten en cuenta que cada video no puede superar el tamaño de 72mb.",
                type: "error",
                confirmButtonText: "Aceptar",
                confirmButtonClass: 'accept-login-alert-error'
            });
        }
    }
    private openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 5000
        });
    }

    public onFileChangeFiles(event) {
        const files = event.target.files
        let nameFileStory = files[0].name;
        let readerStory = new FileReader();
        let sizeFile = files[0].size;
        if (files && files.length) {
            const [fileStory] = files;
            let fileBlob = new Blob([fileStory]);
            let file = new File([fileBlob], nameFileStory);
            readerStory.readAsDataURL(file);
            readerStory.onload = () => {
                this.getExtensionFile(nameFileStory, sizeFile);
                if (this.validFormat) {
                    this.file = readerStory.result;
                    this.file = this.file.split(",")[1]
                    this.nameFile = nameFileStory;
                    this.showErrorImg = false
                } else {
                    console.log("Error en la carga")
                    this.showErrorImg = true
                }
            };
        }
    }

    public createStory() {
        const title = "Nueva historia";
        const idBussiness = 1;
        const edit = 0;
        const template = this.templateAddStory;

        this.dialog.open(ModalGenericComponent, {
            width: "450px",
            data: {
                title,
                idBussiness,
                template,
                edit
            },
        });
    }

    public saveStory() {
        let datos = [{
            idBusiness: this.id,
            infoAditional: this.dataAddStory.controls.commission.value,
            description: this.dataAddStory.controls.nameContent.value,
            link: this.dataAddStory.controls.link.value,
            active: 1,
            image: this.file,
            imageURL: this.nameFile,
            extension: this.extension
        }]
        this.content.saveStories(datos).subscribe((resp: ResponseService) => {
            if (resp.state === "Success") {
                this.openSnackBar(resp.userMessage, "Cerrar");
                this.getStories()
                this.onNoClickAddStory()
            } else {
                this.openSnackBar(resp.userMessage, "Cerrar");
            }
        })
    }

    public deleteStories() {
        this.deleteStory = []
        for (let i = 0; i < this.dataReal.length; i++) {
            if (this.dataReal[i].dataR === true) {
                this.deleteStory.push(this.dataReal[i].id)
            }
        }
        this.content.deleteStories(this.deleteStory).subscribe((resp: ResponseService) => {
            if (resp.state === "Success") {
                this.getStories();
                this.active = false;
                this.dialog.closeAll();
                this.selectAllStories = "Seleccionar todos";
            } else {
                this.openSnackBar(resp.userMessage, "Cerrar");
            }
        })
    }
    public cancelDelete() {
        this.dialog.closeAll();
    }

    onNoClickAddStory(): void {
        this.dataAddStory.reset()
        this.showErrorImg = false
        this.dialog.closeAll()
    }
}
