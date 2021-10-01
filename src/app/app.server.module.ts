import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { readFileSync } from 'fs';
import { Observable } from 'rxjs';

export function universalLoader(): TranslateLoader {
  return {
    getTranslation: (lang: string) => {
      return new Observable((observer: any) => {
        observer.next(JSON.parse(readFileSync(`./dist/browser/assets/i18n/${lang}.json`, 'utf8')));
        observer.complete();
      });
    },
  } as TranslateLoader;
}

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    FlexLayoutServerModule,
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useFactory: universalLoader },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule { }
