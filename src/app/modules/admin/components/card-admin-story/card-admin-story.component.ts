import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-admin-story',
  templateUrl: './card-admin-story.component.html',
  styleUrls: ['./card-admin-story.component.scss']
})
export class CardAdminStoryComponent implements OnInit {

  constructor() { }

  @Input() data:string;

  ngOnInit() {
  }

  public editStory(data){
    console.log(data);
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
