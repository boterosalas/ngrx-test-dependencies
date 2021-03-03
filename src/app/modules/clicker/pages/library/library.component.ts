import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { MatDialog, MatSnackBar } from '@angular/material';
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
    bussiness: Array<any> = [];
    deleteVideoImg = [];
    @ViewChild("templateImage", { static: false }) templateVideo: TemplateRef<
        any
    >;
    constructor(
        private dialog: MatDialog,
        private content: ContentService,
        private _snackBar: MatSnackBar,

    ) { }

    ngOnInit() {
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
        for (let i = 0; i < this.dataReal.length; i++) {
            this.dataReal[i].dataR = true;
        }
        for (let j = 0; j < this.dataRealVideo.length; j++) {
            this.dataRealVideo[j].dataR = true;
        }


        if (this.dataReal.length > 0 || this.dataRealVideo.length > 0) {
            this.active = false;
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
        const template = this.templateVideo;
        const id = "video-modal";
        this.url = element.url;
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
        for (let i = 0; i < this.dataReal.length; i++) {
            if (this.dataReal[i].dataR === true) {
                this.deleteVideoImg.push(this.dataReal[i].id)
            }
        }
        for (let i = 0; i < this.dataRealVideo.length; i++) {
            if (this.dataRealVideo[i].dataR === true) {
                this.deleteVideoImg.push(this.dataRealVideo[i].id)
            }
        }
        this.content.downloadF(this.deleteVideoImg).subscribe((resp) => {
            //console.log(resp)
            this.download(resp)
        })

    }
    private download(data) {
        let blob = new Blob([data], { type: "application/zip" });
        let url = window.URL.createObjectURL(blob);
        //let pwa = window.open(url);
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "archivo.zip";
        downloadLink.click();
        //if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        //    alert('Please disable your Pop-up blocker and try again.');
        //}
    }
    private openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 5000
        });
    }
}
