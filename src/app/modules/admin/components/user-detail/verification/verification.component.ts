import { Component, Input, OnChanges, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs/internal/Subscription';
import { ResponseService } from 'src/app/interfaces/response';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
})
export class VerificationComponent implements OnChanges, OnInit, OnDestroy {
  dateSelectedState: FormGroup;
  dataRejectionMessage: FormGroup;
  accountStatements: any;
  private subscription: Subscription = new Subscription();
  enableRejectionMessage: boolean;
  @ViewChild('templateRejectionMessage', { static: false })
  templateRejectionMessage: TemplateRef<any>;
  showOther = false;
  sendMessage: string;

  message = [
    {
      id: 0,
      value:
        'Hola, te informamos que los documentos adjuntos no corresponden a la certificación bancaria o la cédula, por favor revísalos y cárgalos de nuevo',
    },
    {
      id: 1,
      value:
        'Hola, te informamos que aún faltan documentos por adjuntar para poder verificar tu cuenta bancaria y realizar los pagos, por favor revisa de nuevo la cédula por ambas caras y la certificación bancaria.',
    },
    {
      id: 2,
      value:
        'Hola, te informamos que los documentos adjuntos no corresponden a la persona registrada en Clickam, por favor revísalos y cárgalos correctamente.',
    },
    { id: 3, value: 'Hola, te informamos que algunos de los documentos adjuntos no permiten abrirse, por favor cárgalos de nuevo.' },
    {
      id: 4,
      value:
        'Hola, te informamos que algunos de los documentos adjuntos no permiten la correcta visualización, por favor cárgalos de nuevo con un tamaño más ajustado para continuar con el proceso de verificación de cuenta bancaria.',
    },
    { id: 5, value: 'Otro' },
  ];

  @Input() data: any;

  constructor(
    private fb: FormBuilder,
    private user: UserService,
    private utils: UtilsService,
    public dialogRef: MatDialogRef<any>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dateSelectedState = this.fb.group({
      state: [this.data.verified, Validators.required],
    });

    this.dataRejectionMessage = this.fb.group({
      messageSel: ['', Validators.required],
      message: [''],
    });
  }

  ngOnChanges(): void {
    this.getStatusVerificationUser();
  }

  public getStatusVerificationUser() {
    this.subscription = this.user.getStatusVerification().subscribe(
      (resp: ResponseService) => {
        if (resp.state === 'Success') {
          this.accountStatements = resp.objectResponse.map((state) => {
            return { ...state, value: this.utils.capitalizeFirstLetter(state.value) };
          });
          const objectState = this.accountStatements.find((state) => state.value === this.utils.capitalizeFirstLetter(this.data.verified));
          if (objectState) {
            this.dateSelectedState.controls.state.setValue(objectState.id.toString());
            this.enableDisabledEditMessage();
          }
        } else {
          this.utils.openSnackBar(resp.userMessage, 'Cerrar');
        }
      },
      (err) => {
        this.utils.openSnackBar(err.userMessage, 'Cerrar');
      }
    );
  }

  enableDisabledEditMessage() {
    const idRejected = this.accountStatements.find((state) => state.code === 'REJECTED').id;
    if (this.dateSelectedState.controls.state.value === idRejected.toString()) {
      this.enableRejectionMessage = true;
    } else {
      this.enableRejectionMessage = false;
    }
  }

  public changeVerified() {
    const userId = this.data.userId;
    const valueMessage = this.dateSelectedState.controls.state.value;
    this.subscription = this.user.verifiedUser(userId, valueMessage).subscribe((data: ResponseService) => {
      this.enableDisabledEditMessage();
      this.utils.openSnackBar(data.userMessage, 'Cerrar');
    });
  }

  editRejectionMessage() {
    const title = 'Editar mensaje de rechazo';
    const idBussiness = 2;
    const edit = 0;
    const template = this.templateRejectionMessage;
    this.showOther = false;

    this.dataRejectionMessage.reset();
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

  public saveRejectionMessage() {
    if (this.sendMessage === 'Otro') {
      this.sendMessage = this.dataRejectionMessage.controls.message.value;
    }
    console.log(this.sendMessage);
    const datos = {
      userId: this.data.userId,
      message: this.sendMessage,
    };
    this.user.postUpdateResponseAccountBank(datos).subscribe((resp) => {
      this.data.responseaccountbank = this.sendMessage;
      this.dialogRef.close();
    });
  }

  selectMessage(e: any) {
    if (e.value === 'Otro') {
      this.showOther = true;
      this.dataRejectionMessage.controls.message.setValidators(Validators.required);
      this.sendMessage = this.dataRejectionMessage.controls.messageSel.value;
    } else {
      this.showOther = false;
      this.dataRejectionMessage.controls.message.clearValidators();
      this.sendMessage = this.dataRejectionMessage.controls.messageSel.value;
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
