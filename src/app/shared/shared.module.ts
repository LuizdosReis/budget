import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptorInterceptor } from './interceptors/auth-interceptor.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, HttpClientModule, MatDialogModule],
  exports: [CommonModule, RouterModule, MatDialogModule, ReactiveFormsModule],
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {}
