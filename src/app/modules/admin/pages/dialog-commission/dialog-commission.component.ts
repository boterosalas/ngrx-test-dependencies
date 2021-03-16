import {
    Component,
    OnInit,
    ViewChild
} from "@angular/core";
import { MatDialog, MatTable } from "@angular/material";
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
import Swal from 'sweetalert2';
import { Subscription } from "rxjs";
export interface PeriodicElementComision {
    drag: any;
    bussiness: any;
    comision: any;
    button: any;
}
@Component({
    selector: 'app-commission',
    templateUrl: './dialog-commission.component.html',
    styleUrls: ['./dialog-commission.component.scss']
})
export class DialogCommissionComponent implements OnInit {
    dataSource: any;
    disabledButton: boolean = true;
    arrayComision: any;
    id: any;
    title: any;
    displayedColumnsComision: string[] = ['drag', 'bussiness', 'comision', 'button'];
    image: any;
    componentLector: boolean = true;
    @ViewChild('table2', { static: false }) table2: MatTable<PeriodicElementComision>;
    private subscription: Subscription = new Subscription();
    constructor(
        private dialog: MatDialog,
        private content: ContentService,
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
        if (this.componentLector === true) {
            this.updateComision()
        }

    }

    dropTableComision(event: CdkDragDrop<PeriodicElementComision[]>) {
        const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
        moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
        this.table2.renderRows();
        for (let i = 0; i < this.dataSource.length; i++) {
            this.dataSource[i].orderby = i + 1
        }
        this.validation()

    }
    validation() {
        for (let index = 0; index < this.dataSource.length; index++) {
            if (this.dataSource[index].commission != "" && this.dataSource[index].description != "") {
                this.disabledButton = false;
            } else {
                this.disabledButton = true;
            }
        }
    }
    updateComision() {
        this.content.getCommissionsData(this.id).subscribe((resp) => {
            this.arrayComision = resp;
            let datosComision = Object.values(this.arrayComision);
            this.dataSource = datosComision[0];
            for (let index = 0; index < this.dataSource.length; index++) {
                //delete this.dataSource[index].tab;
                this.dataSource[index].orderby = index;
            }

        })
    }
    updateComisionDelete() {
        this.content.getCommissionsData(this.id).subscribe((resp) => {
            this.arrayComision = resp;
            let datosComision = Object.values(this.arrayComision);
            this.dataSource = datosComision[0];
            for (let index = 0; index < this.dataSource.length; index++) {
                //delete this.dataSource[index].tab;
                this.dataSource[index].orderby = index;
            }
            this.validation()
        })
    }
    newComision() {
        if (this.dataSource === undefined) {
            this.dataSource = [];
            this.dataSource.push({ idBusiness: this.id, commission: '', description: '', orderby: 0 })

        } else {
            this.dataSource.push({ idBusiness: this.id, commission: '', description: '', orderby: this.dataSource.length - 1 })
        }
        this.disabledButton = true;
        this.table2.renderRows();
    }
    saveComision() {
        this.content.saveComision(this.dataSource).subscribe((resp) => {
            this.updateComision()
            this.disabledButton = true;
        })
    }
    deleteComision(content: any, index: number) {
        Swal.fire({
            html: "<h3 class='delete-title-comision'>Eliminar comisión</h3> <p class='w-container'>¿Estás seguro de eliminar la comisión seleccionada?</p>",
            confirmButtonText: "Eliminar comisión",
            cancelButtonText: "Cancelar",
            showCancelButton: true,
            confirmButtonClass: "updateokdelete order-last",
            cancelButtonClass: "updatecancel",
            allowOutsideClick: false
        }).then((resp: any) => {
            if (resp.dismiss !== 'cancel') {
                if (content.hasOwnProperty('id')) {
                    this.content.deleteComision(content.id).subscribe((resp) => {
                        this.updateComisionDelete()
                        this.table2.renderRows();
                    })
                } else {
                    this.dataSource.splice(index, 1);
                    this.validation()
                    this.table2.renderRows();
                }
            }
        })

    }
}
