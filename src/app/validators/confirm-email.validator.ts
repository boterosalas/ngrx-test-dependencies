import { AbstractControl } from '@angular/forms';
export class ConfirmEmailValidator {
  static MatchEmail(control: AbstractControl) {
    let email = control.get('email').value;
    let confirmEmail = control.get('confirmEmail').value;
    if (email != confirmEmail) {
      control.get('confirmEmail').setErrors({ ConfirmEmail: true });
    } 
    else if(email === confirmEmail || confirmEmail === email) {
      control.get('confirmEmail').setErrors(null);
      return null;
    }

  }
}