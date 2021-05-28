import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { Routes, RouterModule } from "@angular/router";
import { RoleGuard } from "src/app/role.guard";
import { SideMenuComponent } from "./components/side-menu/side-menu.component";
import { SharedModule } from "../shared/shared.module";
import { ReportsComponent } from "./pages/reports/reports.component";
import { TranslateModule } from "@ngx-translate/core";
import { CardComponent } from "./components/card/card.component";
import { AppMaterialModule } from "../shared/app-material/app-material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoadFormFileComponent } from "./components/load-form-file/load-form-file.component";
import { UsersComponent } from "./pages/users/users.component";
import { TableUsersComponent } from "./components/table-users/table-users.component";
import { SearchUsersComponent } from "./components/search-users/search-users.component";
import { DialogUserComponent } from "./components/dialog-user/dialog-user.component";
import { MatPaginatorIntl } from "@angular/material";
import { KeySpaceDirectiveAdmin } from "src/directives/space.admin.directive";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgCircleProgressModule } from "ng-circle-progress";

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
import { NewsAdminComponent } from './pages/news-admin/news-admin.component'
import { CommissionsComponent } from './pages/commissions/commissions.component'
import { DialogNewsComponent } from './components/dialog-news/dialog-news.component'
import { ContentLibraryComponent } from './pages/content-library/content-library.component'
import { StoriesAdminComponent } from './pages/stories-admin/stories-admin.component'
import { DialogVideoPlayerComponent } from './components/dialog-video-player/dialog-video-player.component';
import { DialogCommissionComponent } from './pages/dialog-commission/dialog-commission.component';
import { LegalesComponent } from './pages/legales/legales.component'
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BlogAdminComponent } from './pages/blog-admin/blog-admin.component';
import { AddEditBlogAdminComponent } from './pages/add-edit-blog-admin/add-edit-blog-admin.component';
import { EditBlogAdminComponent } from './pages/edit-blog-admin/edit-blog-admin.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ConfigurationsComponent } from './pages/configurations/configurations.component';
import { InformationBussinessComponent } from './pages/information-bussiness/information-bussiness.component';
import { ManageComisionBussinessComponent } from './pages/manage-comision-bussiness/manage-comision-bussiness.component';
import { CarrouselAdminComponent } from './pages/carrousel-admin/carrousel-admin.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { MatPasswordStrengthModule } from "@angular-material-extensions/password-strength";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    canActivate: [RoleGuard],
    data: {
      role: "ADMIN",
      superRole: "SUPERADMIN"
    }
  },
  {
    path: "reportes-admin",
    component: ReportsComponent,
    canActivate: [RoleGuard],
    data: {
      role: "ADMIN",
      superRole: "SUPERADMIN"
    }

  },
  {
    path: "usuarios",
    component: UsersComponent,
    canActivate: [RoleGuard],
    data: {
      role: "ADMIN",
      superRole: "SUPERADMIN"
    }
  },
  {
    path: "auditoria",
    component: AuditComponent,
    canActivate: [RoleGuard],
    data: {
      role: "ADMIN",
      superRole: "SUPERADMIN"
    },
  },
  {
    path: "negocios-admin",
    component: BusinessComponent,
    canActivate: [RoleGuard],
    data: {
      role: "ADMIN",
      superRole: "SUPERADMIN"
    },
  },
  {
    path: "referidos-admin",
    component: RefersComponent,
    canActivate: [RoleGuard],
    data: {
      role: "ADMIN",
      superRole: "SUPERADMIN"
    },
  },
  {
    path: "generador-links",
    component: LinkGeneratorComponent,
    canActivate: [RoleGuard],
    data: {
      role: "ADMIN",
      superRole: "SUPERADMIN"
    },
  },
  {
    path: "novedades",
    component: NewsAdminComponent,
    canActivate: [RoleGuard],
    data: {
      role: "ADMIN",
      superRole: "SUPERADMIN"
    },
  },
  {
    path: "comisiones",
    component: CommissionsComponent,
    canActivate: [RoleGuard],
    data: {
      role: "ADMIN",
      superRole: "SUPERADMIN"
    },
  },
  {
    path: "bussiness-admin",
    component: BussinessAdminComponent,
    canActivate: [RoleGuard],
    data: {
      role: "ADMIN",
      superRole: "SUPERADMIN"
    },
  },
  {
    path: "manage-comision-admin",
    component: ManageComisionBussinessComponent,
    canActivate: [RoleGuard],
    data: {
      role: "ADMIN",
      superRole: "SUPERADMIN"
    },
  },
  {
    path: "carrousel-admin",
    component: CarrouselAdminComponent,
    canActivate: [RoleGuard],
    data: {
      role: "ADMIN",
      superRole: "SUPERADMIN"
    },
  },
  {
    path: "information-bussiness-admin",
    component: InformationBussinessComponent,
    canActivate: [RoleGuard],
    data: {
      role: "ADMIN",
      superRole: "SUPERADMIN"
    },
  },
  {
    path: "content-admin",
    component: ContentLibraryComponent,
    canActivate: [RoleGuard],
    data: {
      role: "ADMIN",
      superRole: "SUPERADMIN"
    },
  },
  {
    path: "stories-admin",
    component: StoriesAdminComponent,
    canActivate: [RoleGuard],
    data: {
      role: "ADMIN",
      superRole: "SUPERADMIN"
    },
  },
  {
    path: "comision-admin",
    component: DialogCommissionComponent,
    canActivate: [RoleGuard],
    data: {
      role: "ADMIN",
      superRole: "SUPERADMIN"
    },
  },
  {
    path: "legales",
    component: LegalesComponent,
    canActivate: [RoleGuard],
    data: {
      role: "ADMIN",
      superRole: "SUPERADMIN"
    },
  },
  {
    path: "blog-admin",
    component: BlogAdminComponent,
    canActivate: [RoleGuard],
    data: {
      role: "ADMIN",
      superRole: "SUPERADMIN"
    },
  },
  {
    path: "add-edit-blog-admin",
    component: AddEditBlogAdminComponent,
    canActivate: [RoleGuard],
    data: {
      role: "ADMIN",
      superRole: "SUPERADMIN"
    },
  },
  {
    path: "edit-blog-admin",
    component: EditBlogAdminComponent,
    canActivate: [RoleGuard],
    data: {
      role: "ADMIN",
      superRole: "SUPERADMIN"
    },
  },
  {
    path: "configuracion",
    component: ConfigurationsComponent,
    canActivate: [RoleGuard],
    data: {
      role: "ADMIN",
      superRole: "SUPERADMIN"
    },
  },
  {
    path: "navegacion",
    component: NavigationComponent,
    canActivate: [RoleGuard],
    data: {
      role: "ADMIN",
      superRole: "SUPERADMIN"
    },
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    EditBlogAdminComponent,
    SideMenuComponent,
    ReportsComponent,
    CardComponent,
    LoadFormFileComponent,
    UsersComponent,
    TableUsersComponent,
    SearchUsersComponent,
    DialogUserComponent,
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
    DialogNewsComponent,
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
    CarrouselAdminComponent,
    NavigationComponent
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
    NgxDaterangepickerMd.forRoot(),
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 60,
      space: -10,
      unitsFontSize: "14",
      unitsFontWeight: "500",
      outerStrokeGradient: true,
      outerStrokeWidth: 10,
      outerStrokeColor: "#ff6f11",
      outerStrokeGradientStopColor: "#ff6f11",
      innerStrokeColor: "#e7e8ea",
      innerStrokeWidth: 10,
      titleFontWeight: "500",
      titleColor: "#86888a",
      unitsColor: "#86888a",
      subtitleFontSize: "16",
      subtitleFontWeight: "700",
      animateTitle: false,
      animationDuration: 1000,
      showTitle: true,
      showSubtitle: false,
      showUnits: true,
      showBackground: false,
      clockwise: false,
      startFromZero: false,
      responsive: true
    })
  ],
  exports: [SideMenuComponent],
  entryComponents: [DialogUserComponent, DialogCategoryComponent, DialogNewsComponent, DialogVideoPlayerComponent],
  providers: [{ provide: MatPaginatorIntl, useClass: UsersComponent }]
})
export class AdminModule { }
