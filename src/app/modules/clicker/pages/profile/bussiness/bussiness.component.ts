import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-bussiness',
  templateUrl: './bussiness.component.html',
  styleUrls: ['./bussiness.component.scss']
})
export class BussinessComponent implements OnInit {

  id:string;
  bussiness = [];

  constructor(
    private route: ActivatedRoute,
    private content: ContentService
  ) { 

    this.route.params.subscribe(route => {
      this.id = route.params;
    });

  }

  ngOnInit() {
    this.getContentBussiness();
  }

  public getContentBussiness() {
    this.content.getBusinessContent(this.id).subscribe(bussiness => {
      this.bussiness =bussiness;
    })
  }

}
