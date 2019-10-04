import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {
    path: '',  loadChildren: () => import('./modules/anonymous/anonymous.module').then(m => m.AnonymousModule),
  },
  {
    path: 'inicio',  loadChildren: () => import('./modules/clicker/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard]
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
