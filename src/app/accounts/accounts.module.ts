import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { AccountsRoutingModule } from './accounts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AccountCardComponent } from './components/account-card/account-card.component';

@NgModule({
  declarations: [AccountsComponent, AccountCardComponent],
  imports: [CommonModule, AccountsRoutingModule, SharedModule],
})
export class AccountsModule {}
