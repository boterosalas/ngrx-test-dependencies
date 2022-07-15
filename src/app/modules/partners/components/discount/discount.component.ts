import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import decode from 'jwt-decode';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit, OnDestroy {

  constructor(
    private fb: UntypedFormBuilder,
    private user: UserService,
    private content: ContentService
  ) { }

  discountForm: UntypedFormGroup;
  valueForm: UntypedFormGroup;
  numberPattern = '^(0|[0-9][0-9]*)$';
  private subscription: Subscription = new Subscription();
  validUser = false;
  discount:string;
  total:string;
  showResults = false;
  idBusiness:number;

  ngOnInit(): void {
    this.discountForm = this.fb.group({
      identification: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(this.numberPattern)]],
      cellphone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(this.numberPattern)]],
    })

    this.valueForm = this.fb.group({
      value: ['', [Validators.pattern(this.numberPattern)]]
    })

    const token = localStorage.getItem('ACCESS_TOKEN');
    const tokenDecode = decode(token);
    this.idBusiness = tokenDecode.idbusiness;
  }

  public validate() {
    const values = this.discountForm.value;
    this.subscription = this.user.getUserPhygital(values).subscribe(valid => {
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

  calculateDiscount() {
  let value = this.valueForm.controls.value.value;
    this.content.calculateDiscount(this.idBusiness, value).subscribe(val => {
      this.discount = val.percentage;
      this.total = val.total;
      this.showResults = true;
    })
  }

  public confirmSale() {
    let id = this.discountForm.controls.identification.value;
    let price = this.valueForm.controls.value.value;
    let params = {
      identification: id,
      idBusiness: this.idBusiness,
      price: price
    }
    this.subscription = this.content.salePhygital(params).subscribe(() => {
      this.showResults = false;
      this.discountForm.reset();
      this.discountForm.controls.identification.setErrors(null);
      this.discountForm.controls.cellphone.setErrors(null);
      this.validUser = false;
      Swal.fire({
        title: 'Venta confirmada',
        text: 'Venta registrada con éxito.',
        confirmButtonText: 'Aceptar',
        confirmButtonClass: 'accept-sale',
        type: 'success',
      })
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
