import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShareButtonModule } from '@ngx-share/button';
import { RouterModule, Routes } from '@angular/router';
import { UrlComponent } from '../anonymous/pages/url/url.component';

const routes: Routes = [
  {
    path: 'url/:shortCode',
    component: UrlComponent,
  },
]

@NgModule({
  declarations: [
    UrlComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FlexLayoutModule,
    ShareButtonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class UrlModule { }
