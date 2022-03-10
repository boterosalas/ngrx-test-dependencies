import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-catalog-pdf',
  templateUrl: './card-catalog-pdf.component.html',
  styleUrls: ['./card-catalog-pdf.component.scss']
})
export class CardCatalogPdfComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
