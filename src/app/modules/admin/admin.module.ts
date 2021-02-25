import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { Routes, RouterModule } from "@angular/router";
import { RoleGuard } from "src/app/role.guard";
import { AuthGuard } from "src/app/auth.guard";
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
// Import ng-circle-progress
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
import { DialogNewsComponent } from './components/dialog-news/dialog-news.component'

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    canActivate: [RoleGuard],
    data: {
      role: "ADMIN"
    }
  },
  {
    path: "reportes-admin",
    component: ReportsComponent,
    canActivate: [RoleGuard],
    data: {
      role: "ADMIN"
    }
  },
  {
    path: "usuarios",
    component: UsersComponent,
    canActivate: [RoleGuard],
    data: {
      role: "ADMIN"
    }
  },
  {
    path: "auditoria",
    component: AuditComponent,
    canActivate: [RoleGuard],
    data: {
      role: "ADMIN"
    },
  },
  {
    path: "negocios-admin",
    component: BusinessComponent,
    canActivate: [RoleGuard],
    data: {
      role: "ADMIN"
    },
  },
  {
    path: "referidos-admin",
    component: RefersComponent,
    canActivate: [RoleGuard],
    data: {
      role: "ADMIN"
    },
  },
  {
    path: "generador-links",
    component: LinkGeneratorComponent,
    canActivate: [RoleGuard],
    data: {
      role: "ADMIN"
    },
  },
  {
    path: "novedades",
    component: NewsAdminComponent,
    canActivate: [RoleGuard],
    data: {
      role: "ADMIN"
    },
  },
  {
    path: "bussiness-admin",
    component: BussinessAdminComponent,
    canActivate: [RoleGuard],
    data: {
      role: "ADMIN"
    },
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
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
    DialogNewsComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    RouterModule.forChild(routes),
    SharedModule,
    TranslateModule,
    AppMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
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
  entryComponents: [DialogUserComponent, DialogCategoryComponent, DialogNewsComponent],
  providers: [{ provide: MatPaginatorIntl, useClass: UsersComponent }]
})
export class AdminModule { }
