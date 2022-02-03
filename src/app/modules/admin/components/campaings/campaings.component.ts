import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DataRangeInterface } from 'src/app/interfaces/dateRangeInterface';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { FormCampaignComponent } from '../form-campaign/form-campaign.component';

@Component({
  selector: 'app-campaings',
  templateUrl: './campaings.component.html',
  styleUrls: ['./campaings.component.scss'],
})
export class CampaingsComponent implements OnInit, OnDestroy {
  startDate: string;
  endDate: string;

  size: number;
  p: number;
  totalItems: number;

  pageIndex = 0;
  pageSize = 50;
  pageTo = 50;
  paginate: string;
  from: any;
  to: any;

  orderBy: string;
  ordination: string;

  private subscription: Subscription = new Subscription();

  displayedColumns: string[] = ['createdate', 'pubdate', 'campaign', 'link', 'clics', 'userscampaign','usersactive','actions'];

  dataSource = [];
  export = false;


  constructor(private dialog:MatDialog, private user:UserService, private utils: UtilsService) {}

  ngOnInit(): void {
    this.getCampaigns();
    
  }

  public getDate(e: DataRangeInterface) {
    this.export = false;
    this.startDate = e.startDate;
    this.endDate = e.endDate;
    this.getCampaigns(this.from, this.to, this.orderBy, this.ordination, this.startDate, this.endDate, this.export);
    
      const clearButton = document.querySelector('button[title="Limpiar"]');

      clearButton.addEventListener('click', () => {
        this.getCampaigns();
      });
  

  }

  public exportCampaign() {
    this.export = true;
    this.getCampaigns(this.from, this.to, this.orderBy, this.ordination, this.startDate, this.endDate, this.export);
    this.utils.openSnackBar('Se enviará un correo al finalizar la carga', 'Cerrar')
  }

  public addCampaign() {
    this.export = false;
    const dialog = this.dialog.open(FormCampaignComponent, {
      width: '450px',
    });

    dialog.beforeClosed().subscribe(() => {
      this.getCampaigns(this.from, this.to, this.orderBy, this.ordination, this.startDate, this.endDate, this.export);
    });
  }

  public edit(item: any) {
    this.export = false;
    const data = {
      edit: true,
      item
    }
    const dialog = this.dialog.open(FormCampaignComponent, {
      data,
      width: '450px',
    });
    dialog.beforeClosed().subscribe(() => {
      this.getCampaigns(this.from, this.to, this.orderBy, this.ordination, this.startDate, this.endDate, this.export);
    });
  }

  public pagination(paginate: any) {
    this.export = false;
    this.pageIndex = paginate;
    this.from = this.pageSize * this.pageIndex + 1 - 50;
    this.to = this.pageSize * (this.pageIndex + 1) - 50;
    this.getCampaigns(this.from, this.to, this.orderBy, this.ordination, this.startDate, this.endDate, this.export);
  }

  public sortData(event) {
    this.export = false;
    let name = event.active.toUpperCase();
    const direction = event.direction.toUpperCase();
    if (direction === '') {
      name = '';
    }
    this.orderBy = name;
    this.ordination = direction;
    this.getCampaigns(this.from, this.to, this.orderBy, this.ordination, this.startDate, this.endDate, this.export);
  }

  public getCampaigns(from = 1, to = this.pageTo, orderBy = '' , orderOrigin = '', startDate = '', endDate = '', exports = this.export) {
    const params = { from, to, orderOrigin , orderBy, startDate, endDate, exports};
    this.subscription = this.user.getCampaigns(params).subscribe((resp) => {
      this.size = resp.total;
      this.dataSource = resp.campaigns;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
