import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, HttpClientModule, MatDialogModule],
  exports: [CommonModule, RouterModule, MatDialogModule],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: true,
        panelClass: [
          '2xl:w-2/5',
          'xl:w-3/5',
          'md:w-4/5',
          'w-screen',
          'h-screen',
          'md:h-fit',
        ],
      },
    },
  ],
})
export class SharedModule {}
