import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  isOpen = false;
  isOpenMenu=  false;
  isRegisterOpen = false;

  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Output() changeMenu: EventEmitter<boolean> = new EventEmitter();
  @Output() changeRegister: EventEmitter<boolean> = new EventEmitter();

  showloginForm() {
    this.isOpen = true;
    this.change.emit(this.isOpen);
  }

  showRegisterForm() {
    this.isOpen = true;
    this.changeRegister.emit(this.isOpen);
  }

  hideloginForm() {
    this.isOpen = false;
    this.change.emit(this.isOpen);
  }

  showMenu() {
    this.isOpenMenu = true;
    this.changeMenu.emit(this.isOpenMenu);
  }

  hideMenu() {
    this.isOpenMenu = false;
    this.changeMenu.emit(this.isOpenMenu);
  }

}
