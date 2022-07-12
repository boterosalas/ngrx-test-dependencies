import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-refer-email',
  templateUrl: './refer-email.component.html',
  styleUrls: ['./refer-email.component.scss'],
})
export class ReferEmailComponent implements OnInit {
  @Output() email = new EventEmitter();

  emailPattern = '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}';
  referForm: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit() {
    this.formRefer();
  }

  public formRefer() {
    this.referForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern), Validators.maxLength(64)]],
    });
  }

  public sendEmail() {
    this.email.emit(this.referForm.controls.email.value.toLowerCase());
    setTimeout(() => {
      this.referForm.reset();
      this.referForm.controls.email.setErrors({ required: false });
    }, 500);
  }
}
