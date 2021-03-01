import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { DialogVideoPlayerComponent } from '../../components/dialog-video-player/dialog-video-player.component';

@Component({
    selector: 'app-content-library',
    templateUrl: './content-library.component.html',
    styleUrls: ['./content-library.component.scss']
})
export class ContentLibraryComponent implements OnInit {
    id: string;
    @ViewChild("templateImage", { static: false }) templateVideo: TemplateRef<
        any
    >;
    @ViewChild("templateVideo", { static: false }) templateVideoP: TemplateRef<
        any
    >;
    title: string;
    active: boolean;
    image: string;
    data: any;
    dataVideo: any;
    private subscription: Subscription = new Subscription();
    constructor(
        private dialog: MatDialog,
        private route: ActivatedRoute,
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
        this.data = [
            { id: 1, ulrImg: "https://d500.epimg.net/cincodias/imagenes/2018/11/13/lifestyle/1542113135_776401_1542116070_noticia_normal.jpg", dataR: false },
            { id: 2, ulrImg: "https://hotbook.com.mx/wp-content/uploads/2019/04/hotbook-se-revela-la-primera-imagen-de-un-agujero-negro-portada.jpg", dataR: false },
            { id: 3, ulrImg: "https://blogs.unsw.edu.au/nowideas/files/2019/06/cambiar-imagen-corporativa.jpg", dataR: false },
            { id: 4, ulrImg: "https://d500.epimg.net/cincodias/imagenes/2018/11/13/lifestyle/1542113135_776401_1542116070_noticia_normal.jpg", dataR: false },
            { id: 5, ulrImg: "https://hotbook.com.mx/wp-content/uploads/2019/04/hotbook-se-revela-la-primera-imagen-de-un-agujero-negro-portada.jpg", dataR: false },
            { id: 6, ulrImg: "https://blogs.unsw.edu.au/nowideas/files/2019/06/cambiar-imagen-corporativa.jpg", dataR: false },
            { id: 7, ulrImg: "https://blogs.unsw.edu.au/nowideas/files/2019/06/cambiar-imagen-corporativa.jpg", dataR: false },
            { id: 8, ulrImg: "https://hotbook.com.mx/wp-content/uploads/2019/04/hotbook-se-revela-la-primera-imagen-de-un-agujero-negro-portada.jpg", dataR: false },
            { id: 9, ulrImg: "https://blogs.unsw.edu.au/nowideas/files/2019/06/cambiar-imagen-corporativa.jpg", dataR: false },
            { id: 10, ulrImg: "https://blogs.unsw.edu.au/nowideas/files/2019/06/cambiar-imagen-corporativa.jpg", dataR: false },

        ]
        this.dataVideo = [
            { id: 1, ulrImg: "http://v2v.cc/~j/theora_testsuite/320x240.ogg", dataR: false },
            { id: 2, ulrImg: "http://v2v.cc/~j/theora_testsuite/320x240.ogg", dataR: false },
            { id: 3, ulrImg: "http://v2v.cc/~j/theora_testsuite/320x240.ogg", dataR: false },
            { id: 4, ulrImg: "http://v2v.cc/~j/theora_testsuite/320x240.ogg", dataR: false },
            { id: 5, ulrImg: "http://v2v.cc/~j/theora_testsuite/320x240.ogg", dataR: false },
            { id: 6, ulrImg: "http://v2v.cc/~j/theora_testsuite/320x240.ogg", dataR: false },
            { id: 7, ulrImg: "http://v2v.cc/~j/theora_testsuite/320x240.ogg", dataR: false },
            { id: 8, ulrImg: "http://v2v.cc/~j/theora_testsuite/320x240.ogg", dataR: false },
            { id: 9, ulrImg: "http://v2v.cc/~j/theora_testsuite/320x240.ogg", dataR: false },


        ]
    }
    public selectAll() {
        this.data.forEach(element => {
            element.dataR = true;
        });
        this.active = true;
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
    public deleteEvery() {

    }
    public loadDelete() {
        let index = []

        this.data.forEach((elem, i) => {
            if (elem.dataR === true) {
                index.push(i);
            }
        });
        if (index.length > 0) {
            this.active = true;
        } else {
            this.active = false;
        }

    }
    public viewerVideo() {
        const title = "";
        const template = this.templateVideoP;
        const id = "video-modal";
        this.dialog.open(DialogVideoPlayerComponent, {
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
