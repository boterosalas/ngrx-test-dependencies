import { AbstractControl } from "@angular/forms";
export class ValidateDate {
  static CompareDates(control: AbstractControl) {
    let startDate = control.get("dateStart").value;
    let endDate = control.get("dateEnd").value;

    let start = new Date(startDate);
    let end = new Date(endDate);

    if (start > end) {
      control.get("dateEnd").setErrors({ dateEnd: true });
    } else {
      return null;
    }
  }
}
