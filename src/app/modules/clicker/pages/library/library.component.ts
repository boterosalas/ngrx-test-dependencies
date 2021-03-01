import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { MatDialog } from '@angular/material';
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
    data: any;
    bussiness: Array<any> = [];
    @ViewChild("templateImage", { static: false }) templateVideo: TemplateRef<
        any
    >;
    constructor(
        private dialog: MatDialog,
        private content: ContentService
    ) { }

    ngOnInit() {
        this.data = [
            { id: 1, ulrImg: "https://d500.epimg.net/cincodias/imagenes/2018/11/13/lifestyle/1542113135_776401_1542116070_noticia_normal.jpg", dataR: false },
            { id: 2, ulrImg: "https://hotbook.com.mx/wp-content/uploads/2019/04/hotbook-se-revela-la-primera-imagen-de-un-agujero-negro-portada.jpg", dataR: false },
            { id: 3, ulrImg: "https://blogs.unsw.edu.au/nowideas/files/2019/06/cambiar-imagen-corporativa.jpg", dataR: false },
            { id: 4, ulrImg: "https://d500.epimg.net/cincodias/imagenes/2018/11/13/lifestyle/1542113135_776401_1542116070_noticia_normal.jpg", dataR: true },
            { id: 5, ulrImg: "https://hotbook.com.mx/wp-content/uploads/2019/04/hotbook-se-revela-la-primera-imagen-de-un-agujero-negro-portada.jpg", dataR: false },
            { id: 6, ulrImg: "https://blogs.unsw.edu.au/nowideas/files/2019/06/cambiar-imagen-corporativa.jpg", dataR: false },
            { id: 7, ulrImg: "https://blogs.unsw.edu.au/nowideas/files/2019/06/cambiar-imagen-corporativa.jpg", dataR: false },
            { id: 8, ulrImg: "https://hotbook.com.mx/wp-content/uploads/2019/04/hotbook-se-revela-la-primera-imagen-de-un-agujero-negro-portada.jpg", dataR: false },
            { id: 9, ulrImg: "https://blogs.unsw.edu.au/nowideas/files/2019/06/cambiar-imagen-corporativa.jpg", dataR: false },
            { id: 10, ulrImg: "https://blogs.unsw.edu.au/nowideas/files/2019/06/cambiar-imagen-corporativa.jpg", dataR: false },
        ]
        this.getBussiness();
    }
    setStep(index: number) {
        this.step = index;
    }
    public getBussiness() {
        this.subscription = this.content
            .getBusiness()
            .pipe(distinctUntilChanged())
            .subscribe((bussiness) => {
                this.bussiness = bussiness;
            });
    }
    public setStepMovil(index: any) {
        this.step_mobile = index;
        this.visible_step_mobile = true;
    }
    public viewerPhoto() {
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
    public returnAcordeon() {
        this.visible_step_mobile = false;
        this.step_mobile = "";
    }
}
