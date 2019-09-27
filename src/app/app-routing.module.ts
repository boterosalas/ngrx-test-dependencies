import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {
    path: '',  loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'registro',  loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'olvido-contrasena',  loadChildren: () => import('./modules/forgotpassword/forgotpassword.module').then(m => m.ForgotpasswordModule)
  },
  {
    path: 'recuperar-contrasena/:id',  loadChildren: () => import('./modules/recoverpassword/recoverpassword.module').then(m => m.RecoverpasswordModule)
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
