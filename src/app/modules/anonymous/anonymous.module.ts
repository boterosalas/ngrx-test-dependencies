import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { LoginformComponent } from "./components/loginform/loginform.component";
import { AppMaterialModule } from "../shared/app-material/app-material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { RegisterformComponent } from "./components/registerform/registerform.component";
import { ForgotpasswordformComponent } from "./components/forgotpasswordform/forgotpasswordform.component";
import { RecoverpasswordformComponent } from "./components/recoverpasswordform/recoverpasswordform.component";
import { RecoverpasswordComponent } from "./pages/recoverpassword/recoverpassword.component";
import { MenuComponent } from "./components/menu/menu.component";
import { CardComponent } from './components/card/card.component';
import { ClickAcademyComponent } from './pages/click-academy/click-academy.component';
import { FrequentQuestionsComponent } from './pages/frequent-questions/frequent-questions.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { BlockCopyPasteDirective } from 'src/directives/copy.directive';
import { KeySpaceDirective } from 'src/directives/space.directive';
import { CardOfferComponent } from './components/card-offer/card-offer.component';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { SliderComponent } from './components/slider/slider.component';
import { BussinessCardComponent } from './components/bussiness-card/bussiness-card.component';
import { ComissionTableComponent } from './pages/comission-table/comission-table.component';
import { NewBusinessComponent } from './components/new-business/new-business.component';
import { NewBusinessFormComponent } from './components/new-business-form/new-business-form.component';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module, RecaptchaFormsModule, RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { UrlComponent } from './pages/url/url.component';
import { ActivateAccountFormComponent } from './components/activate-account-form/activate-account-form.component';
import { SlideVideoComponent } from './components/slide-video/slide-video.component';
// import { ReportComponent } from '../clicker/components/report/report.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: "inicio",
    component: HomeComponent
  },
  {
    path: "?",
    component: HomeComponent
  },
  {
    path: "recuperar-contrasena/:id",
    component: RecoverpasswordComponent
  },
  {
    path: "click-academy",
    component: ClickAcademyComponent
  },
  {
    path: "click-academy/:video",
    component: ClickAcademyComponent
  },
  {
    path: "preguntas-frecuentes",
    component: FrequentQuestionsComponent
  },
  {
    path: "terminos-y-condiciones",
    component: TermsAndConditionsComponent
  },
  {
    path: "tabla-comisiones",
    component: ComissionTableComponent
  },
  {
    path: "url/:shortCode",
    component: UrlComponent
  }
];

@NgModule({
  declarations: [
    HomeComponent,
    LoginformComponent,
    RegisterformComponent,
    ForgotpasswordformComponent,
    RecoverpasswordComponent,
    RecoverpasswordformComponent,
    MenuComponent,
    CardComponent,
    ClickAcademyComponent,
    FrequentQuestionsComponent,
    TermsAndConditionsComponent,
    BlockCopyPasteDirective,
    KeySpaceDirective,
    CardOfferComponent,
    SliderComponent,
    BussinessCardComponent,
    ComissionTableComponent,
    NewBusinessComponent,
    NewBusinessFormComponent,
    UrlComponent,
    ActivateAccountFormComponent,
    SlideVideoComponent,
    // ReportComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    AppMaterialModule,
    TranslateModule,
    SharedModule,
    CommonModule,
    FlexLayoutModule,
    SlickCarouselModule,
    ShareButtonsModule,
    RouterModule.forChild(routes),
    MatPasswordStrengthModule,
    RecaptchaV3Module
  ],
  exports: [
    RouterModule,
    LoginformComponent,
    RegisterformComponent,
    RecoverpasswordformComponent,
    ForgotpasswordformComponent,
    ActivateAccountFormComponent,
    MenuComponent,
    CardComponent
  ],
    providers: [{
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LfYROwUAAAAAGBQR5PgNXRgLOHvkv2DOSBHerjH',
      } as RecaptchaSettings,
}]}
)
export class AnonymousModule {}
