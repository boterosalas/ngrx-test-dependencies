import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login.component';
import { LoginformComponent } from './components/loginform/loginform.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RegisterformComponent } from './components/registerform/registerform.component';


@NgModule({
  declarations: [LoginComponent, LoginformComponent, RegisterformComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    TranslateModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent
      }
    ])
  ]
})
export class LoginModule { }
