import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatTable } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';
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

  constructor(private content: ContentService, private dialog: MatDialog) {}

  displayedColumns: string[] = ['name', 'user', 'testimony', 'video', 'visible', 'actions'];

  dataSource = [
    {
      id:'1',
      orderby: 0,
      name: 'Olga Lucía',
      user: '@olga.lucia',
      testimony:
        'Los testimonios pueden ser un recurso poderoso para poder establecer un vínculo de confianza entre tus clientes nuevos. Es parte de lo que se conoce como la demostración social (social proof) y en el marketing es un medio poderoso para persuadir a tus visitantes de realizar cierta acción.',
      video: 'https://www.youtube.com/watch?v=rRXxrFqIwic',
      visible: true,
    },
    {
      id:'2',
      orderby: 1,
      name: 'pepito perez',
      user: '@perez.pepito',
      testimony:
        'Los testimonios pueden ser un recurso poderoso para poder establecer un vínculo de confianza entre tus clientes nuevos. Es parte de lo que se conoce como la demostración social (social proof) y en el marketing es un medio poderoso para persuadir a tus visitantes de realizar cierta acción.',
      video: 'https://www.youtube.com/watch?v=rRXxrFqIwic',
      visible: false,
    },
  ];

  ngOnInit() {}

  deleteItem(dataSource) {
    const {id} = dataSource;
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
        // this.subscription = this.content.deleteBoardings([id]).subscribe(() => {
        //   this.getBoardings();
        // });
      }
    });
  }

  editItem(dataSource) {
    const dialog = this.dialog.open(FormTestimonyComponent, {
      width: '450px',
      data: dataSource
    });

    // dialog.beforeClosed().subscribe(board => {
    //   this.getBoardings();
    // });
  }

  public openModalTestimony() {
    const dialog = this.dialog.open(FormTestimonyComponent, {
      width: '450px',
    });

    // dialog.beforeClosed().subscribe(board => {
    //   this.getBoardings();
    // });
  }



  public visible(e: MatSlideToggle, dataSource){
    const {id} = dataSource;
    console.log(e.checked, id);
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
    console.log(datos);
    // this.subscription = this.content.saveOrderTestimony(datos).subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
