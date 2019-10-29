
import { NgModule } from '@angular/core';
import { MatInputModule, MatButtonModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatCardModule, MatCheckboxModule, MatIconModule, MatPaginatorModule, MatDialogModule, MatSnackBarModule, MatTabsModule, MatBottomSheetModule, MatTableModule, MatExpansionModule } from '@angular/material';
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
    MatExpansionModule
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
    MatExpansionModule
  ]
})
export class AppMaterialModule { }
