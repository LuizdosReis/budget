import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { AccountsRoutingModule } from './accounts-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AccountsComponent],
  imports: [CommonModule, AccountsRoutingModule, SharedModule],
})
export class AccountsModule {}
