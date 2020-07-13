
import { NgModule } from '@angular/core';
import { MatInputModule, MatButtonModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatCardModule, MatCheckboxModule, MatIconModule, MatPaginatorModule, MatDialogModule, MatSnackBarModule, MatTabsModule, MatBottomSheetModule, MatTableModule, MatExpansionModule, MatSlideToggleModule, MatTooltipModule, MatSortModule, MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE, MatToolbarModule, MatSidenavModule, MatProgressSpinnerModule, MatProgressBarModule } from '@angular/material';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTableModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatSortModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTableModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatSortModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }]
})
export class AppMaterialModule { }
