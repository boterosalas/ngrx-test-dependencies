import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import Swal from 'sweetalert2';
import { DialogStoryComponent } from '../dialog-story/dialog-story.component';

@Component({
  selector: 'app-card-admin-story',
  templateUrl: './card-admin-story.component.html',
  styleUrls: ['./card-admin-story.component.scss']
})
export class CardAdminStoryComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  @Input() data:string;

  ngOnInit() {
  }

  public editStory(data){
    console.log(data);
    this.dialog.open(DialogStoryComponent, {
      width: '800px',
      data: data
    });
  }

  deleteStory(id){
    console.log(id);

    Swal.fire({
      html: "<h3 class='delete-title-comision'>Eliminar contenido</h3> <p class='w-container'>¿Estás seguro de eliminar el contenido seleccionado?</p>",
      confirmButtonText: "Eliminar contenido",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonClass: "updateokdelete order-last",
      cancelButtonClass: "updatecancel",
      allowOutsideClick: false
    }).then((resp: any) => {
      if (resp.dismiss !== 'cancel') {
        console.log('accion')
      }
    })
  }


}


