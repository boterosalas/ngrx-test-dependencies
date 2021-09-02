import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog-novelty-satisfaction',
  templateUrl: './dialog-novelty-satisfaction.component.html',
  styleUrls: ['./dialog-novelty-satisfaction.component.scss'],
})
export class DialogNoveltySatisfactionComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogNoveltySatisfactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  showCopyThanks: boolean = false;
  statusForm?: FormGroup;
  activeButton = false;
  $formSubscription: Subscription;

  ngOnInit() {
    this.statusForm = this.fb.group({ qualification: [''], comment: ['', [Validators.required]] });
    this.$formSubscription = this.statusForm.valueChanges.subscribe((resp) => {
      if (resp.qualification) {
        this.data.qualification = Number(resp.qualification);
      }
      this.data.comment = resp.comment;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendQualification(): void {
    this.showCopyThanks = true;
    this.dialogRef.backdropClick().subscribe(() => {
      this.dialogRef.close(this.data);
    });
    setTimeout(() => {
      this.dialogRef.close(this.data);
    }, 3500);
  }

  closeDialog() {
    this.dialogRef.close(this.data);
  }

  ngOnDestroy() {
    if (this.$formSubscription) {
      this.$formSubscription.unsubscribe();
    }
  }
}
