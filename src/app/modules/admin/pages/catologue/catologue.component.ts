import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CatologueFormComponent } from '../../components/catologue-form/catologue-form.component';

@Component({
  selector: 'app-catologue',
  templateUrl: './catologue.component.html',
  styleUrls: ['./catologue.component.scss'],
})
export class CatologueComponent implements OnInit {
  constructor( private dialog:MatDialog) {}

  dataCatalogueActive = [
    {
      active: true,
      date: '2022-01-24T20:47:35.893',
      dateend: '2022-01-24T20:47:35.893',
      datestart: '2022-01-24T20:47:35.893',
      description: 'Catalogo aniversario Éxito',
      id: 116,
      imageurlweb: 'https://webclickamqa.blob.core.windows.net/img-ofertas/pic-offers-web/20220124204735_web.jpg',
      links: 8,
    },
  ];

  ngOnInit(): void {}

  public editCatalogueModal(item:object) {
    console.log(item);
  }

  public deleteOfer(element, type) {
    console.log(element, type)
  }

  
  public activate(element) {
    const datos = [{ id: element.id, active: element.active }];
    console.log(datos)
  }

  public addCatalogue() {
    const dialog = this.dialog.open(CatologueFormComponent, {
      width: '550px',
    });

    // dialog.beforeClosed().subscribe(() => {
    //   this.getPartner();
    // });
  }

}
