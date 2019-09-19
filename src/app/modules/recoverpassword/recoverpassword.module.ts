import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecoverpasswordformComponent } from './components/recoverpasswordform/recoverpasswordform.component';
import { RecoverpasswordComponent } from './pages/recoverpassword.component';
import { Routes, RouterModule } from '@angular/router';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: RecoverpasswordComponent
  }
];

@NgModule({
  declarations: [RecoverpasswordformComponent, RecoverpasswordComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class RecoverpasswordModule { }
