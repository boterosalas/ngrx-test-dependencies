import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { PreviousRouteService } from 'src/app/services/previous-route.service';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BackButtonComponent implements OnInit {

  route:string = '/inicio';

  constructor(
    private previousRouteService: PreviousRouteService
  ) { }

  ngOnInit(): void {
    const previousRoute = this.previousRouteService.getPreviousUrl();
    if(previousRoute){
      this.route = previousRoute;
    }else{
      this.route = '/inicio';
    }
  }

}
