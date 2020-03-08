import { Component, OnInit, HostListener } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
import { UtilsService } from 'src/app/services/utils.service';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-bussiness',
  templateUrl: './bussiness.component.html',
  styleUrls: ['./bussiness.component.scss']
})
export class BussinessComponent implements OnInit {

  id:string;
  title: string;
  percent: string;
  percentBussiness:string = "Hasta 9.6%";
  bussiness = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private content: ContentService,
    private utils: UtilsService
  ) { 

    this.route.params.subscribe(route => {
      this.title = route.code;
      this.percent = route.infoAditional;
      this.id = route.id;
    });

  }

  ngOnInit() {
    this.getContentBussiness();
  }

  public getContentBussiness() {
    this.content.getBusinessContent(this.id)
    .pipe(distinctUntilChanged())
    .subscribe(bussiness => {
      console.log(bussiness);
      this.bussiness = bussiness;
    })
  }

  public goback() {
    this.router.navigate(['./']);
  }
 
}
