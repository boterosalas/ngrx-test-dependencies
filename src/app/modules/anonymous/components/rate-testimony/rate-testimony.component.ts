import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-rate-testimony',
  templateUrl: './rate-testimony.component.html',
  styleUrls: ['./rate-testimony.component.scss'],
})
export class RateTestimonyComponent implements OnInit, OnChanges {
  @Input() testimony: Array<any>;

  pageIndex = 0;
  pageSize = 5;
  pageTo = 20;
  totalItems = 0;
  from: any;
  to: any;
  showCard = false;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if(this.testimony !== undefined) {
      this.totalItems = this.testimony.length;
      this.showCard = true;
      console.log(this.totalItems);
    }
  }

  
  public pagination(paginate: any) {
    this.pageIndex = paginate;
    this.from = this.pageSize * this.pageIndex + 1 - 20;
    this.to = this.pageSize * (this.pageIndex + 1) - 20;
  }

}
