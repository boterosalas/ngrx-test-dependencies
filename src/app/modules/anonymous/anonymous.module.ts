import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RecoverpasswordformComponent } from './components/recoverpasswordform/recoverpasswordform.component';
import { RecoverpasswordComponent } from './pages/recoverpassword/recoverpassword.component';
import { ClickAcademyComponent } from './pages/click-academy/click-academy.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { BlockCopyPasteDirective } from 'src/directives/copy.directive';
import { KeySpaceDirective } from 'src/directives/space.directive';
import { CardOfferComponent } from './components/card-offer/card-offer.component';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { ComissionTableComponent } from './pages/comission-table/comission-table.component';
import { NewBusinessComponent } from './components/new-business/new-business.component';
import { NewBusinessFormComponent } from './components/new-business-form/new-business-form.component';
import {
  RECAPTCHA_V3_SITE_KEY,
  RecaptchaV3Module,
  RecaptchaFormsModule,
  RecaptchaModule,
  RECAPTCHA_SETTINGS,
  RecaptchaSettings,
} from 'ng-recaptcha';
import { SlideVideoComponent } from './components/slide-video/slide-video.component';
import { ClickamComponent } from './pages/help-center/about/clickam/clickam.component';
import { RegisterComponent } from './pages/help-center/about/register/register.component';
import { DownloadComponent } from './pages/help-center/about/download/download.component';
import { HowWorksComponent } from './pages/help-center/about/how-works/how-works.component';
import { WinComissionComponent } from './pages/help-center/about/win-comission/win-comission.component';
import { BenefitsComponent } from './pages/help-center/about/benefits/benefits.component';
import { PartnersComponent } from './pages/help-center/about/partners/partners.component';
import { MenuHelpCenterComponent } from './components/menu-help-center/menu-help-center.component';
import { AboutClickamComponent } from './pages/help-center/about/about-clickam/about-clickam.component';
import { CardHelpCenterComponent } from './components/card-help-center/card-help-center.component';
import { ChangeDataProfileComponent } from './pages/help-center/configurations/change-data-profile/change-data-profile.component';
import { ResetPasswordComponent } from './pages/help-center/configurations/reset-password/reset-password.component';
import { ConfigurationAccountComponent } from './pages/help-center/configurations/configuration-account/configuration-account.component';
import { RouteBuyComponent } from './pages/help-center/commissions/route-buy/route-buy.component';
import { CommissionClickamComponent } from './pages/help-center/commissions/commission-clickam/commission-clickam.component';
import { CrossSellComponent } from './pages/help-center/commissions/cross-sell/cross-sell.component';
import { EffectiveBuyComponent } from './pages/help-center/commissions/effective-buy/effective-buy.component';
import { NotCommissionComponent } from './pages/help-center/commissions/not-commission/not-commission.component';
import { PayDateComponent } from './pages/help-center/commissions/pay-date/pay-date.component';
import { PaymentProcessComponent } from './pages/help-center/commissions/payment-process/payment-process.component';
import { LinkHistoryComponent } from './pages/help-center/reports/link-history/link-history.component';
import { ProductsCommissionComponent } from './pages/help-center/reports/products-commission/products-commission.component';
import { ReportClickamComponent } from './pages/help-center/reports/report-clickam/report-clickam.component';
import { WinCommissionComponent } from './pages/help-center/reports/win-commission/win-commission.component';
import { FriendInviteComponent } from './pages/help-center/refer/friend-invite/friend-invite.component';
import { ProgramFriendComponent } from './pages/help-center/refer/program-friend/program-friend.component';
import { ReferFriendComponent } from './pages/help-center/refer/refer-friend/refer-friend.component';
import { WorksReferComponent } from './pages/help-center/refer/works-refer/works-refer.component';
import { BestOffersComponent } from './pages/help-center/offers/best-offers/best-offers.component';
import { MailPreferencesComponent } from './pages/help-center/offers/mail-preferences/mail-preferences.component';
import { OffersClickamComponent } from './pages/help-center/offers/offers-clickam/offers-clickam.component';
import { MarketplaceComponent } from './pages/help-center/questions/marketplace/marketplace.component';
import { PayMethodsComponent } from './pages/help-center/questions/pay-methods/pay-methods.component';
import { QuestionsClickamComponent } from './pages/help-center/questions/questions-clickam/questions-clickam.component';
import { TakeAssuredComponent } from './pages/help-center/questions/take-assured/take-assured.component';
import { ContactBussinessClickamComponent } from './pages/help-center/contact-bussiness/contact-bussiness-clickam/contact-bussiness-clickam.component';
import { BussinessContactsComponent } from './pages/help-center/contact-bussiness/bussiness-contacts/bussiness-contacts.component';
import { ContactUsClickamComponent } from './pages/help-center/contact-us/contact-us-clickam/contact-us-clickam.component';
import { ExtraQuestionsComponent } from './pages/help-center/contact-us/extra-questions/extra-questions.component';
import { HowWorksClickamComponent } from './components/how-works-clickam/how-works-clickam.component';
import { SliderWorksComponent } from './components/slider-works/slider-works.component';
import { HomeSlideVideoComponent } from './components/home-slide-video/home-slide-video.component';
import { ReportIconsClickamComponent } from './pages/help-center/report-files/report-icons/report-icons-clickam.component';
import { ReportNewsComponent } from './pages/help-center/report-news/report-news.component';
import { ReportStatusComponent } from './pages/help-center/report-files/report-status/report-status.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { BlogContentComponent } from './pages/blog-content/blog-content.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CardOrderNumberComponent } from './components/card-order-number/card-order-number.component';
import { DialogNoveltySatisfactionComponent } from './components/dialog-novelty-satisfaction/dialog-novelty-satisfaction.component';
import { ConsultComponent } from './pages/help-center/consult/consult.component';
import { TestimonyComponent } from './pages/testimony/testimony.component';
import { SlideTestimonyComponent } from './components/slide-testimony/slide-testimony.component';
import { RateTestimonyComponent } from './components/rate-testimony/rate-testimony.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BusinessAlliesComponent } from './pages/business-allies/business-allies.component';



const routes: Routes = [
  {
    path: 'recuperar-contrasena/:id',
    component: RecoverpasswordComponent,
  },
  {
    path: 'click-academy',
    component: ClickAcademyComponent,
  },
  {
    path: 'click-academy/:video',
    component: ClickAcademyComponent,
  },
  {
    path: 'blog',
    component: BlogsComponent,
  },
  {
    path: 'blog/:blog',
    component: BlogContentComponent,
  },
  {
    path: 'centro-de-ayuda',
    component: AboutClickamComponent,
  },
  {
    path: 'centro-de-ayuda/sobre-clickam',
    children: [
      {
        path: '',
        component: AboutClickamComponent,
      },
      {
        path: 'que-es-clickam',
        component: ClickamComponent,
      },
      {
        path: 'como-me-puedo-registrar',
        component: RegisterComponent,
      },
      {
        path: 'por-cuales-medios-puedo-descargar-la-app',
        component: DownloadComponent,
      },
      {
        path: 'como-funciona-clickam',
        component: HowWorksComponent,
      },
      {
        path: 'como-gano-comisiones',
        component: WinComissionComponent,
      },
      {
        path: 'cuales-son-los-beneficios-de-un-clicker',
        component: BenefitsComponent,
      },
      {
        path: 'cuales-son-los-negocios-asociados',
        component: PartnersComponent,
      },
    ],
  },
  {
    path: 'centro-de-ayuda/configuraciones-de-cuenta',
    children: [
      {
        path: '',
        component: ConfigurationAccountComponent,
      },
      {
        path: 'cambios-de-tus-datos-personales',
        component: ChangeDataProfileComponent,
      },
      {
        path: 'restablecer-contrasena',
        component: ResetPasswordComponent,
      },
    ],
  },
  {
    path: 'centro-de-ayuda/comisiones',
    children: [
      {
        path: '',
        component: CommissionClickamComponent,
      },
      {
        path: 'que-es-la-ruta-de-compra-clickam',
        component: RouteBuyComponent,
      },
      {
        path: 'como-cruzan-la-venta',
        component: CrossSellComponent,
      },
      {
        path: 'cuales-son-las-fechas-de-pago',
        component: PayDateComponent,
      },
      {
        path: 'porque-no-me-llego-la-comision',
        component: NotCommissionComponent,
      },
      {
        path: 'como-es-el-proceso-de-pago',
        component: PaymentProcessComponent,
      },
      {
        path: 'cuando-se-considera-una-compra-efectiva-por-el-negocio',
        component: EffectiveBuyComponent,
      },
    ],
  },
  {
    path: 'centro-de-ayuda/reportes',
    children: [
      {
        path: '',
        component: ReportClickamComponent,
      },
      {
        path: 'donde-puedo-encontrar-un-historial-de-mis-links',
        component: LinkHistoryComponent,
      },
      {
        path: 'como-veo-las-comisiones-que-he-ganado',
        component: WinCommissionComponent,
      },
      {
        path: 'como-puedo-saber-por-cuales-productos-me-pagaron-comision',
        component: ProductsCommissionComponent,
      },
    ],
  },
  {
    path: 'centro-de-ayuda/refiere-a-un-amigo',
    children: [
      {
        path: '',
        component: ReferFriendComponent,
      },
      {
        path: 'que-es-el-programa-refiere-a-tu-amigo',
        component: ProgramFriendComponent,
      },
      {
        path: 'como-funciona-el-programa',
        component: WorksReferComponent,
      },
      {
        path: 'cuantos-amigos-puedo-invitar',
        component: FriendInviteComponent,
      },
    ],
  },
  {
    path: 'centro-de-ayuda/ofertas',
    children: [
      {
        path: '',
        component: OffersClickamComponent,
      },
      {
        path: 'donde-puedo-encontrar-las-mejores-ofertas',
        component: BestOffersComponent,
      },
      {
        path: 'preferencias-de-correo',
        component: MailPreferencesComponent,
      },
    ],
  },
  {
    path: 'centro-de-ayuda/otras-preguntas-frecuentes',
    children: [
      {
        path: '',
        component: QuestionsClickamComponent,
      },
      {
        path: 'quien-es-el-tomador-de-un-seguro',
        component: TakeAssuredComponent,
      },
      {
        path: 'que-es-un-producto-marketplace',
        component: MarketplaceComponent,
      },
      {
        path: 'cuales-son-los-medios-de-pago-de-cada-negocio',
        component: PayMethodsComponent,
      },
    ],
  },
  {
    path: 'centro-de-ayuda/contacta-los-negocios',
    children: [
      {
        path: '',
        component: ContactBussinessClickamComponent,
      },
      {
        path: 'contactos-negocios',
        component: BussinessContactsComponent,
      },
    ],
  },
  {
    path: 'centro-de-ayuda/contactanos',
    children: [
      {
        path: '',
        component: ContactUsClickamComponent,
      },
      {
        path: 'donde-puedo-contactarme-si-tengo-preguntas-extras',
        component: ExtraQuestionsComponent,
      },
    ],
  },
  {
    path: 'centro-de-ayuda/reportar/novedad',
    children: [
      {
        path: '',
        component: ReportNewsComponent,
      },
    ],
  },
  {
    path: 'centro-de-ayuda/reportar/estado-novedades',
    children: [
      {
        path: '',
        component: ReportStatusComponent,
      },
    ],
  },
  {
    path: 'centro-de-ayuda/reportar',
    children: [
      {
        path: '',
        component: ReportIconsClickamComponent,
      },
    ],
  },
  {
    path: 'centro-de-ayuda/consultar',
    children: [
      {
        path: '',
        component: ConsultComponent,
      },
    ],
  },
  {
    path: 'terminos-y-condiciones',
    component: TermsAndConditionsComponent,
  },
  {
    path: 'tabla-recompensas',
    component: ComissionTableComponent,
  },
  {
    path: 'testimonios',
    component: TestimonyComponent,
  },
  {
    path: 'negocios-aliados',
    component: BusinessAlliesComponent,
  },
];

@NgModule({
  declarations: [
    RecoverpasswordComponent,
    RecoverpasswordformComponent,
    ClickAcademyComponent,
    TermsAndConditionsComponent,
    BlockCopyPasteDirective,
    KeySpaceDirective,
    CardOfferComponent,
    ComissionTableComponent,
    NewBusinessComponent,
    NewBusinessFormComponent,
    SlideVideoComponent,
    ClickamComponent,
    RegisterComponent,
    DownloadComponent,
    HowWorksComponent,
    WinComissionComponent,
    BenefitsComponent,
    PartnersComponent,
    MenuHelpCenterComponent,
    AboutClickamComponent,
    CardHelpCenterComponent,
    ChangeDataProfileComponent,
    ResetPasswordComponent,
    ConfigurationAccountComponent,
    RouteBuyComponent,
    CommissionClickamComponent,
    CrossSellComponent,
    EffectiveBuyComponent,
    NotCommissionComponent,
    PayDateComponent,
    PaymentProcessComponent,
    LinkHistoryComponent,
    ProductsCommissionComponent,
    ReportClickamComponent,
    WinCommissionComponent,
    FriendInviteComponent,
    ProgramFriendComponent,
    ReferFriendComponent,
    WorksReferComponent,
    BestOffersComponent,
    MailPreferencesComponent,
    OffersClickamComponent,
    MarketplaceComponent,
    PayMethodsComponent,
    QuestionsClickamComponent,
    TakeAssuredComponent,
    ContactBussinessClickamComponent,
    BussinessContactsComponent,
    ContactUsClickamComponent,
    ExtraQuestionsComponent,
    HowWorksClickamComponent,
    SliderWorksComponent,
    HomeSlideVideoComponent,
    ReportNewsComponent,
    ReportIconsClickamComponent,
    ReportStatusComponent,
    BlogsComponent,
    BlogContentComponent,
    CardOrderNumberComponent,
    DialogNoveltySatisfactionComponent,
    ConsultComponent,
    TestimonyComponent,
    SlideTestimonyComponent,
    RateTestimonyComponent,
    BusinessAlliesComponent,
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
    RecaptchaV3Module,
    AngularEditorModule,
    NgxPaginationModule
  ],
  exports: [
    RouterModule,
    RecoverpasswordformComponent,
    DialogNoveltySatisfactionComponent,
  ],
  entryComponents: [NewBusinessFormComponent, DialogNoveltySatisfactionComponent],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LfYROwUAAAAAGBQR5PgNXRgLOHvkv2DOSBHerjH',
      } as RecaptchaSettings,
    },
  ],
})
export class AnonymousModule { }