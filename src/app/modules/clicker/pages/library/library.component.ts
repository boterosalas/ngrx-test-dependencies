import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { MatDialog } from '@angular/material';
import { saveAs } from 'file-saver-ios-bugfix';
import { DialogImagePlayerComponent } from '../../components/dialog-visualization-image/dialog-image-player.component';
@Component({
    selector: 'app-library',
    templateUrl: './library.component.html',
    styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
    private subscription: Subscription = new Subscription();
    step: number = 0;
    step_mobile: any;
    visible_step_mobile: boolean = false;
    dataReal = [];
    imagenDispo: boolean = true;
    ext: string;
    contentType: string;
    videosDispo: boolean = true;
    dataRealVideo = [];
    url: string;
    active: boolean = true;
    idDownload: string;
    selectAllVideosImg: string = "Seleccionar todos";
    bussiness: Array<any> = [];
    deleteVideoImg = [];
    iosDevices: boolean = false;
    @ViewChild("templateImage", { static: false }) templateVideo: TemplateRef<
        any
    >;
    constructor(
        private dialog: MatDialog,
        private content: ContentService,
    ) { }

    ngOnInit() {
        let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        if (iOS) {
            this.iosDevices = true
        } else {
            this.iosDevices = false
        }
        this.getBussiness();
    }
    setStep(index: number, item: any) {
        this.step = index;
        this.dataReal = []
        this.dataRealVideo = []
        this.dataSource(item);
    }
    public dataSource(item: any) {
        this.content.getVideosImage(item.id).subscribe((resp: any) => {

            if (resp.state === "Success") {
                resp.objectResponse.forEach(element => {
                    if (element.filename.includes("mp4")) {
                        element.dataR = false;
                        this.dataRealVideo.push(element)
                    } else {
                        element.dataR = false;
                        this.dataReal.push(element)
                    }
                });
            }
            if (this.dataReal.length > 0) {
                this.imagenDispo = true
            } else {
                this.imagenDispo = false
            }
            if (this.dataRealVideo.length > 0) {
                this.videosDispo = true
            } else {
                this.videosDispo = false
            }

        })
    }
    public selectAll() {
        if (this.selectAllVideosImg === "Seleccionar todos") {
            for (let i = 0; i < this.dataReal.length; i++) {
                this.dataReal[i].dataR = true;
            }
            for (let j = 0; j < this.dataRealVideo.length; j++) {
                this.dataRealVideo[j].dataR = true;
            }
            if (this.dataReal.length > 0 || this.dataRealVideo.length > 0) {
                this.active = false;
                this.selectAllVideosImg = "Deseleccionar todos";
            }
        } else {
            for (let i = 0; i < this.dataReal.length; i++) {
                this.dataReal[i].dataR = false;
            }
            for (let j = 0; j < this.dataRealVideo.length; j++) {
                this.dataRealVideo[j].dataR = false;
            }
            if (this.dataReal.length > 0 || this.dataRealVideo.length > 0) {
                this.active = true;
                this.selectAllVideosImg = "Seleccionar todos";
            }
        }
    }
    public getBussiness() {
        this.subscription = this.content
            .getBusiness()
            .pipe(distinctUntilChanged())
            .subscribe((bussiness) => {
                this.bussiness = bussiness;
            });
        this.dataSource({ id: 1 })
    }
    public setStepMovil(index: any, item: any) {
        this.step_mobile = index;
        this.visible_step_mobile = true;
        this.dataReal = []
        this.dataRealVideo = []
        this.dataSource(item);
    }
    public viewerPhoto(element: any) {
        const title = "";
        const template = '';
        const id = "video-modal";
        this.url = element.url;
        let urlVideo = element.url;
        this.idDownload = element.id;
        let datosDownload = element.id;
        this.dialog.open(DialogImagePlayerComponent, {
            panelClass: "image-clickacademy",
            maxWidth: "600px",
            data: {
                id,
                title,
                template,
                urlVideo,
                datosDownload
            },
            backdropClass: 'backdropBackground'
        });
    }
    public returnAcordeon() {
        this.visible_step_mobile = false;
        this.step_mobile = "";
    }
    public loadDelete() {
        let index = []
        for (let i = 0; i < this.dataReal.length; i++) {
            if (this.dataReal[i].dataR === true) {
                index.push(i);
            }
        }
        for (let j = 0; j < this.dataRealVideo.length; j++) {
            if (this.dataRealVideo[j].dataR === true) {
                index.push(j);
            }
        }
        if (index.length > 0) {
            this.active = false;
        } else {
            this.active = true;
        }

    }
    public downloadFiles() {
        this.deleteVideoImg = []
        let variableImg = false;
        let variableVideo = false;
        for (let i = 0; i < this.dataReal.length; i++) {
            if (this.dataReal[i].dataR === true) {
                this.deleteVideoImg.push(this.dataReal[i].id)
                variableImg = true;
            }
        }
        for (let i = 0; i < this.dataRealVideo.length; i++) {
            if (this.dataRealVideo[i].dataR === true) {
                this.deleteVideoImg.push(this.dataRealVideo[i].id);
                variableVideo = true;
            }
        }
        if (this.deleteVideoImg.length > 1) {
            this.content.downloadF(this.deleteVideoImg).subscribe((resp) => {
                //console.log(resp)
                this.download(resp, "application/zip")
            })
        } else {
            if (variableImg === true) {
                this.content.downloadF(this.deleteVideoImg).subscribe((resp) => {
                    this.download(resp, "image/jpg")
                });
            }
            if (variableVideo === true) {
                this.content.downloadF(this.deleteVideoImg).subscribe((resp) => {
                    this.download(resp, "video/mp4")
                });
            }
        }
    }

    public download(data, type) {
        let blob = new Blob([data], { type: type });
        let url = window.URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        if (type.includes("zip")) {
            downloadLink.href = url;
            downloadLink.download = "archivo.zip";
            downloadLink.click();
        } else if (type.includes("jpg")) {
            downloadLink.href = url;
            downloadLink.download = "archivo.jpg";
            downloadLink.click();
        } else if (type.includes("mp4")) {
            downloadLink.href = url;
            downloadLink.download = "archivo.mp4";
            downloadLink.click();
        }

    }

    public downloadFile() {
        let datos = [this.idDownload]
        this.content.downloadF(datos).subscribe((resp) => {
            this.download(resp, "image/jpg")
        });
    }
    public downloadVideo(element: any) {
        let datos = [element.id]
        this.content.downloadF(datos).subscribe((resp) => {
            this.download(resp, "video/mp4")
        });
    }
}
