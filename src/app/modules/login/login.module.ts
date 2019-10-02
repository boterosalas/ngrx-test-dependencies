import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login.component';
import { LoginformComponent } from './components/loginform/loginform.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SectionComponent } from './components/section/section.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { WorksComponent } from './components/works/works.component';
import { SectionbgComponent } from './components/sectionbg/sectionbg.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: '?',
    component: LoginComponent,
  }
];

@NgModule({
  declarations: [LoginComponent, LoginformComponent, SectionComponent, WorksComponent, SectionbgComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    TranslateModule,
    SharedModule,
    CommonModule,
    FlexLayoutModule,
    SlickCarouselModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LoginModule { }
