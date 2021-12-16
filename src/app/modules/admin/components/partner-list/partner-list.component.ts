import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';
import { UtilsService } from 'src/app/services/utils.service';
import Swal from 'sweetalert2';
import { FormPartnerComponent } from '../form-partner/form-partner.component';

@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.scss']
})
export class PartnerListComponent implements OnInit, OnDestroy {

  @ViewChild('table', { static: false }) table: MatTable<any>;
  private subscription: Subscription = new Subscription();

  dataSource = [
    {user: 'david', mail: 'davidbet@hotmail.com'}
  ];
  bussiness = [];
  selectedBusiness:string;

  displayedColumns: string[] = ['user', 'email', 'actions'];
  
  constructor(private content: ContentService, private dialog: MatDialog, private utils: UtilsService) { }

  ngOnInit(): void {
    this.getBusiness();
  }


  public getBusiness() {
    this.subscription = this.content.getBusiness().subscribe((bussiness) => {
      console.log(bussiness);
      this.bussiness = bussiness;
    });
  }

  public deleteItem(dataSource) {
    const { id } = dataSource;
    Swal.fire({
      html: "<h3 class='delete-title-comision'>Eliminar partner</h3> <p class='w-container'>¿Está seguro que desea eliminar el partner seleccionado?</p>",
      confirmButtonText: 'Eliminar testimonio',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      confirmButtonClass: 'updateokdelete order-last',
      cancelButtonClass: 'updatecancel',
      allowOutsideClick: false,
    }).then((resp: any) => {
      if (resp.dismiss !== 'cancel') {
        // this.subscription = this.user.deleteTestimonies([id]).subscribe(() => {

        // });
      }
    });
  }

  editItem(dataSource) {
    // const dialog = this.dialog.open(FormTestimonyComponent, {
    //   width: '450px',
    //   data: dataSource,
    // });

    // dialog.beforeClosed().subscribe((board) => {
      
    // });
  }

  public openModal() {
    const dialog = this.dialog.open(FormPartnerComponent, {
      width: '450px',
    });

    // dialog.beforeClosed().subscribe((board) => {
      
    // });
  }

  selected(data) {
    console.log(data);
    this.selectedBusiness = data.description;
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
