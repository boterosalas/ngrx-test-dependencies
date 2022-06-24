import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerComponent } from './pages/partner/partner.component';
import { RouterModule, Routes } from '@angular/router';
import { ReportPartnerComponent } from './components/report-partner/report-partner.component';
import { SharedModule } from '../shared/shared.module';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { CardReportComponent } from './components/card-report/card-report.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TopProductsComponent } from './components/top-products/top-products.component';
import { DiscountComponent } from './components/discount/discount.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: PartnerComponent,
  }
]

@NgModule({
  declarations: [
    PartnerComponent,
    ReportPartnerComponent,
    CardReportComponent,
    TopProductsComponent,
    DiscountComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    AppMaterialModule,
    FlexLayoutModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ],
  providers:[]
})
export class PartnersModule { }
