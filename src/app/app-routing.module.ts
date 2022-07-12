import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: '',
    loadChildren: () => import('./modules/url/url.module').then((m) => m.UrlModule),
  },
  {
    path: '',
    loadChildren: () => import('./modules/anonymous/anonymous.module').then((m) => m.AnonymousModule),
  },
  {
    path: '',
    loadChildren: () => import('./modules/clicker/clicker.module').then((m) => m.ClickerModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {
      role: 'CLICKER',
    },
  },
  {
    path: 'partner',
    loadChildren: () => import('./modules/partners/partners.module').then((m) => m.PartnersModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {
      role: 'PARTNER',
      role2: 'PARTNER-CASHIER'
    },
  },
  { path: '', loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule)},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    enableTracing: false,
    preloadingStrategy: PreloadAllModules,
    useHash: false,
    scrollPositionRestoration: 'top',
    initialNavigation: 'enabledBlocking'
}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
