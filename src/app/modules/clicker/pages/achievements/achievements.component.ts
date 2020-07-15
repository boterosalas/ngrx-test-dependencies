import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UtilsService } from 'src/app/services/utils.service';
import { LinksService } from 'src/app/services/links.service';

@Component({
  selector: "app-achievements",
  templateUrl: "./achievements.component.html",
  styleUrls: ["./achievements.component.scss"],
})
export class AchievementsComponent implements OnInit {

  medals = [];

  constructor(
      private router: Router,
      private util: UtilsService,
      private link: LinksService
     ) {}

  ngOnInit() {
    this.getMedals();
  }

  public goToMedal(medal: any) {
    this.router.navigate(["/medalla/" + medal.class ]);
    this.util.medals = medal;
  }

  public getMedals() {
    this.link.getMedals().subscribe(medal => {
      this.medals = medal;
    })
  }

}
