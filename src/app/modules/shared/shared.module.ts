import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchComponent } from "./components/search/search.component";
import { AppMaterialModule } from "./app-material/app-material.module";
import { TranslateModule } from "@ngx-translate/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { DialogComponent } from "./components/dialog/dialog.component";
import { FooterComponent } from "./components/footer/footer.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HeaderComponent } from './components/header/header.component';
import { MatListModule, MatRippleModule, MatMenuModule } from '@angular/material';
import { SociallinksComponent } from './components/sociallinks/sociallinks.component';
import { TopComponent } from './components/top/top.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { RouterModule } from '@angular/router';
import { MenuOptionsComponent } from './components/menu-options/menu-options.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';
import { AppStoreComponent } from './components/app-store/app-store.component';
import { LogoComponent } from './components/logo/logo.component';
import { ProductComponent } from './components/product/product.component';
import { ProductBussinessComponent } from './components/product-bussiness/product-bussiness.component';
import { BackNavigationComponent } from './components/back-navigation/back-navigation.component';
import { ModalGenericComponent } from './components/modal-generic/modal-generic.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { BannerComponent } from './components/banner/banner.component';
import { TrimPipe } from 'src/app/pipes/trim.pipe';


@NgModule({
  declarations: [
    SearchComponent,
    NotFoundComponent,
    LoaderComponent,
    DialogComponent,
    FooterComponent,
    HeaderComponent,
    SociallinksComponent,
    TopComponent,
    MenuOptionsComponent,
    UnderConstructionComponent,
    TruncatePipe,
    TrimPipe,
    AppStoreComponent,
    LogoComponent,
    ProductComponent,
    ProductBussinessComponent,
    BackNavigationComponent,
    ModalGenericComponent,
    BannerComponent,
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatListModule,
    MatRippleModule,
    MatMenuModule,
    GoogleChartsModule,
    RouterModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule
  ],
  exports: [
    SearchComponent,
    NotFoundComponent,
    LoaderComponent,
    FooterComponent,
    HeaderComponent,
    MatListModule,
    MatRippleModule,
    SociallinksComponent,
    MatMenuModule,
    TopComponent,
    GoogleChartsModule,
    RouterModule,
    MenuOptionsComponent,
    UnderConstructionComponent,
    TruncatePipe,
    TrimPipe,
    LogoComponent,
    ProductComponent,
    ProductBussinessComponent,
    BackNavigationComponent,
    BannerComponent
  ],
  entryComponents: [
    ModalGenericComponent
  ]
})
export class SharedModule { }
