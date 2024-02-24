import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountCardSkeletonComponent } from './components/account-card-skeleton/account-card-skeleton.component';
import { AccountCardComponent } from './components/account-card/account-card.component';
import { AccountFormModalComponent } from './components/account-form-modal/account-form-modal.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { ButtonDirective } from '@shared/directives/button.directive';

@NgModule({
  declarations: [
    AccountsComponent,
    AccountCardComponent,
    AccountCardSkeletonComponent,
    AccountFormModalComponent,
  ],
  imports: [CommonModule, AccountsRoutingModule, SharedModule, ButtonDirective],
})
export class AccountsModule {}
