import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home.component';
import { Routes, RouterModule } from '@angular/router';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductComponent } from './components/product/product.component';
import { TranslateModule } from '@ngx-translate/core';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { ShareButtonsModule } from '@ngx-share/buttons';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [HomeComponent, ProductComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
    TranslateModule,
    FormsModule,
    ShareButtonsModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [DialogComponent]
})
export class HomeModule { }
