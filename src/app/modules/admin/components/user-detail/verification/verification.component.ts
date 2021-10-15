import { Component, Inject, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { ResponseService } from 'src/app/interfaces/response';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit , OnDestroy {

  dateSelectedState: FormGroup;
  dataRejectionMessage: FormGroup;
  accountStatements: any;
  private subscription: Subscription = new Subscription();
  enableRejectionMessage: boolean;
  @ViewChild('templateRejectionMessage', { static: false })
  templateRejectionMessage: TemplateRef<any>;

  @Input() data: any;

  constructor(
    private fb:FormBuilder,
    private user:UserService,
    private utils: UtilsService,
    public dialogRef: MatDialogRef<any>,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {

    this.dateSelectedState = this.fb.group({
      state: [this.data.verified, Validators.required],
    });

    this.dataRejectionMessage = this.fb.group({
      message: [this.data.responseaccountbank, Validators.required],
    });

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
  };

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
    const datos = {
      userId: this.data.userId,
      message: this.dataRejectionMessage.controls.message.value,
    };
    this.user.postUpdateResponseAccountBank(datos).subscribe((resp) => {
      this.data.responseaccountbank = this.dataRejectionMessage.controls.message.value;
      this.dialogRef.close();
    });
  }

  onNoClick(){
    this.dialogRef.close();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
