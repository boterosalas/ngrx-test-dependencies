import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss']
})
export class ConfigurationsComponent implements OnInit {
  dateForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { }
  displayedColumns: string[] = ['modulo', 'activations'];
  selecteds = [{ titulo: "Andres Acosta", admin: 1 }, { titulo: "Melisa", admin: 2 }, { titulo: "Yorlady", admin: 2 }, { titulo: "Jose", admin: 2 }, { titulo: "Frank", admin: 2 }]
  servicios = [{
    titulo: "Dashboard",
    activo: false
  },
  {
    titulo: "Reportes",
    activo: false
  },
  {
    titulo: "Usuarios",
    activo: true
  }]
  ngOnInit() {
    this.dateForm = this.fb.group({
      users: [null],

    });
  }
  onChangeSelected(item) {
    console.log(item);
  }
}
