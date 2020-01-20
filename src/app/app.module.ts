import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// i18n
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

// modules
import { AnonymousModule } from './modules/anonymous/anonymous.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './modules/shared/app-material/app-material.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ClickerModule } from './modules/clicker/clicker.module';
import { AdminModule } from './modules/admin/admin.module';

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

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

export function jwtTokenGetter() {
  return localStorage.getItem('ACCESS_TOKEN');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AnonymousModule,
    ClickerModule,
    AdminModule,
    SharedModule,
    AppMaterialModule,
    FlexLayoutModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCo8Iq_u0Q1Znya-Qt5r9HWB-SLSeIf4uw",
      authDomain: "notifications-6665e.firebaseapp.com",
      databaseURL: "https://notifications-6665e.firebaseio.com",
      projectId: "notifications-6665e",
      storageBucket: "notifications-6665e.appspot.com",
      messagingSenderId: "471373902459",
      appId: "1:471373902459:web:84cbd92b19b458300528de",
      measurementId: "G-SVL6VCELL4"
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter,
        whitelistedDomains: [],
        blacklistedRoutes: []
      }
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
    }),
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    BnNgIdleService,
    MessagingService,
    AsyncPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
