import { Component, OnInit } from '@angular/core';
import { DataRangeInterface } from 'src/app/interfaces/dateRangeInterface';

@Component({
  selector: 'app-report-partner',
  templateUrl: './report-partner.component.html',
  styleUrls: ['./report-partner.component.scss'],
})
export class ReportPartnerComponent implements OnInit {
  startDate: string;
  endDate: string;
  items = [
    {
      id: 0,
      icon: 'https://webclickamdev.blob.core.windows.net/img-ofertas/dashboard/icon-registros.svg',
      business: null,
      subtitle: 'Registros',
      title: 'Usuarios Registrados',
      number: 0,
      linksClicked: 0,
      linksGenerated: 0,
      total: 0,
      commission: 0,
    },
    {
      id: 0,
      icon: 'https://webclickamdev.blob.core.windows.net/img-ofertas/dashboard/icon-activos.svg',
      business: null,
      subtitle: 'Nuevos',
      title: 'Usuarios Activos Nuevos',
      number: 0,
      linksClicked: 0,
      linksGenerated: 0,
      total: 0,
      commission: 0,
    },
    {
      id: 0,
      icon: 'https://webclickamdev.blob.core.windows.net/img-ofertas/dashboard/icon-usuario-nuevo.svg',
      business: null,
      subtitle: 'Activos',
      title: 'Usuarios Activos',
      number: 0,
      linksClicked: 0,
      linksGenerated: 0,
      total: 0,
      commission: 0,
    },
    {
      id: 0,
      icon: 'https://webclickamdev.blob.core.windows.net/img-ofertas/dashboard/icon-ventas.svg',
      business: null,
      subtitle: 'Ventas',
      title: 'Ventas',
      number: 0,
      linksClicked: 0,
      linksGenerated: 0,
      total: 0,
      commission: 0,
    },
    {
      id: 0,
      icon: 'https://webclickamdev.blob.core.windows.net/img-ofertas/dashboard/icon-comision.svg',
      business: null,
      subtitle: 'Comisiones',
      title: 'Comisiones',
      number: 0,
      linksClicked: 0,
      linksGenerated: 0,
      total: 0,
      commission: 0,
    },
    {
      id: 0,
      icon: 'https://webclickamdev.blob.core.windows.net/img-ofertas/dashboard/icon-rejected-commissions.svg',
      business: null,
      subtitle: 'Comisiones Rechazadas',
      title: 'Comisiones Rechazadas',
      number: 0,
      linksClicked: 0,
      linksGenerated: 0,
      total: 0,
      commission: 0,
    },
    {
      id: 0,
      icon: 'https://webclickamdev.blob.core.windows.net/img-ofertas/dashboard/icon-links-generados.svg',
      business: null,
      subtitle: 'Links Generados',
      title: 'Links Generados',
      number: 0,
      linksClicked: 0,
      linksGenerated: 0,
      total: 0,
      commission: 0,
    },
    {
      id: 0,
      icon: 'https://webclickamdev.blob.core.windows.net/img-ofertas/dashboard/icon-links-clickeados.svg',
      business: null,
      subtitle: 'Links Clickeados',
      title: 'Links Clickeados',
      number: 0,
      linksClicked: 0,
      linksGenerated: 0,
      total: 0,
      commission: 0,
    },
    {
      id: 0,
      icon: 'https://webclickamdev.blob.core.windows.net/img-ofertas/dashboard/icon-eliminar-card.svg',
      business: null,
      subtitle: 'Eliminadas',
      title: 'Cuentas Eliminadas',
      number: 0,
      linksClicked: 0,
      linksGenerated: 0,
      total: 0,
      commission: 0,
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  public getDate(e: DataRangeInterface) {
    this.startDate = e.startDate;
    this.endDate = e.endDate;
  }

  public exportOrderNotFinish() {
    const params = {
      startDate: this.startDate,
      endDate: this.endDate,
    };

    // this.user.getreportordersnotinvoiced(params).subscribe((orders: ResponseService) => {
    //   this.openSnackBar(orders.userMessage, 'Cerrar');
    // })
  }
}
