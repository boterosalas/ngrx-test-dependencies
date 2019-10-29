import { AbstractControl } from '@angular/forms';
export class ConfirmPasswordValidator {
  static MatchPassword(control: AbstractControl) {
    let password = control.get('password').value;
    let confirmPassword = control.get('confirmPassword').value;
    if (password != confirmPassword) {
      control.get('confirmPassword').setErrors({ ConfirmPassword: true });
    } 
    else if(password === confirmPassword || confirmPassword === password) {
      control.get('confirmPassword').setErrors(null);
      return null;
    }

  }
}