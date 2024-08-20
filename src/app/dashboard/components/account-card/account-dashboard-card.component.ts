import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Account } from '../../models/accounts';
import { AccountModalComponent } from '../account-modal/account-modal.component';

@Component({
  selector: 'app-account-dashboard-card',
  templateUrl: './account-dashboard-card.component.html',
})
export class AccountDashboardCardComponent {
  @Input() account!: Account;

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(AccountModalComponent, {
      data: {
        account: this.account,
      },
    });
  }
}
