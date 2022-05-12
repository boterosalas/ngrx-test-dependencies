import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';
import { ResponseService } from 'src/app/interfaces/response';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
})
export class BusinessComponent implements OnInit, OnDestroy {
  constructor(private content: ContentService, private _snackBar: MatSnackBar, private utils: UtilsService) {}

  private subscription: Subscription = new Subscription();
  email: string;
  dataSource: any;
  fileb64: any;

  ngOnInit() {
    this.getAllBusiness();
    this.checkRole();
  }
  checkRole() {
    this.utils.checkPermision();
  }
  /**
   * Abre el mensaje de confirmacion
   * @param message mensaje
   * @param action accion
   */

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  public exportBusiness() {
    this.subscription = this.content.businessExcel().subscribe((resp: ResponseService) => {
      if (resp.state === 'Success') {
        this.openSnackBar(resp.userMessage, 'Cerrar');
      }
    });
  }

  public activateBusiness(business) {
    const businessActivate = {
      idbusiness: business.id,
      value: business.active,
    };

    this.subscription = this.content.saveActiveBusiness(businessActivate).subscribe((resp) => {
      this.openSnackBar(resp.userMessage, 'Cerrar');
    });
  }

  public getAllBusiness() {
    this.subscription = this.content.getAllBusiness().subscribe((resp) => {
      this.dataSource = resp;
    });
  }

  public onFileChange(event: any) {
    const nameFile = event.target.files[0].name;
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      const fileBlob = new Blob([file]);
      const file2 = new File([fileBlob], nameFile);
      reader.readAsDataURL(file2);
      reader.onload = () => {
        this.fileb64 = reader.result;
        const explit64 = this.fileb64.split('data:application/octet-stream;base64,');
        this.fileb64 = explit64[1];
        this.content.importSellerFile(this.fileb64).subscribe((document) => {
          event.target.value = null;
          if (document.state === 'Success') {
            this.openSnackBar('Los negocios fueron importados correctamente', 'Aceptar');
          } else {
            this.openSnackBar(document.userMessage, 'Cerrar');
          }
        });
      };
    }
  }

  public uploadFileExcel(e) {
    const extension = 'xlsx';
    const size = 10000;
    this.utils.onFileChangeFiles(e, extension, size, 'file');

    this.utils.fileB64.subscribe((val: any) => {
      const file = val;
      this.content.importSeller(file).subscribe((documentSeller) => {
        e.target.value = null;
        if (documentSeller.state === 'Success') {
          this.openSnackBar('Los negocios fueron importados correctamente', 'Aceptar');
        } else {
          this.openSnackBar(documentSeller.userMessage, 'Cerrar');
        }
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
