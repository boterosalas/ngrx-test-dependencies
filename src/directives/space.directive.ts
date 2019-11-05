import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[spacebar]'
})
export class KeySpaceDirective {
  constructor() { }

  @HostListener('keypress', ['$event']) keySpace(e: KeyboardEvent) {
      if(e.keyCode === 32) {
          e.preventDefault();
      }
  }
}