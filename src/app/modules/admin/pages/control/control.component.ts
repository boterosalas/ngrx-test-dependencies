import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ResponseService } from 'src/app/interfaces/response';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private content: ContentService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getMaxReferredIds();
  }

  initForm() {
    this.form = this.fb.group({
      idAmount: ['', [Validators.required, Validators.min(1), Validators.pattern('[0-9]+')]]
    });
  }

  getMaxReferredIds() {
    this.subscription = this.content.getMaximumReferredIds().subscribe((res) => {
      this.form.controls.idAmount.setValue(res)
    }
    );
  }

  onSubmit() {
    this.subscription = this.content.saveMaxReferredIds({
      value: this.form.controls.idAmount.value
    }).subscribe((res: any) => {
      this.snackBar.open(res.userMessage, 'Cerrar', { duration: 3000 });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
