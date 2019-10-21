import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { Routes, RouterModule } from "@angular/router";
import { RoleGuard } from "src/app/role.guard";
import { AuthGuard } from 'src/app/auth.guard';
import { SideMenuComponent } from './components/side-menu/side-menu.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: {
      role: "ADMIN"
    }
  }
];

@NgModule({
  declarations: [DashboardComponent, SideMenuComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    SideMenuComponent
  ]
})
export class AdminModule {}
