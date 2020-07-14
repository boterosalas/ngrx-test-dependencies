import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UtilsService } from "src/app/services/utils.service";

@Component({
  selector: "app-medal",
  templateUrl: "./medal.component.html",
  styleUrls: ["./medal.component.scss"],
})
export class MedalComponent implements OnInit {
  constructor(private utils: UtilsService, private router: Router) {}

  medal: object;

  ngOnInit() {
    this.medal = this.utils.medals;
    if (this.medal === undefined) {
      this.router.navigate(["/logros"]);
    }
  }
}
