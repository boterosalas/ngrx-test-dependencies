import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { ContentService } from 'src/app/services/content.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import Swal from 'sweetalert2';
import { FormPartnerComponent } from '../form-partner/form-partner.component';

@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.scss'],
})
export class PartnerListComponent implements OnInit, OnDestroy {
  @ViewChild('table', { static: false }) table: MatTable<any>;
  private subscription: Subscription = new Subscription();

  dataSource = [];
  bussiness = [];
  selectedBusiness: string;
  idBusiness: number;
  activateButton = true;

  displayedColumns: string[] = ['user', 'email', 'actions'];

  constructor(
    private content: ContentService, 
    private dialog: MatDialog, 
    private utils: UtilsService, 
    private user: UserService) {}

  ngOnInit(): void {
    this.getBusiness();
  }

  public getBusiness() {
    this.subscription = this.content.getBusiness().subscribe((bussiness) => {
      this.bussiness = bussiness;
    });
  }

  public deleteItem(dataSource) {
    const { userid } = dataSource;
    const data = {
      userId: userid,
      withoutpassword: true
    }
    Swal.fire({
      html: "<h3 class='delete-title-comision'>Eliminar partner</h3> <p class='w-container'>¿Está seguro que desea eliminar el partner seleccionado?</p>",
      confirmButtonText: 'Eliminar partner',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      confirmButtonClass: 'updateokdelete order-last',
      cancelButtonClass: 'updatecancel',
      allowOutsideClick: false,
    }).then((resp: any) => {
      if (resp.dismiss !== 'cancel') {
        this.subscription = this.user.deleteUserAdmin(data).subscribe((del:ResponseService) => {
          this.utils.openSnackBar(del.userMessage, 'cerrar');
          this.getPartner();
        });
      }
    });
  }

  public openModal() {
    const dialog = this.dialog.open(FormPartnerComponent, {
      data: this.idBusiness,
      width: '450px',
    });

    dialog.beforeClosed().subscribe(() => {
      this.getPartner();
    });
  }

  selected(data) {
    this.idBusiness = data.id;
    this.activateButton = false;
    this.selectedBusiness = data.description;
    this.getPartner();
  }

  private getPartner() {
    this.user.getPermisionPartner(this.idBusiness).subscribe((users:ResponseService)=> {
      this.dataSource = users.objectResponse;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
