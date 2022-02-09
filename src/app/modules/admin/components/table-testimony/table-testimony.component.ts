import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatTable } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import Swal from 'sweetalert2';
import { FormTestimonyComponent } from '../form-testimony/form-testimony.component';

@Component({
  selector: 'app-table-testimony',
  templateUrl: './table-testimony.component.html',
  styleUrls: ['./table-testimony.component.scss'],
})
export class TableTestimonyComponent implements OnInit, OnDestroy {
  @ViewChild('table', { static: false }) table: MatTable<any>;
  private subscription: Subscription = new Subscription();

  constructor(private user: UserService, private dialog: MatDialog, private utils: UtilsService) {}

  displayedColumns: string[] = ['name', 'photo', 'user', 'testimony', 'rate' , 'video', 'visible', 'actions'];

  dataSource = [];

  ngOnInit() {
    this.getTestimonies();
  }

  public getTestimonies() {
    this.subscription = this.user.getTestimonies(true).subscribe((testimonies) => {
      this.dataSource = testimonies;
    });
  }

  public deleteItem(dataSource) {
    const { id } = dataSource;
    Swal.fire({
      html: "<h3 class='delete-title-comision'>Eliminar testimonio</h3> <p class='w-container'>¿Está seguro que desea eliminar el testimonio seleccionado?</p>",
      confirmButtonText: 'Eliminar testimonio',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      confirmButtonClass: 'updateokdelete order-last',
      cancelButtonClass: 'updatecancel',
      allowOutsideClick: false,
    }).then((resp: any) => {
      if (resp.dismiss !== 'cancel') {
        this.subscription = this.user.deleteTestimonies([id]).subscribe(() => {
          this.getTestimonies();
        });
      }
    });
  }

  editItem(dataSource) {
    const dialog = this.dialog.open(FormTestimonyComponent, {
      width: '450px',
      data: dataSource,
    });

    dialog.beforeClosed().subscribe((board) => {
      this.getTestimonies();
    });
  }

  public openModalTestimony() {
    const dialog = this.dialog.open(FormTestimonyComponent, {
      width: '450px',
    });

    dialog.beforeClosed().subscribe((board) => {
      this.getTestimonies();
    });
  }

  public visible(e: any, dataSource) {
    const { id } = dataSource;
    let data = [{ id, active: e.checked }];

    this.subscription = this.user.saveActiveTestimonies(data).subscribe((activeTestimony: ResponseService) => {
      this.utils.openSnackBar(activeTestimony.userMessage, 'Cerrar');
    });
  }

  public dropTable(event: CdkDragDrop<any[]>) {
    const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
    this.table.renderRows();
    const datosSourceSend = [];
    for (let i = 0; i < this.dataSource.length; i++) {
      this.dataSource[i].orderby = i + 1;
      datosSourceSend.push({
        id: this.dataSource[i].id,
        orderby: i + 1,
      });
    }
    this.saveOrderTestimony(datosSourceSend);
  }

  private saveOrderTestimony(datos: any) {
    this.subscription = this.user.saveOrderTestimonies(datos).subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
