import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { LoginformComponent } from "./components/loginform/loginform.component";
import { AppMaterialModule } from "../shared/app-material/app-material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { SectionComponent } from "./components/section/section.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { WorksComponent } from "./components/works/works.component";
import { SectionbgComponent } from "./components/sectionbg/sectionbg.component";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { RegisterformComponent } from "./components/registerform/registerform.component";
import { ForgotpasswordformComponent } from "./components/forgotpasswordform/forgotpasswordform.component";
import { RecoverpasswordformComponent } from "./components/recoverpasswordform/recoverpasswordform.component";
import { RecoverpasswordComponent } from "./pages/recoverpassword/recoverpassword.component";
import { MenuComponent } from "./components/menu/menu.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "?",
    component: HomeComponent
  },
  {
    path: "recuperar-contrasena/:id",
    component: RecoverpasswordComponent
  }
];

@NgModule({
  declarations: [
    HomeComponent,
    LoginformComponent,
    SectionComponent,
    WorksComponent,
    SectionbgComponent,
    RegisterformComponent,
    ForgotpasswordformComponent,
    RecoverpasswordComponent,
    RecoverpasswordformComponent,
    MenuComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    TranslateModule,
    SharedModule,
    CommonModule,
    FlexLayoutModule,
    SlickCarouselModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    LoginformComponent,
    RegisterformComponent,
    RecoverpasswordformComponent,
    ForgotpasswordformComponent,
    MenuComponent
  ]
})
export class AnonymousModule {}
