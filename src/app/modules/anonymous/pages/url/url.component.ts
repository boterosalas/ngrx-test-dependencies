import { Component, OnInit } from '@angular/core';
import { LinksService } from 'src/app/services/links.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.scss']
})
export class UrlComponent implements OnInit {

  code: string;
  showMessage: boolean = false;

  constructor(
    private link: LinksService,
    private route: ActivatedRoute
  ) { 
    this.route.params.subscribe(param => {
      this.code = param.shortCode;
    })
  }

  ngOnInit() {
    this.getUrl();
  }

  public getUrl() {
    this.link.getUrl(this.code).subscribe(url=> {
      console.log(url);
      if(url !== null) {
        window.location.replace(url);
      } 
      if(url === null){
       this.showMessage = true;
      }
    });
  }



}
