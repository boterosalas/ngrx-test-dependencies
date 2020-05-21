import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { AppMaterialModule } from "../shared/app-material/app-material.module";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { DialogComponent } from "../shared/components/dialog/dialog.component";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MonthResumeComponent } from "./components/month-resume/month-resume.component";
import { GeneralResumeComponent } from "./components/general-resume/general-resume.component";
import { ReportComponent } from "./components/report/report.component";
import { AuthGuard } from "src/app/auth.guard";
import { MatPaginatorIntl } from "@angular/material";
import { ProfileComponent } from "./pages/profile/profile.component";
import { ProfileFormComponent } from "./components/profile-form/profile-form.component";
import { TableHistorialComponent } from "./components/table-historial/table-historial.component";
import { AditionalFilesComponent } from "./components/aditional-files/aditional-files.component";
import { DragScrollModule } from "ngx-drag-scroll";
import { AditionalInfoFormComponent } from "./components/aditional-info-form/aditional-info-form.component";
import { DialogEditComponent } from "./components/dialog-edit/dialog-edit.component";
import { MatPasswordStrengthModule } from "@angular-material-extensions/password-strength";
import { CardDataComponent } from './components/card-data/card-data.component';
import { DialogHistoryComponent } from './components/dialog-history/dialog-history.component';
import { ShareModule } from '@ngx-share/core';
import { BussinessComponent } from './pages/profile/bussiness/bussiness.component';
import { PaymentInfoComponent } from './components/payment-info/payment-info.component';
import { SliderDeliverComponent } from './components/slider-deliver/slider-deliver.component';
import { LinksHistorialComponent } from './pages/profile/links-historial/links-historial.component';
import { TableHistoricalLinksComponent } from './components/table-historical-links/table-historical-links.component';
import { TableDetailComissionComponent } from './components/table-detail-comission/table-detail-comission.component';
import { ReferComponent } from './pages/profile/refer/refer.component';
import { ReferEmailComponent } from './components/refer-email/refer-email.component';
import { ReferShareComponent } from './components/refer-share/refer-share.component';
import { TableReferComponent } from './components/table-refer/table-refer.component';
import { JoyrideModule } from 'ngx-joyride';

const routes: Routes = [
 
  {
    path: "mi-perfil/:pagos",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "mi-perfil",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "reportes",
    component: ReportComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "bussiness",
    component: BussinessComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "historial-links",
    component: LinksHistorialComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "referidos",
    component: ReferComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    MonthResumeComponent,
    GeneralResumeComponent,
    ReportComponent,
    ProfileComponent,
    ProfileFormComponent,
    TableHistorialComponent,
    AditionalFilesComponent,
    AditionalInfoFormComponent,
    DialogEditComponent,
    CardDataComponent,
    DialogHistoryComponent,
    BussinessComponent,
    PaymentInfoComponent,
    SliderDeliverComponent,
    LinksHistorialComponent,
    TableHistoricalLinksComponent,
    TableDetailComissionComponent,
    ReferComponent,
    ReferEmailComponent,
    ReferShareComponent,
    TableReferComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    SharedModule,
    SlickCarouselModule,
    ReactiveFormsModule,
    TranslateModule,
    FlexLayoutModule,
    FormsModule,
    ShareModule,
    DragScrollModule,
    MatPasswordStrengthModule,
    RouterModule.forChild(routes),
    JoyrideModule.forChild()
  ],
  entryComponents: [DialogComponent, DialogEditComponent, DialogHistoryComponent]
})
export class ClickerModule {}
