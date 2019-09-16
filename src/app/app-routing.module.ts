import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const routes: Routes = [
  {
    path: 'login',  loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'registro',  loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule)
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
