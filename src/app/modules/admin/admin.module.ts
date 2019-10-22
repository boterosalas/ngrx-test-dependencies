import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { Routes, RouterModule } from "@angular/router";
import { RoleGuard } from "src/app/role.guard";
import { AuthGuard } from 'src/app/auth.guard';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { SharedModule } from '../shared/shared.module';
import { ReportsComponent } from './pages/reports/reports.component';
import { TranslateModule } from '@ngx-translate/core';
import { CardComponent } from './components/card/card.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: {
      role: "ADMIN"
    }
  },
  {
    path: "reportes",
    component: ReportsComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: {
      role: "ADMIN"
    }
  }
];

@NgModule({
  declarations: [DashboardComponent, SideMenuComponent, ReportsComponent, CardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    TranslateModule,
    AppMaterialModule,
    FlexLayoutModule
  ],
  exports:[
    SideMenuComponent
  ]
})
export class AdminModule {}
