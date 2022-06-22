import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-phygital-location',
  templateUrl: './phygital-location.component.html',
  styleUrls: ['./phygital-location.component.scss']
})
export class PhygitalLocationComponent implements OnInit {

  business:string;
  idBusiness: number;
  img: string;
  cities = [];
  locations = [];

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, private content:ContentService) { }

  ngOnInit(): void {
    this.business = this.data.description;
    this.idBusiness = this.data.idbusiness;
    this.getCities(this.idBusiness);
  }

  public getCities(id:number) {
    this.content.getCities(id).subscribe(city => {
      this.cities = city;
    })
  }

  public getPoints(id = this.idBusiness, city:string) {
    this.content.getLocations(id,city).subscribe(location => {
      this.locations = location;
    })
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
