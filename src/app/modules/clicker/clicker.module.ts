import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductComponent } from './components/product/product.component';
import { TranslateModule } from '@ngx-translate/core';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { SliderComponent } from './components/slider/slider.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TabsComponent } from './components/tabs/tabs.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MonthResumeComponent } from './components/month-resume/month-resume.component';
import { GeneralResumeComponent } from './components/general-resume/general-resume.component';
import { ReportComponent } from './components/report/report.component';
import { AuthGuard } from 'src/app/auth.guard';
import { MatPaginatorIntl } from '@angular/material';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { TableHistorialComponent } from './components/table-historial/table-historial.component';
import { AditionalFilesComponent } from './components/aditional-files/aditional-files.component';
import { DragScrollModule } from 'ngx-drag-scroll';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'mi-perfil',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: "reportes",
  //   component: ReportComponent,
  //   canActivate: [AuthGuard]
  // }
];

@NgModule({
  declarations: [HomeComponent, ProductComponent, SliderComponent, TabsComponent, MonthResumeComponent, GeneralResumeComponent, ReportComponent, ProfileComponent, ProfileFormComponent, TableHistorialComponent, AditionalFilesComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    SharedModule,
    SlickCarouselModule,
    ReactiveFormsModule,
    TranslateModule,
    FlexLayoutModule,
    FormsModule,
    ShareButtonsModule,
    DragScrollModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: TabsComponent },
  ],
  entryComponents: [DialogComponent]
})
export class ClickerModule { }
