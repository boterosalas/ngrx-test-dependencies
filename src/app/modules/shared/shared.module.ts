import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchComponent } from "./components/search/search.component";
import { AppMaterialModule } from "./app-material/app-material.module";
import { TranslateModule } from "@ngx-translate/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { PopupComponent } from "./components/popup/popup.component";
import { DialogComponent } from "./components/dialog/dialog.component";
import { FooterComponent } from "./components/footer/footer.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HeaderComponent } from './components/header/header.component';
import { SociallinksComponent } from './components/sociallinks/sociallinks.component';
import { TopComponent } from './components/top/top.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { RouterModule } from '@angular/router';
import { MenuOptionsComponent } from './components/menu-options/menu-options.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';
import { AppStoreComponent } from './components/app-store/app-store.component';
import { LogoComponent } from './components/logo/logo.component';
import { DialogStoriesComponent } from './components/dialog-stories/dialog-stories.component';
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
import { SlickCarouselModule } from "ngx-slick-carousel";
import { RemoveTagsPipe } from "src/app/pipes/remove-tags.pipe";
import { MatRippleModule } from "@angular/material/core";
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import { CardStoryComponent } from './components/card-story/card-story.component';
import { OnboardingSwiperComponent } from './components/onboarding-swiper/onboarding-swiper.component';
import { SafePipe } from "src/app/pipes/safe,pipe";
import { BackButtonComponent } from './components/atoms/back-button/back-button.component';

@NgModule({
  declarations: [
    SearchComponent,
    NotFoundComponent,
    LoaderComponent,
    PopupComponent,
    DialogComponent,
    FooterComponent,
    HeaderComponent,
    SociallinksComponent,
    TopComponent,
    MenuOptionsComponent,
    UnderConstructionComponent,
    TruncatePipe,
    TrimPipe,
    RemoveTagsPipe,
    SafePipe,
    AppStoreComponent,
    LogoComponent,
    ProductComponent,
    ProductBussinessComponent,
    BackNavigationComponent,
    ModalGenericComponent,
    BannerComponent,
    DialogStoriesComponent,
    CardStoryComponent,
    OnboardingSwiperComponent,
    BackButtonComponent,
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
    MatIconModule,
    SlickCarouselModule,
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
    SafePipe,
    RemoveTagsPipe,
    LogoComponent,
    ProductComponent,
    ProductBussinessComponent,
    BackNavigationComponent,
    BannerComponent,
    DialogStoriesComponent,
    CardStoryComponent,
    OnboardingSwiperComponent,
    BackButtonComponent
  ],
  entryComponents: [ModalGenericComponent, PopupComponent, DialogStoriesComponent, OnboardingSwiperComponent],
})
export class SharedModule {}
