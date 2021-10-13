import { Component, Inject, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonalInfo } from 'src/app/interfaces/personal-info';
import { ResponseService } from 'src/app/interfaces/response';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  @Input() data: PersonalInfo;
  formPersonalInfo: FormGroup;
  @ViewChild('templateInfoPersonal', { static: false })
  templatePersonalInfo: TemplateRef<any>;

    constructor(
      private fb: FormBuilder,
      private dialog: MatDialog,
      public dialogRef: MatDialogRef<any>,
      private user:UserService,
      private utils:UtilsService,
      @Inject(MAT_DIALOG_DATA) public dataModal: any,
  ) {
  }

  ngOnInit() {
    this.formPersonalInfo = this.fb.group({
      number: [null, Validators.required],
      email: [null, Validators.required],
      cellphone: [null, Validators.required],
    });
  }

  editInfoPersonal() {
    const title = 'Editar datos personales';
    const idBussiness = 1;
    const edit = 0;
    const template = this.templatePersonalInfo;

    this.formPersonalInfo.reset();
    this.formPersonalInfo.controls.number.setValue(this.data.identification);
    this.formPersonalInfo.controls.cellphone.setValue(this.data.cellphone);
    this.formPersonalInfo.controls.email.setValue(this.data.email);
    this.dialogRef = this.dialog.open(ModalGenericComponent, {
      width: '450px',
      data: {
        title,
        idBussiness,
        template,
        edit,
      },
    });
  }

  public saveInfoPersonal() {
    const datos = {
      userId: this.data.userId,
      email: this.formPersonalInfo.controls.email.value,
      cellPhone: this.formPersonalInfo.controls.cellphone.value,
      identification: this.formPersonalInfo.controls.number.value,
    };

    this.user.updateInfoClicker(datos).subscribe((resp: ResponseService) => {
      if (resp.state === 'Success') {
        this.data.identification = this.formPersonalInfo.controls.number.value;
        this.data.cellphone = this.formPersonalInfo.controls.cellphone.value;
        this.data.email = this.formPersonalInfo.controls.email.value;
        this.dialogRef.close();
      } else {
        this.utils.openSnackBar(resp.userMessage, 'Cerrar');
      }
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
