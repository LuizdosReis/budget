import { CommonModule } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogModule,
} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { AuthInterceptorInterceptor } from '@app/core/interceptors/auth-interceptor.interceptor';
import { ButtonDirective } from './directives/button.directive';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    ReactiveFormsModule,
    ButtonDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    ReactiveFormsModule,
    ButtonDirective,
  ],
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
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class SharedModule {}
