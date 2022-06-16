import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    private user: UserService
  ) { }

  discountForm: FormGroup;
  numberPattern = '^(0|[0-9][0-9]*)$';
  private subscription: Subscription = new Subscription();
  validUser = false;

  ngOnInit(): void {
    this.discountForm = this.fb.group({
      identification: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(this.numberPattern)]],
      cellphone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(this.numberPattern)]],
    })
  }

  public validate() {
    const values = this.discountForm.value;
    console.log(values);
    this.subscription = this.user.getUserPhygital(values).subscribe(valid => {
      console.log(valid);
      if(valid.state === 'Error') {
        Swal.fire({
          html: `<i class='tio-clear_circle_outlined red-text f-48'></i> <h3>Cuenta incorrecta</h3> <p class='f-19'>${valid.userMessage}</p>`,
          confirmButtonText: 'Aceptar'
        })
        this.validUser = false;
      } else {
        this.validUser = true;
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
