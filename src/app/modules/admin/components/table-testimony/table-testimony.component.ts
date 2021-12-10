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

  displayedColumns: string[] = ['name', 'user', 'testimony', 'video', 'visible', 'actions'];

  dataSource = [
    {
      id:'1',
      orderby: 0,
      username: 'Olga Lucía',
      usersocialnetwork: '@olga.lucia',
      testimony:
        'Los testimonios pueden ser un recurso poderoso para poder establecer un vínculo de confianza entre tus clientes nuevos. Es parte de lo que se conoce como la demostración social (social proof) y en el marketing es un medio poderoso para persuadir a tus visitantes de realizar cierta acción.',
      link: 'https://www.youtube.com/watch?v=rRXxrFqIwic',
      active: true,
    },
    {
      id:'2',
      orderby: 1,
      username: 'pepito perez',
      usersocialnetwork: '@perez.pepito',
      testimony:
        'Los testimonios pueden ser un recurso poderoso para poder establecer un vínculo de confianza entre tus clientes nuevos. Es parte de lo que se conoce como la demostración social (social proof) y en el marketing es un medio poderoso para persuadir a tus visitantes de realizar cierta acción.',
      link: 'https://www.youtube.com/watch?v=rRXxrFqIwic',
      active: false,
    },
  ];

  ngOnInit() {
    this.getTestimonies();
  }

  public getTestimonies() {
    this.subscription = this.user.getTestimonies().subscribe(testimonies => {
      this.dataSource = testimonies;
    });
  }

  public deleteItem(dataSource) {
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
        this.subscription = this.user.deleteTestimonies([id]).subscribe(() => {
          this.getTestimonies();
        });
      }
    });
  }

  editItem(dataSource) {
    const dialog = this.dialog.open(FormTestimonyComponent, {
      width: '450px',
      data: dataSource
    });

    dialog.beforeClosed().subscribe(board => {
      this.getTestimonies();
    });
  }

  public openModalTestimony() {
    const dialog = this.dialog.open(FormTestimonyComponent, {
      width: '450px',
    });

    dialog.beforeClosed().subscribe(board => {
      this.getTestimonies();
    });
  }



  public visible(e: any, dataSource){
    const {id} = dataSource;
    let data = {
      id,
      active: e.checked
    }
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
