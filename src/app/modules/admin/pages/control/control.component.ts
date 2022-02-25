import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit, OnDestroy {
  saveReferredIds$ : Subscription;
  form = this.fb.group({
    idAmount: ['', [Validators.required, Validators.min(1), Validators.pattern('[0-9]+')]]
  });

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private content: ContentService
  ) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.saveReferredIds$ = this.content.saveMaxReferredIds({value: this.form.controls.idAmount.value}).subscribe((res:any) => {
      this.snackBar.open(res.userMessage, 'Cerrar', { duration: 3000 });
    });
  }
  ngOnDestroy(): void {
    this.saveReferredIds$.unsubscribe();
  }

}
