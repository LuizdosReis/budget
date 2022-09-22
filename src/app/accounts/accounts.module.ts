import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { AccountsRoutingModule } from './accounts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AccountCardComponent } from './components/account-card/account-card.component';
import { AccountCardSkeletonComponent } from './components/account-card-skeleton/account-card-skeleton.component';

@NgModule({
  declarations: [
    AccountsComponent,
    AccountCardComponent,
    AccountCardSkeletonComponent,
  ],
  imports: [CommonModule, AccountsRoutingModule, SharedModule],
})
export class AccountsModule {}
