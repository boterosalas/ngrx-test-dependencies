import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PopupComponent } from './components/popup/popup.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { FooterComponent } from './components/footer/footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
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
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RemoveTagsPipe } from 'src/app/pipes/remove-tags.pipe';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { CardStoryComponent } from './components/card-story/card-story.component';
import { OnboardingSwiperComponent } from './components/onboarding-swiper/onboarding-swiper.component';
import { SafePipe } from 'src/app/pipes/safe,pipe';
import { BackButtonComponent } from './components/atoms/back-button/back-button.component';
import { DateRangeComponent } from './components/atoms/date-range/date-range.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ButtonComponent } from './components/atoms/button/button.component';
import { DateRangeButtonComponent } from './components/molecules/date-range-button/date-range-button.component';
import { CardDataComponent } from './components/card-data/card-data.component';
import { TableHistorialComponent } from './components/table-historial/table-historial.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CardDataTotalComponent } from './components/card-data-total/card-data-total.component';
import { TableDetailComissionComponent } from './components/table-detail-comission/table-detail-comission.component';
import { ImageComponent } from './components/atoms/image/image.component';
import { SliderComponent } from './components/atoms/slider/slider.component';
import { SliderComponent as SliderShare } from '../anonymous/components/slider/slider.component';
import { ImageTextComponent } from './components/molecules/image-text/image-text.component';
import { TitleComponent } from './components/atoms/title/title.component';
import { CardComponent } from './components/atoms/card/card.component';
import { BussinessCardComponent } from '../anonymous/components/bussiness-card/bussiness-card.component';
import { ButtonStoryComponent } from '../anonymous/components/button-story/button-story.component';
import { ShareButtonModule } from 'ngx-sharebuttons/button';
import { ReviewClickamComponent } from './components/review-clickam/review-clickam.component';
import { WidgetBarComponent } from './components/widget-bar/widget-bar.component';
import { WelcomeComponent } from '../anonymous/components/welcome/welcome.component';
import { NewBusinessFormComponent } from '../anonymous/components/new-business-form/new-business-form.component';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { SavingComponent } from './components/saving/saving.component';
import { ReferWinComponent } from './components/refer-win/refer-win.component';
import { BusinessListComponent } from './components/business-list/business-list.component';
import { QrComponent } from './components/qr/qr.component';
import { BannerPrincipalComponent } from './components/banner-principal/banner-principal.component';
import { ModalReferirComprarComponent } from './components/modal-referir-comprar/modal-referir-comprar.component';
import { SocialNetworksLoginButtonsComponent } from './components/social-networks-login-buttons/social-networks-login-buttons.component';
import { DocumentTypeAndNumberComponent } from './components/document-type-and-number/document-type-and-number.component';
import { TermsAndConditionsModalComponent } from './components/terms-and-conditions-modal/terms-and-conditions-modal.component';
import { InputFileComponent } from './components/input-file/input-file.component';
import { CodigoConfirmacionComponent } from './components/codigo-confirmacion/codigo-confirmacion.component';

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
    DateRangeComponent,
    ButtonComponent,
    DateRangeButtonComponent,
    CardDataComponent,
    CardDataTotalComponent,
    TableHistorialComponent,
    TableDetailComissionComponent,
    ImageComponent,
    SliderComponent,
    SliderShare,
    ImageTextComponent,
    TitleComponent,
    CardComponent,
    BussinessCardComponent,
    ButtonStoryComponent,
    ReviewClickamComponent,
    WidgetBarComponent,
    WelcomeComponent,
    NewBusinessFormComponent,
    SavingComponent,
    ReferWinComponent,
    BusinessListComponent,
    QrComponent,
    BannerPrincipalComponent,
    ModalReferirComprarComponent,
    SocialNetworksLoginButtonsComponent,
    DocumentTypeAndNumberComponent,
    TermsAndConditionsModalComponent,
    InputFileComponent,
    CodigoConfirmacionComponent,
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
    NgxPaginationModule,
    NgxDaterangepickerMd.forRoot(),
    ShareButtonModule,
    RecaptchaFormsModule,
    RecaptchaModule,
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
    BackButtonComponent,
    DateRangeComponent,
    ButtonComponent,
    DateRangeButtonComponent,
    CardDataComponent,
    CardDataTotalComponent,
    TableHistorialComponent,
    TableDetailComissionComponent,
    ImageComponent,
    SliderComponent,
    SliderShare,
    ImageTextComponent,
    TitleComponent,
    CardComponent,
    BussinessCardComponent,
    ButtonStoryComponent,
    ReviewClickamComponent,
    WidgetBarComponent,
    WelcomeComponent,
    NewBusinessFormComponent,
    SavingComponent,
    BusinessListComponent,
    QrComponent,
    BannerPrincipalComponent,
    ModalReferirComprarComponent,
    SocialNetworksLoginButtonsComponent,
    DocumentTypeAndNumberComponent,
    TermsAndConditionsModalComponent,
    InputFileComponent,
    CodigoConfirmacionComponent,
  ],
})
export class SharedModule {}
