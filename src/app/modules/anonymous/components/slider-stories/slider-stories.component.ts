import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-slider-stories',
  templateUrl: './slider-stories.component.html',
  styleUrls: ['./slider-stories.component.scss']
})
export class SliderStoriesComponent implements OnInit {
  stories = [{
    name: "pizza",
    image: "https://www.saborusa.com/wp-content/uploads/2019/12/origen-de-la-pizza-1.jpg",
    state: false
  },
  {
    name: "kamaos",
    image: "https://cocina-casera.com/wp-content/uploads/2016/11/hamburguesa-queso-receta.jpg",
    state: true
  },
  {
    name: "pizza",
    image: "https://www.saborusa.com/wp-content/uploads/2019/12/origen-de-la-pizza-1.jpg",
    state: false
  },
  {
    name: "kamaos",
    image: "https://cocina-casera.com/wp-content/uploads/2016/11/hamburguesa-queso-receta.jpg",
    state: true
  }]

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  public openDialogStories(index: number) {
    console.log(index)
    // this.dialog.open(DialogImagePlayerComponent, {
    //   panelClass: "image-clickacademy",
    //   maxWidth: "600px",
    //   data: {
    //       id,
    //       title,
    //       template,
    //       urlVideo,
    //       datosDownload
    //   },
    //   backdropClass: 'backdropBackground'
    // });
  }
}
