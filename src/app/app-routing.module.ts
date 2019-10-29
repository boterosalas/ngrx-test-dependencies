import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';


const routes: Routes = [
  {
    path: '',  loadChildren: () => import('./modules/anonymous/anonymous.module').then(m => m.AnonymousModule),
  },
  {
    path: 'clicker',  loadChildren: () => import('./modules/clicker/clicker.module').then(m => m.ClickerModule), canActivate: [AuthGuard, RoleGuard],
    data: {
      role: "CLICKER"
    }
  },
  {
    path: 'dashboard',  loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false, // <-- debugging purposes only
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
