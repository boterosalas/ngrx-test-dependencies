import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from 'src/app/role.guard';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { SharedModule } from '../shared/shared.module';
import { ReportsComponent } from './pages/reports/reports.component';
import { TranslateModule } from '@ngx-translate/core';
import { CardComponent } from './components/card/card.component';
import { PopupCardComponent } from './components/popup-card/popup-card.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadFormFileComponent } from './components/load-form-file/load-form-file.component';
import { UsersComponent } from './pages/users/users.component';
import { TableUsersComponent } from './components/table-users/table-users.component';
import { SearchUsersComponent } from './components/search-users/search-users.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { KeySpaceDirectiveAdmin } from 'src/directives/space.admin.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgCircleProgressModule } from 'ng-circle-progress';

// date range
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { AuditComponent } from './pages/audit/audit.component';
import { BusinessComponent } from './pages/business/business.component';
import { RefersComponent } from './pages/refers/refers.component';
import { ResumeComponent } from './components/resume/resume.component';
import { CardDashboardComponent } from './components/card-dashboard/card-dashboard.component';
import { TableBussinessComponent } from './components/table-bussiness/table-bussiness.component';
import { LinkGeneratorComponent } from './pages/link-generator/link-generator.component';
import { LinkGeneratorFormComponent } from './components/link-generator-form/link-generator-form.component';
import { TableActivateBusinessComponent } from './components/table-activate-business/table-activate-business.component';
import { BussinessAdminComponent } from './pages/bussiness-admin/bussiness-admin.component';
import { DialogCategoryComponent } from './components/dialog-category/dialog-category.component';
import { NewsAdminComponent } from './pages/news-admin/news-admin.component';
import { CommissionsComponent } from './pages/commissions/commissions.component';
import { ContentLibraryComponent } from './pages/content-library/content-library.component';
import { StoriesAdminComponent } from './pages/stories-admin/stories-admin.component';
import { DialogVideoPlayerComponent } from './components/dialog-video-player/dialog-video-player.component';
import { DialogCommissionComponent } from './pages/dialog-commission/dialog-commission.component';
import { LegalesComponent } from './pages/legales/legales.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BlogAdminComponent } from './pages/blog-admin/blog-admin.component';
import { AddEditBlogAdminComponent } from './pages/add-edit-blog-admin/add-edit-blog-admin.component';
import { EditBlogAdminComponent } from './pages/edit-blog-admin/edit-blog-admin.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ConfigurationsComponent } from './pages/configurations/configurations.component';
import { InformationBussinessComponent } from './pages/information-bussiness/information-bussiness.component';
import { ManageComisionBussinessComponent } from './pages/manage-comision-bussiness/manage-comision-bussiness.component';
import { ToolsAdminComponent } from './pages/tools-admin/tools-admin.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { NavigationFooterComponent } from './components/navigation-footer/navigation-footer.component';
import { NavigationGroupComponent } from './components/navigation-group/navigation-group.component';
import { NavigationItemComponent } from './components/navigation-item/navigation-item.component';
import { DialogNavigationGroupComponent } from './components/dialog-navigation-group/dialog-navigation-group.component';
import { DialogNavigationItemComponent } from './components/dialog-navigation-item/dialog-navigation-item.component';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';
import { NavigationMenuClickerComponent } from './components/navigation-menu-clicker/navigation-menu-clicker.component';
import { DialogFilterUsersComponent } from './pages/users/dialog-filter-users/dialog-filter-users.component';
import { DialogFilterNoveltiesComponent } from './pages/news-admin/dialog-filter-novelties/dialog-filter-novelties.component';
import { HelpCenterComponent } from './pages/help-center/help-center.component';
import { HelpCenterGroupComponent } from './components/help-center-group/help-center-group.component';
import { FaqGroupComponent } from './components/faq-group/faq-group.component';
import { FaqItemComponent } from './components/faq-item/faq-item.component';
import { DialogFaqGroupComponent } from './components/dialog-faq-group/dialog-faq-group.component';
import { DialogFaqItemComponent } from './components/dialog-faq-item/dialog-faq-item.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { CardNotificationComponent } from './components/card-notification/card-notification.component';
import { NotificationDetailComponent } from './pages/notification-detail/notification-detail.component';
import { DialogDeleteNotificationComponent } from './components/dialog-delete-notification/dialog-delete-notification.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TableNoveltiesComponent } from './components/table-novelties/table-novelties.component';
import { StoriesComponent } from './pages/stories/stories.component';
import { CardAdminStoryComponent } from './components/card-admin-story/card-admin-story.component';
import { DialogStoryComponent } from './components/dialog-story/dialog-story.component';
import { DatailNewsComponent } from './pages/datail-news/datail-news.component';
import { NoveltyChatComponent } from './components/novelty-chat/novelty-chat.component';
import { TableOnboardingComponent } from './components/table-onboarding/table-onboarding.component';
import { DialogOnboardingComponent } from './components/dialog-onboarding/dialog-onboarding.component';
import { DetailUserComponent } from './pages/users/detail-user/detail-user.component';
import { PersonalInfoComponent } from './components/user-detail/personal-info/personal-info.component';
import { DownloadDocumentsComponent } from './components/user-detail/download-documents/download-documents.component';
import { CvComponent } from './components/user-detail/cv/cv.component';
import { InfoUserComponent } from './components/user-detail/info-user/info-user.component';
import { BankAccountComponent } from './components/user-detail/bank-account/bank-account.component';
import { UserComponent } from './components/user-detail/user/user.component';
import { VerificationComponent } from './components/user-detail/verification/verification.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HistoryPaymentComponent } from './components/user-detail/history-payment/history-payment.component';
import { TableTestimonyComponent } from './components/table-testimony/table-testimony.component';
import { FormTestimonyComponent } from './components/form-testimony/form-testimony.component';
import { FormBusinessComponent } from './components/form-business/form-business.component';
import { PartnersComponent } from './pages/partners/partners.component';
import { PartnerListComponent } from './components/partner-list/partner-list.component';
import { FormPartnerComponent } from './components/form-partner/form-partner.component';
import { TableCarruselComponent } from './components/table-carrusel/table-carrusel.component';
import { CampaingsComponent } from './components/campaings/campaings.component';
import { FormCampaignComponent } from './components/form-campaign/form-campaign.component';
import { DownloadCenterComponent } from './pages/download-center/download-center.component';
import { ControlComponent } from './pages/control/control.component';
import { CatologueComponent } from './pages/catologue/catologue.component';
import { CatologueCardComponent } from './components/catologue-card/catologue-card.component';
import { CatologueFormComponent } from './components/catologue-form/catologue-form.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'ADMIN',
      superRole: 'SUPERADMIN',
    },
  },
  {
    path: 'reportes-admin',
    component: ReportsComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'ADMIN',
      superRole: 'SUPERADMIN',
    },
  },
  {
    path: 'usuarios',
    component: UsersComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'ADMIN',
      superRole: 'SUPERADMIN',
    },
  },
  {
    path: 'usuario/:id',
    component: DetailUserComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'ADMIN',
      superRole: 'SUPERADMIN',
    },
  },
  {
    path: 'auditoria',
    component: AuditComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'ADMIN',
      superRole: 'SUPERADMIN',
    },
  },
  {
    path: 'negocios-admin',
    component: BusinessComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'ADMIN',
      superRole: 'SUPERADMIN',
    },
  },
  {
    path: 'referidos-admin',
    component: RefersComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'ADMIN',
      superRole: 'SUPERADMIN',
    },
  },
  {
    path: 'generador-links',
    component: LinkGeneratorComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'ADMIN',
      superRole: 'SUPERADMIN',
    },
  },
  {
    path: 'novedades',
    component: NewsAdminComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'ADMIN',
      superRole: 'SUPERADMIN',
    },
  },
  {
    path: 'comisiones',
    component: CommissionsComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'ADMIN',
      superRole: 'SUPERADMIN',
    },
  },
  {
    path: 'bussiness-admin',
    component: BussinessAdminComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'ADMIN',
      superRole: 'SUPERADMIN',
    },
  },
  {
    path: 'manage-comision-admin',
    component: ManageComisionBussinessComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'ADMIN',
      superRole: 'SUPERADMIN',
    },
  },
  {
    path: 'carrousel-admin',
    component: ToolsAdminComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'ADMIN',
      superRole: 'SUPERADMIN',
    },
  },
  {
    path: 'information-bussiness-admin',
    component: InformationBussinessComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'ADMIN',
      superRole: 'SUPERADMIN',
    },
  },
  {
    path: 'content-admin',
    component: ContentLibraryComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'ADMIN',
      superRole: 'SUPERADMIN',
    },
  },
  {
    path: 'stories-admin',
    component: StoriesAdminComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'ADMIN',
      superRole: 'SUPERADMIN',
    },
  },
  {
    path: 'comision-admin',
    component: DialogCommissionComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'ADMIN',
      superRole: 'SUPERADMIN',
    },
  },
  {
    path: 'legales',
    component: LegalesComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'ADMIN',
      superRole: 'SUPERADMIN',
    },
  },
  {
    path: 'blog-admin',
    component: BlogAdminComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'ADMIN',
      superRole: 'SUPERADMIN',
    },
  },
  {
    path: 'add-edit-blog-admin',
    component: AddEditBlogAdminComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'ADMIN',
      superRole: 'SUPERADMIN',
    },
  },
  {
    path: 'edit-blog-admin',
    component: EditBlogAdminComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'ADMIN',
      superRole: 'SUPERADMIN',
    },
  },
  {
    path: 'configuracion',
    component: ConfigurationsComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'ADMIN',
      superRole: 'SUPERADMIN',
    },
  },
  {
    path: 'navegacion',
    component: NavigationComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'ADMIN',
      superRole: 'SUPERADMIN',
    },
  },
  {
    path: 'centro-de-ayuda-admin',
    component: HelpCenterComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'ADMIN',
      superRole: 'SUPERADMIN',
    },
  },
  {
    path: 'notificaciones-admin',
    component: NotificationsComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'ADMIN',
      superRole: 'SUPERADMIN',
    },
  },
  {
    path: 'notificacion/:id',
    component: NotificationDetailComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'ADMIN',
      superRole: 'SUPERADMIN',
    },
  },
  {
    path: 'notificacion',
    component: NotificationDetailComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'ADMIN',
      superRole: 'SUPERADMIN',
    },
  },
  {
    path: 'partners',
    component: PartnersComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'ADMIN',
      superRole: 'SUPERADMIN',
    },
  },
  {
    path: 'novedad/:id/:userId',
    component: DatailNewsComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'ADMIN',
      superRole: 'SUPERADMIN',
    },
  },
  {
    path: 'centro-de-descargas',
    component: DownloadCenterComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'ADMIN',
      superRole: 'SUPERADMIN',
    },
  },
  {
    path: 'control',
    component: ControlComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'ADMIN',
      superRole: 'SUPERADMIN',
    },
  },
  {
    path: 'catalogo-admin',
    component: CatologueComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'ADMIN',
      superRole: 'SUPERADMIN',
    },
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    EditBlogAdminComponent,
    SideMenuComponent,
    NoveltyChatComponent,
    ReportsComponent,
    CardComponent,
    PopupCardComponent,
    LoadFormFileComponent,
    UsersComponent,
    TableUsersComponent,
    SearchUsersComponent,
    KeySpaceDirectiveAdmin,
    AuditComponent,
    BusinessComponent,
    RefersComponent,
    ResumeComponent,
    CardDashboardComponent,
    TableBussinessComponent,
    LinkGeneratorComponent,
    LinkGeneratorFormComponent,
    TableActivateBusinessComponent,
    BussinessAdminComponent,
    DialogCategoryComponent,
    NewsAdminComponent,
    CommissionsComponent,
    ContentLibraryComponent,
    StoriesAdminComponent,
    DialogVideoPlayerComponent,
    DialogCommissionComponent,
    LegalesComponent,
    BlogAdminComponent,
    AddEditBlogAdminComponent,
    ConfigurationsComponent,
    InformationBussinessComponent,
    ManageComisionBussinessComponent,
    ToolsAdminComponent,
    NavigationComponent,
    NavigationFooterComponent,
    NavigationGroupComponent,
    NavigationItemComponent,
    DialogNavigationGroupComponent,
    DialogNavigationItemComponent,
    NavigationMenuComponent,
    NavigationMenuClickerComponent,
    DialogFilterUsersComponent,
    DialogFilterNoveltiesComponent,
    HelpCenterComponent,
    HelpCenterGroupComponent,
    FaqGroupComponent,
    FaqItemComponent,
    DialogFaqGroupComponent,
    DialogFaqItemComponent,
    NotificationsComponent,
    CardNotificationComponent,
    NotificationDetailComponent,
    DialogDeleteNotificationComponent,
    TableNoveltiesComponent,
    StoriesComponent,
    CardAdminStoryComponent,
    DialogStoryComponent,
    DatailNewsComponent,
    TableOnboardingComponent,
    DialogOnboardingComponent,
    DetailUserComponent,
    PersonalInfoComponent,
    DownloadDocumentsComponent,
    CvComponent,
    InfoUserComponent,
    BankAccountComponent,
    UserComponent,
    VerificationComponent,
    HistoryPaymentComponent,
    TableTestimonyComponent,
    FormTestimonyComponent,
    FormBusinessComponent,
    PartnersComponent,
    PartnerListComponent,
    FormPartnerComponent,
    TableCarruselComponent,
    CampaingsComponent,
    FormCampaignComponent,
    DownloadCenterComponent,
    ControlComponent,
    CatologueComponent,
    CatologueCardComponent,
    CatologueFormComponent,
  ],
  imports: [
    AngularEditorModule,
    CommonModule,
    NgxMaterialTimepickerModule,
    DragDropModule,
    RouterModule.forChild(routes),
    SharedModule,
    TranslateModule,
    AppMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatPasswordStrengthModule,
    NgxPaginationModule,
    NgxDaterangepickerMd.forRoot(),
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 60,
      space: -10,
      unitsFontSize: '14',
      unitsFontWeight: '500',
      outerStrokeGradient: true,
      outerStrokeWidth: 10,
      outerStrokeColor: '#ff6f11',
      outerStrokeGradientStopColor: '#ff6f11',
      innerStrokeColor: '#e7e8ea',
      innerStrokeWidth: 10,
      titleFontWeight: '500',
      titleColor: '#86888a',
      unitsColor: '#86888a',
      subtitleFontSize: '16',
      subtitleFontWeight: '700',
      animateTitle: false,
      animationDuration: 1000,
      showTitle: true,
      showSubtitle: false,
      showUnits: true,
      showBackground: false,
      clockwise: false,
      startFromZero: false,
      responsive: true,
    }),
  ],
  exports: [SideMenuComponent, RouterModule],
  entryComponents: [
    DialogCategoryComponent,
    DialogVideoPlayerComponent,
    DialogNavigationGroupComponent,
    DialogNavigationItemComponent,
    DialogFaqGroupComponent,
    DialogFaqItemComponent,
    DialogDeleteNotificationComponent,
    DialogStoryComponent,
    DialogOnboardingComponent,
    FormTestimonyComponent,
    FormPartnerComponent,
    FormCampaignComponent,
    CatologueFormComponent
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: UsersComponent },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
  ],
})
export class AdminModule {}
