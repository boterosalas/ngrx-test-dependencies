import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// i18n
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './modules/shared/app-material/app-material.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FlexLayoutModule } from '@angular/flex-layout';

// interceptors
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptorService } from './interceptors/loader-interceptor.service';
import { SharedModule } from './modules/shared/shared.module';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from './interceptors/auth-interceptor.service';

// sesion timeout
import { BnNgIdleService } from 'bn-ng-idle';

// angular fire notifications
import { MessagingService } from './shared/messaging.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AsyncPipe } from '../../node_modules/@angular/common';
import { SidenavService } from './services/sidenav.service';
import { CardComponent } from './modules/anonymous/components/card/card.component';
import { ActivateAccountFormComponent } from './modules/anonymous/components/activate-account-form/activate-account-form.component';
import { ForgotpasswordformComponent } from './modules/anonymous/components/forgotpasswordform/forgotpasswordform.component';
import { LoginformComponent } from './modules/anonymous/components/loginform/loginform.component';
import { MenuComponent } from './modules/anonymous/components/menu/menu.component';
import { RegisterformComponent } from './modules/anonymous/components/registerform/registerform.component';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function jwtTokenGetter() {
  return localStorage.getItem('ACCESS_TOKEN');
}

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CardComponent,
    LoginformComponent,
    RegisterformComponent,
    ForgotpasswordformComponent,
    ActivateAccountFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    AppMaterialModule,
    FlexLayoutModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    MatPasswordStrengthModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter,
        whitelistedDomains: [],
        blacklistedRoutes: [],
      },
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    BnNgIdleService,
    MessagingService,
    AsyncPipe,
    SidenavService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
