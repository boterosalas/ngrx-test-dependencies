import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { ResponseService } from 'src/app/interfaces/response';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit , OnDestroy {

  dateSelectedState: FormGroup;
  accountStatements: any;
  private subscription: Subscription = new Subscription();
  enableRejectionMessage: boolean;
  @Input() data: any;

  constructor(
    private fb:FormBuilder,
    private user:UserService,
    private utils: UtilsService
    ) { }

  ngOnInit(): void {
    this.dateSelectedState = this.fb.group({
      state: [null, Validators.required],
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
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
