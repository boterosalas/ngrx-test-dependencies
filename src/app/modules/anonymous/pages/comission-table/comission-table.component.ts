import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-comission-table',
  templateUrl: './comission-table.component.html',
  styleUrls: ['./comission-table.component.scss']
})
export class ComissionTableComponent implements OnInit {

  constructor(
    private content: ContentService
  ) { }

  tableComission = [];
  

  ngOnInit() {
    this.getComission();
  }

  public getComission() {
    this.content.getCommissions().subscribe(resp => {
      this.tableComission = resp;
    })
  }

}
