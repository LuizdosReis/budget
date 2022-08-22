import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Account from '../../models/accounts';
import { AccountModalComponent } from '../account-modal/account-modal.component';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss'],
})
export class AccountCardComponent {
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
