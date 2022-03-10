import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { ContentService } from 'src/app/services/content.service';
import { UtilsService } from 'src/app/services/utils.service';
import Swal from 'sweetalert2';
import { CatologueFormComponent } from '../../components/catologue-form/catologue-form.component';

@Component({
  selector: 'app-catologue',
  templateUrl: './catologue.component.html',
  styleUrls: ['./catologue.component.scss'],
})
export class CatologueComponent implements OnInit, OnDestroy {
  constructor( private dialog:MatDialog, private content: ContentService, private utils: UtilsService) {}
  private subscription: Subscription = new Subscription();
  
  dataCatalogueActive = [];
  dataCatalogueInactive = [];

  ngOnInit(): void {
    this.getCatalog();
  }

  public editCatalogueModal(item:object) {
    const dialog = this.dialog.open(CatologueFormComponent, {
      data: item,
      width: '550px',
    });

    dialog.beforeClosed().subscribe(() => {
      this.getCatalog();
    });
  }

  public deleteCatalogue(element) {
    Swal.fire({
      html: `<h3 class='delete-title-comision'>Eliminar catálogo</h3> <p class='w-container'>¿Está seguro que desea eliminar el catálogo seleccionado?</p>`,
      confirmButtonText: 'Eliminar catálogo',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      confirmButtonClass: 'updateokdelete order-last',
      cancelButtonClass: 'updatecancel',
      allowOutsideClick: false,
    }).then((resp: any) => {
      if (resp.dismiss !== 'cancel') {
        this.subscription = this.content.deleteCatalog(element).subscribe(() => {
          this.getCatalog();
        });
      }
    });
  }

  
  public activate(element) {
    const datos = { id: element.id, active: element.active };
    this.subscription = this.content.saveActiveCatalog(datos).subscribe((active: ResponseService) => {
      this.utils.openSnackBar(active.userMessage, 'Cerrar');
      this.getCatalog();
    });
  }

  public addCatalogue() {
    const dialog = this.dialog.open(CatologueFormComponent, {
      width: '550px',
    });

    dialog.beforeClosed().subscribe(() => {
      this.getCatalog();
    });
  }

  public getCatalog(){
    this.subscription = this.content.getCatalog(true).subscribe((catalogs: ResponseService) => {
      this.dataCatalogueActive = catalogs.objectResponse.published;
      this.dataCatalogueInactive = catalogs.objectResponse.defeated;
    })
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
