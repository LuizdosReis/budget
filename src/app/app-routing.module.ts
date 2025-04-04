import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { PageComponent } from '@core/page/page/page.component';

const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'accounts',
        loadChildren: () =>
          import('./accounts/accounts.module').then(m => m.AccountsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./categories/categories.module').then(
            m => m.CategoriesModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'tags',
        loadChildren: () =>
          import('./tags/tags.module').then(m => m.TagsModule),
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
