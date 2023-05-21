import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/shared/guards/auth.guard';
import { PageComponent } from './page/page/page.component';

const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'accounts',
        loadChildren: () =>
          import('../accounts/accounts.module').then(m => m.AccountsModule),
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
