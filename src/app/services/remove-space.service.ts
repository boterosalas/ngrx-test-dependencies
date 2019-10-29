import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RemoveSpaceService {

  constructor() { }

  removeSpace(value: string, valueNospace: any) {
    const inputValue = value;
    let noSpace = inputValue.replace(/ /g, "");
    valueNospace.setValue(noSpace);
  }

}
