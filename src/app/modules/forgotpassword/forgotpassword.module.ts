import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotpasswordformComponent } from './components/forgotpasswordform/forgotpasswordform.component';
import { ForgotpasswordComponent } from './pages/forgotpassword.component';
import { Routes, RouterModule } from '@angular/router';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ForgotpasswordComponent
  }
];

@NgModule({
  declarations: [ForgotpasswordformComponent, ForgotpasswordComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ForgotpasswordModule { }
