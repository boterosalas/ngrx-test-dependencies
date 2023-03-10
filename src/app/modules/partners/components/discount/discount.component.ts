import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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
  private subscription$: Subscription;
  private getCities$: Subscription;
  private calculateDiscount$: Subscription;
  validUser = false;
  discount: string;
  valoriva: string;
  valorAntesIva: string;
  total: string;
  showResults = false;
  idBusiness: number;
  userId: number;
  ivaIncluido = false;
  cityNames: any[] = [];
  salesObjectGroupByCities: {};

  ngOnInit(): void {
    this.discountForm = this.fb.group({
      identification: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(this.numberPattern)]],
      cellphone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(this.numberPattern)]],
    })

    this.valueForm = this.fb.group({
      value: ['', [Validators.pattern(this.numberPattern), Validators.required]],
      shopControl: [null, [Validators.required]]
    })

    const token = localStorage.getItem('ACCESS_TOKEN');
    const tokenDecode = decode(token);
    this.idBusiness = tokenDecode.idbusiness;
    this.userId = tokenDecode.userid;
  }

  public validate() {
    const values = this.discountForm.value;
    this.subscription$ = this.user.getUserPhygital(values).subscribe(valid => {
      if (valid.state === 'Error') {
        Swal.fire({
          html: `<i class='tio-clear_circle_outlined red-text f-48'></i> <h3>Cuenta incorrecta</h3> <p class='f-19'>${valid.userMessage}</p>`,
          confirmButtonText: 'Aceptar'
        })
        this.validUser = false;
      } else {
        this.getShops(this.idBusiness,this.userId);
        this.validUser = true;
      }
    })
  }

  getDefaultSale(obj: any) {
    let allShops = [];
    Object.keys(obj).forEach(title => {
      obj[title].forEach(sale => {
        allShops.push(sale)
      })
    });
    return allShops.find(shop => shop.isdefault);
  }

  getShops(idBusiness: any, userId: any) {
    this.getCities$ = this.content.getShopsWithDefault(idBusiness, userId).subscribe(res => {
      this.cityNames = Object.keys(res);
      this.salesObjectGroupByCities = res;
      const defaultSale = this.getDefaultSale(res);
      defaultSale && this.valueForm.controls.shopControl.setValue(defaultSale.id);
    })
  }

  calculateDiscount() {
    const value = this.valueForm.controls.value.value;
    if (value) {
      this.calculateDiscount$ = this.content.calculateDiscount(this.idBusiness, value).subscribe(val => {
        this.discount = val.percentage;
        this.total = val.total;
        this.showResults = true;
        this.valoriva = val.valoriva;
        this.valorAntesIva = val.valorAntesIva;
        this.ivaIncluido = val.ivaIncluido;
      });
    }
  }

  public confirmSale(discountFormDirective: FormGroupDirective, valueFormDirective: FormGroupDirective) {
    if (this.valueForm.valid) {
      let params = {
        identification: this.discountForm.controls.identification.value,
        idBusiness: this.idBusiness,
        price: this.valueForm.controls.value.value,
        idPhysicalPos: this.valueForm.controls.shopControl.value
      }
      this.subscription$ = this.content.salePhygital(params).subscribe(() => {
        this.showResults = false;
        this.ivaIncluido = false;
        this.discountForm.reset();
        this.valueForm.reset();
        discountFormDirective.resetForm();
        valueFormDirective.resetForm();
        this.validUser = false;
        Swal.fire({
          title: 'Venta confirmada',
          text: 'Venta registrada con ??xito.',
          confirmButtonText: 'Aceptar',
          confirmButtonClass: 'accept-sale',
          type: 'success',
        });
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription$ && this.subscription$.unsubscribe();
    this.getCities$ && this.getCities$.unsubscribe();
    this.calculateDiscount$ && this.calculateDiscount$.unsubscribe();
  }

}
