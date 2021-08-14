import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datail-news',
  templateUrl: './datail-news.component.html',
  styleUrls: ['./datail-news.component.scss'],
})
export class DatailNewsComponent implements OnInit {
  constructor() {}

  states = [
    { label: 'Pendiente', state: 2 },
    { label: 'Faltan documentos', state: 2 },
    { label: 'En revisión', state: 1 },
    { label: 'Cierre parcial', state: 0 },
    { label: 'Solucionado', state: 0 },
  ];

  ngOnInit() {}
}
