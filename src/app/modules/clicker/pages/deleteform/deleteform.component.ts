import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { ModalGenericComponent } from 'src/app/modules/shared/components/modal-generic/modal-generic.component';
import { LinksService } from 'src/app/services/links.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deleteform',
  templateUrl: './deleteform.component.html',
  styleUrls: ['./deleteform.component.scss']
})
export class DeleteformComponent implements OnInit {

  constructor(
    private payment: LinksService,
    private user: UserService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private utils: UtilsService,
  ) { }
  private subscription: Subscription = new Subscription();
  available: number;
  account: number;
  activeText: boolean = true;
  profileFormDelete: FormGroup;
  disableButton: string = "1";
  causeSurvey: string = "";
  disableButtonOr: boolean = true;

  @ViewChild("templateDeleteAccount", { static: false })
  templateDelete: TemplateRef<any>;

  descriptionVal = [{

    title: "La plataforma no es clara",
    value: false
  }, {
    title: "Tuve inconvenientes con mis comisiones",
    value: false
  }, {
    title: "La plataforma no es lo que esperaba",
    value: false
  }, {
    title: "La plataforma envía muchas notificaciones y mensajes",
    value: false

  }, {
    title: "Otro. ¿Cuál?",
    value: false
  }]
  name: string;
  ngOnInit() {
    this.subscription = this.user.userInfo$.subscribe((val) => {
      if (!!val) {
        console.log(val)
        this.name = val.firstNames;
      }
    });
    this.getInfomonth();
    this.profileFormDelete = this.fb.group({
      Password: [
        "",
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });
  }
  public getInfomonth() {
    this.payment.getReportUser().subscribe((resp: any) => {
      this.available = resp.objectResponse.money.accumulated;
      this.account = resp.objectResponse.money.cutOffValue;
    })
  }
  public changeValue(dato) {
    if (dato === "Otro. ¿Cuál?") {
      this.activeText = !this.activeText;
    }
    this.checkSurvey();
  }
  public deleteAccount() {
    const title = "";
    const template = this.templateDelete;
    let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (iOS || isSafari) {
      window.document.body.scrollTop = 0;
    } else {
      window.document.documentElement.scrollTop = 0;
    }
    this.dialog.open(ModalGenericComponent, {
      data: {
        title,
        template,
      },
    });
  }
  public checkSurvey() {
    for (let index = 0; index < this.descriptionVal.length; index++) {
      if (this.descriptionVal[index].value === true) {
        this.disableButton = "0";
        this.disableButtonOr = false;
      }
    }
    if (this.descriptionVal[this.descriptionVal.length - 1].value === true) {
      this.disableButton = "1";
      this.disableButtonOr = true;
    }
    if (this.descriptionVal[this.descriptionVal.length - 1].value === true && this.causeSurvey != "") {
      this.disableButton = "0";
      this.disableButtonOr = false;
    }
  }
  public deleteAccountService() {
    let reason = []
    for (let index = 0; index < this.descriptionVal.length - 1; index++) {
      if (this.descriptionVal[index].value === true) {
        reason.push({
          description: this.descriptionVal[index].title,
          detail: this.descriptionVal[index].title,
        })
      }
    }
    if (this.descriptionVal[this.descriptionVal.length - 1].value === true && this.causeSurvey != "") {
      reason.push({
        description: this.descriptionVal[this.descriptionVal.length - 1].title,
        detail: this.causeSurvey,
      })
    }
    let data = {
      password: btoa(this.profileFormDelete.controls.Password.value),
      reasons: reason
    };
    this.user.deleteUser(data).subscribe(
      (resp: any) => {
        if (resp.state === "Success") {
          Swal.fire({
            text: "Tu cuenta se ha eliminado con éxito",
            type: "success",
            confirmButtonText: "Aceptar",
            confirmButtonClass: "upload-success"
          }).then(() => {
            this.dialog.closeAll();
            this.utils.logout();
          });
        } else {
          this.openSnackBar(resp.userMessage, "Cerrar");
        }
      },
      (err) => {
        //this.wrongPass = true;
        this.openSnackBar(err.userMessage, "Cerrar");

      }
    )
    //console.log(this.user.deleteUser());
  }
  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
  public cancelDelete() {
    this.dialog.closeAll();
  }

}