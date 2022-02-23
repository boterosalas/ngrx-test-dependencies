import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit, OnDestroy {
  form = this.fb.group({
    idAmount: ['', [Validators.required, Validators.min(1), Validators.pattern('[0-9]+')]]
  });

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private user: UserService
  ) { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {

  }
  onSubmit() {
    this.user.saveMaxReferredIds({value: this.form.controls.idAmount.value}).subscribe((res:any) => {
      this.snackBar.open(res.userMessage, 'Cerrar', {
        duration: 3000,
      });
    });
  }

}
