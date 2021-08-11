import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LinksService } from 'src/app/services/links.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss'],
})
export class AchievementsComponent implements OnInit, OnDestroy {
  medals = [];
  private subscription: Subscription = new Subscription();

  constructor(private router: Router, private util: UtilsService, private link: LinksService) {}

  ngOnInit() {
    this.getMedals();
  }

  public goToMedal(medal: any) {
    this.router.navigate(['/medalla/' + medal.class]);
    this.util.medals = medal;
  }

  public getMedals() {
    this.subscription = this.link.getMedals().subscribe((medal) => {
      this.medals = medal;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
