import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login.component';
import { LoginformComponent } from './components/loginform/loginform.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [LoginComponent, LoginformComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    TranslateModule,
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LoginModule { }
