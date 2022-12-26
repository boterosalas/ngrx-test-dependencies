import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MonthResumeComponent } from './components/month-resume/month-resume.component';
import { GeneralResumeComponent } from './components/general-resume/general-resume.component';
import { ReportComponent } from './pages/report/report.component';
import { AuthGuard } from 'src/app/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { AditionalFilesComponent } from './components/aditional-files/aditional-files.component';
import { DragScrollModule } from 'ngx-drag-scroll';
import { AditionalInfoFormComponent } from './components/aditional-info-form/aditional-info-form.component';
import { DialogEditComponent } from './components/dialog-edit/dialog-edit.component';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { DialogHistoryComponent } from './components/dialog-history/dialog-history.component';
import { ShareModule } from 'ngx-sharebuttons';
import { BussinessComponent } from './pages/bussiness/bussiness.component';
import { PaymentInfoComponent } from './components/payment-info/payment-info.component';
import { SliderDeliverComponent } from './components/slider-deliver/slider-deliver.component';
import { LinksHistorialComponent } from './pages/links-historial/links-historial.component';
import { TableHistoricalLinksComponent } from './components/table-historical-links/table-historical-links.component';
import { ReferComponent } from './pages/refer/refer.component';
import { ReferEmailComponent } from './components/refer-email/refer-email.component';
import { ReferShareComponent } from './components/refer-share/refer-share.component';
import { TableReferComponent } from './components/table-refer/table-refer.component';
import { AllBussinessComponent } from './pages/all-bussiness/all-bussiness.component';
import { AnonymousModule } from '../anonymous/anonymous.module';
import { AchievementsComponent } from './pages/achievements/achievements.component';
import { CardMedalComponent } from './components/card-medal/card-medal.component';
import { MedalComponent } from './pages/medal/medal.component';
import { BannerMedalComponent } from './components/banner-medal/banner-medal.component';
import { CardMissionComponent } from './components/card-mission/card-mission.component';
import { MissionLevelComponent } from './components/mission-level/mission-level.component';
import { LibraryComponent } from './pages/library/library.component';
import { DialogImagePlayerComponent } from './components/dialog-visualization-image/dialog-image-player.component';
import { DeleteformComponent } from './pages/deleteform/deleteform.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { DetailComponent } from './pages/notifications/detail/detail.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SocialFormComponent } from './components/social-form/social-form.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { CardCatalogPdfComponent } from './components/card-catalog-pdf/card-catalog-pdf.component';
import { PhygitalLocationComponent } from './components/phygital-location/phygital-location.component';
import { UserReportComponent } from './pages/user-report/user-report.component';
import { RewardsByBussinessComponent } from './pages/user-report/components/rewards-by-bussiness/rewards-by-bussiness.component';
import { ResumeCardComponent } from './pages/user-report/components/resume-card/resume-card.component';
import { ResumeCardsContainerComponent } from './pages/user-report/components/resume-cards-container/resume-cards-container.component';
import { SwiperModule } from 'swiper/angular';

const routes: Routes = [
  {
    path: 'mi-perfil/:pagos',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'eliminar-cuenta',
    component: DeleteformComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'mi-perfil',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reportes',
    component: UserReportComponent,
    // component: ReportComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'historial-links',
    component: LinksHistorialComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'referidos',
    component: ReferComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'negocios',
    component: AllBussinessComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'negocios/:bussinessNameUrl',
    component: BussinessComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'logros',
    component: AchievementsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'medalla/:id',
    component: MedalComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'biblioteca',
    component: LibraryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'notificaciones',
    component: NotificationsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'notificacion-mobile/:idnotification/:id',
    component: DetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'catalogo',
    component: CatalogComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
    declarations: [
        MonthResumeComponent,
        GeneralResumeComponent,
        ReportComponent,
        ProfileComponent,
        ProfileFormComponent,
        AditionalFilesComponent,
        AditionalInfoFormComponent,
        DialogEditComponent,
        DialogHistoryComponent,
        BussinessComponent,
        PaymentInfoComponent,
        SliderDeliverComponent,
        LinksHistorialComponent,
        TableHistoricalLinksComponent,
        ReferComponent,
        ReferEmailComponent,
        ReferShareComponent,
        TableReferComponent,
        AllBussinessComponent,
        AchievementsComponent,
        CardMedalComponent,
        MedalComponent,
        BannerMedalComponent,
        CardMissionComponent,
        MissionLevelComponent,
        LibraryComponent,
        DialogImagePlayerComponent,
        DeleteformComponent,
        NotificationsComponent,
        DetailComponent,
        SocialFormComponent,
        PreferencesComponent,
        CatalogComponent,
        CardCatalogPdfComponent,
        PhygitalLocationComponent,
        UserReportComponent,
        RewardsByBussinessComponent,
        ResumeCardComponent,
        ResumeCardsContainerComponent,
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        SharedModule,
        SlickCarouselModule,
        ReactiveFormsModule,
        TranslateModule,
        FlexLayoutModule,
        FormsModule,
        ShareModule,
        DragScrollModule,
        MatPasswordStrengthModule,
        RouterModule.forChild(routes),
        AnonymousModule,
        NgxPaginationModule,
        SwiperModule
    ],
    exports: [
        RouterModule,
    ]
})
export class ClickerModule {}
