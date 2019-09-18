import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [SearchComponent]
})
export class SharedModule { }
