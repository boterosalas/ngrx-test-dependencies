import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ResponseService } from 'src/app/interfaces/response';
import decode from 'jwt-decode';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss'],
})
export class ConfigurationsComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    public auth: AuthService,
    private user: UserService,
    private _snackBar: MatSnackBar
  ) {}
  displayedColumns: string[] = ['name', 'superadmin'];
  emailPattern = '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}';
  selecteds: any;
  superAdmin = false;
  servicios = [];
  permisionColumns: any;
  disableBoton = true;
  userId: string;
  deleteId: number;
  role: string;
  adminFormDelete: FormGroup;
  dataAddAdmin: FormGroup;

  @ViewChild('templateDeleteAdmin', { static: false })
  templateDeleteAdmin: TemplateRef<any>;

  @ViewChild('templateAddAdmin', { static: false })
  templateAddAdmin: TemplateRef<any>;

  ngOnInit() {
    const validatorsPassword = [Validators.required, Validators.minLength(6), Validators.maxLength(20)];

    this.adminFormDelete = this.fb.group({
      Password: ['', validatorsPassword],
    });

    this.dataAddAdmin = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(this.emailPattern), Validators.maxLength(64)]],
      password: ['', validatorsPassword],
    });

    const token = localStorage.getItem('ACCESS_TOKEN');
    const tokenDecode = decode(token);
    this.userId = tokenDecode.userid;
    this.role = tokenDecode.role;

    this.getPermisionByUserService();
    this.getPermisionService();
  }

  public getPermisionByUserService() {
    this.auth.getPermisionByUser('ADMIN').subscribe((resp) => {
      this.permisionColumns = resp;
      resp.forEach((element) => {
        this.displayedColumns.push(element.menu);
      });
    });
  }

  public getPermisionService() {
    this.user.getPermision().subscribe((resp) => {
      if (resp.state === 'Success') {
        this.servicios = resp.objectResponse;
      } else {
        this.openSnackBar(resp.userMessage, 'Cerrar');
      }
    });
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  saveeraser() {
    this.user.savePermision(this.servicios).subscribe((resp) => {
      this.openSnackBar(resp.userMessage, 'Cerrar');
    });
  }
  cambio() {
    this.disableBoton = false;
  }
  changePermission(event, index, idmenu) {
    this.servicios[index].permissions.find((permission) => permission.menuid === idmenu).value = event.checked;
    this.cambio();
  }
  public getPermissionValue(element, idmenu) {
    return element.issuperadmin || element.permissions.find((permission) => permission.menuid === idmenu).value;
  }

  public openConfirmPassword(userId) {
    this.deleteId = userId;
    const title = '';
    const template = this.templateDeleteAdmin;

    this.adminFormDelete.reset();

    this.dialog.open(ModalGenericComponent, {
      data: {
        title,
        template,
      },
    });
  }

  public deleteAdminService() {
    const data = {
      password: btoa(this.adminFormDelete.controls.Password.value),
      userId: this.deleteId,
    };
    this.user.deleteUserAdmin(data).subscribe(
      (resp: ResponseService) => {
        if (resp.state === 'Success') {
          this.getPermisionService();
          this.cancel();
        }
        this.openSnackBar(resp.userMessage, 'Cerrar');
      },
      (err) => {
        this.openSnackBar(err.userMessage, 'Cerrar');
      }
    );
  }

  public addNewAdmin() {
    const title = 'Agregar administrador';
    const template = this.templateAddAdmin;

    this.dataAddAdmin.reset();
    this.dialog.open(ModalGenericComponent, {
      width: '450px',
      data: {
        title,
        template,
      },
    });
  }

  public addAdminService() {
    const splitName = this.dataAddAdmin.controls.name.value.split(' ');
    let firstNames = '';
    let lastNames = '';

    if (splitName.length <= 1) {
      firstNames = this.dataAddAdmin.controls.name.value;
    } else if (splitName.length === 2) {
      firstNames = splitName[0];
      lastNames = splitName[1];
    } else if (splitName.length === 3) {
      firstNames = splitName[0];
      lastNames = `${splitName[1]} ${splitName[2]}`;
    } else {
      firstNames = `${splitName[0]} ${splitName[1]}`;
      lastNames = `${splitName[2]} ${splitName[3]}`;
    }

    const data = {
      password: btoa(this.dataAddAdmin.controls.password.value),
      email: this.dataAddAdmin.controls.email.value,
      firstNames,
      lastNames,
    };
    this.user.addUserAdmin(data).subscribe(
      (addUser: ResponseService) => {
        if (addUser.state === 'Success') {
          this.getPermisionService();
          this.cancel();
        }
        this.openSnackBar(addUser.userMessage, 'Cerrar');
      },
      (err) => {
        this.openSnackBar(err.userMessage, 'Cerrar');
      }
    );
  }

  cancel() {
    this.dialog.closeAll();
  }
}
