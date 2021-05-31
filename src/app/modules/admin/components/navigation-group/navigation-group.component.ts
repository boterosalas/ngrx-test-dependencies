import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navigation-group',
  templateUrl: './navigation-group.component.html',
  styleUrls: ['./navigation-group.component.scss']
})
export class NavigationGroupComponent implements OnInit {

  @Input() section: any;

  constructor() { }

  ngOnInit() {
    
  }

}
