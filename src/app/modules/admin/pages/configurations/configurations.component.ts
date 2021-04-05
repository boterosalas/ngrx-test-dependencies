import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import decode from "jwt-decode";
import { MatSnackBar } from '@angular/material';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss']
})
export class ConfigurationsComponent implements OnInit {
  dateForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public auth: AuthService
  ) { }
  displayedColumns: string[] = ['modulo', 'activations'];
  selecteds: any;
  superAdmin: boolean = false;
  servicios: any;
  visible: boolean = false;
  activarPermision: boolean = true;
  disableBoton: boolean = true;
  ngOnInit() {
    this.dateForm = this.fb.group({
      users: [null],
    });
    const token = localStorage.getItem("ACCESS_TOKEN");
    const tokenPayload = decode(token);
    if (tokenPayload.role === 'SUPERADMIN') {
      this.activarPermision = false;
    }
    this.auth.getUsersAdmin().subscribe((resp) => {
      this.selecteds = resp;
    })
  }
  onChangeSelected(item) {
    this.auth.getPermisionByUser(item.userId).subscribe((resp) => {
      this.servicios = resp;
      this.visible = true;
    })
  }
  saveeraser() {
    this.auth.savePermision(this.servicios).subscribe((resp) => {
      if (resp.state === "Success") {
        Swal.fire({
          text: "Los cambios se han guardado correctamente.",
          type: "success",
          confirmButtonText: "Aceptar",
          confirmButtonClass: "upload-success"
        }).then(() => {
          this.disableBoton = true;
        });
      }
      else {
        Swal.fire({
          text: "Debe seleccionar al menos un permiso.",
          type: "error",
          confirmButtonText: "Aceptar",
          confirmButtonClass: "upload-success"
        }).then(() => {

        });
      }
    })
  }
  cambio() {
    this.disableBoton = false;
  }

}
