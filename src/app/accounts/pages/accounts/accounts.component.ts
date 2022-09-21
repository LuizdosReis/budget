import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/account';
import { AccountsApiService } from '../../services/accounts-api.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {
  accounts: Account[] = [];
  accountsLoaded = false;

  constructor(private accountApiService: AccountsApiService) {}

  ngOnInit(): void {
    this.accountApiService.getAccounts().subscribe((accounts: Account[]) => {
      this.accounts = accounts;
      this.accountsLoaded = true;
    });
  }
}
