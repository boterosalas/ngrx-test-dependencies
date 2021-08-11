import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LinksService } from 'src/app/services/links.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-order-number',
  templateUrl: './card-order-number.component.html',
  styleUrls: ['./card-order-number.component.scss'],
})
export class CardOrderNumberComponent implements OnInit {
  orderNumberForm: FormGroup;

  bussiness = [
    { id: 'exito', name: 'exito.com' },
    { id: 'carulla', name: 'carulla.com' },
  ];

  constructor(private fb: FormBuilder, private _link: LinksService) {}

  ngOnInit() {
    this.formOrderNumber();
  }

  public formOrderNumber() {
    this.orderNumberForm = this.fb.group({
      bussiness: ['', Validators.required],
      reference: ['', Validators.required],
    });
  }

  public consultOrder() {
    const params = this.orderNumberForm.value;
    this._link.getOrderNumber(params).subscribe((order) => {
      Swal.fire({
        html: `<h3>${order.userMessage}</h3> <p class='w-container purple-text'>${order.objectResponse}</p>`,
        confirmButtonText: 'volver',
        cancelButtonText: 'Cancelar',
        showCancelButton: false,
        confirmButtonClass: 'purple-button',
        cancelButtonClass: 'updatecancel',
        allowOutsideClick: false,
      });
    });
  }
}
