import { Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Account, Category } from '../../models/accounts';

interface BankingEntries {
  name: string;
  total: number;
  categories: Category[];
}

@Component({
  selector: 'app-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.scss'],
})
export class AccountModalComponent implements OnInit {
  account?: Account;
  bankingEntries?: BankingEntries[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { account: Account }) {}

  ngOnInit(): void {
    this.account = this.data.account;
    this.bankingEntries = [
      {
        name: 'Entradas',
        total: this.account.totalDeposits,
        categories: this.account.deposits,
      },
      {
        name: 'Saidas',
        total: this.account.totalWithdrawals,
        categories: this.account.withdrawals,
      },
    ];
  }
}
