import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-manage-comision-bussiness',
  templateUrl: './manage-comision-bussiness.component.html',
  styleUrls: ['./manage-comision-bussiness.component.scss']
})
export class ManageComisionBussinessComponent implements OnInit {
  id: string;
  title: string;
  dataSource = [{
    codigo: 2,
    nombreCat: "Tecnología",
    commisionClic: "4.3%",
    commisionBuss: "4.3%",
    commisionTotal: "4.3%"
  }, {
    codigo: 3,
    nombreCat: "Tecnología",
    commisionClic: "4.3%",
    commisionBuss: "4.3%",
    commisionTotal: "4.3%"
  }, {
    codigo: 4,
    nombreCat: "Tecnología",
    commisionClic: "4.3%",
    commisionBuss: "4.3%",
    commisionTotal: "4.3%"
  }]
  displayedColumns: string[] = ['code', 'nombreCat', 'comisionClik', 'comisionBus', 'comisionTotal', 'actions'];
  image: string;
  private subscription: Subscription = new Subscription();
  constructor(
    private content: ContentService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
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
  }

}
