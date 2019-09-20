import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
  declarations: [
    SearchComponent,
    NotFoundComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [SearchComponent, NotFoundComponent, LoaderComponent]
})
export class SharedModule { }
