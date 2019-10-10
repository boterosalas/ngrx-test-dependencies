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
import { WhatsappComponent } from "./components/whatsapp/whatsapp.component";
import { HeaderComponent } from './components/header/header.component';
import { MatListModule, MatRippleModule, MatMenuModule } from '@angular/material';
import { SociallinksComponent } from './components/sociallinks/sociallinks.component';
import { TopComponent } from './components/top/top.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SearchComponent,
    NotFoundComponent,
    LoaderComponent,
    DialogComponent,
    FooterComponent,
    WhatsappComponent,
    HeaderComponent,
    SociallinksComponent,
    TopComponent
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
    RouterModule
  ],
  exports: [
    SearchComponent,
    NotFoundComponent,
    LoaderComponent,
    FooterComponent,
    WhatsappComponent,
    HeaderComponent,
    MatListModule,
    MatRippleModule,
    SociallinksComponent,
    MatMenuModule,
    TopComponent,
    GoogleChartsModule,
    RouterModule
  ]
})
export class SharedModule {}
