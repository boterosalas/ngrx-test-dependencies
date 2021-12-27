import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../anonymous/pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { SliderStoriesComponent } from '../anonymous/components/slider-stories/slider-stories.component';
import { NewBlogComponent } from '../anonymous/components/new-blogs/new-blog.component';
import { CardMedalComponent } from '../anonymous/components/molecules/card-medal/card-medal.component';
import { SlideTestimonialsComponent } from '../anonymous/components/molecules/slide-testimonials/slide-testimonials.component';
import { WelcomeComponent } from '../anonymous/components/welcome/welcome.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SalesInfoComponent } from '../anonymous/components/sales-info/sales-info.component';
import { ReportRewardComponent } from '../anonymous/components/report-reward/report-reward.component';
import { RewardCardComponent } from '../anonymous/components/reward-card/reward-card.component';
import { ListBlogsComponent } from '../anonymous/components/list-blogs/list-blogs.component';
import { TopRewardComponent } from '../anonymous/components/top-reward/top-reward.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    component: HomeComponent,
  },
  {
    path: '?',
    component: HomeComponent,
  }
]


@NgModule({
  declarations: [
    HomeComponent,
    SliderStoriesComponent,
    NewBlogComponent,
    CardMedalComponent,
    SlideTestimonialsComponent,
    WelcomeComponent,
    SalesInfoComponent,
    ReportRewardComponent,
    RewardCardComponent,
    ListBlogsComponent,
    TopRewardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    TranslateModule,
    RouterModule.forChild(routes),
    SlickCarouselModule,
    FlexLayoutModule
  ],
  exports: [
    RouterModule,
    SliderStoriesComponent,
    NewBlogComponent
  ]
})
export class HomeModule { }
