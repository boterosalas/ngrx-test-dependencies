import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alerta-cargar-documentos',
  templateUrl: './alerta-cargar-documentos.component.html',
  styleUrls: ['./alerta-cargar-documentos.component.scss']
})
export class AlertaCargarDocumentosComponent {
  
  showAlert: boolean = true;

  closeAlert() {
    this.showAlert = false;
  }

  saveSelectedTab(){
    localStorage.setItem('selectedTab','2');
  }

}
