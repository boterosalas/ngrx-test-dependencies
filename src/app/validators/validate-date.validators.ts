import { AbstractControl } from '@angular/forms';
export class ValidateDate {
  static CompareDates(control: AbstractControl) {
    const startDate = control.get('dateStart').value;
    const endDate = control.get('dateEnd').value;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      control.get('dateEnd').setErrors({ dateEnd: true });
    } else {
      return null;
    }
  }
}
