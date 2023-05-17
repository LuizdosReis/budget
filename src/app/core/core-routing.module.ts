import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
      },
      {
        path: 'accounts',
        loadChildren: () =>
          import('../accounts/accounts.module').then(m => m.AccountsModule),
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
