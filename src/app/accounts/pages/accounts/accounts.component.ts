import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { UnsubComponent } from '@shared/components/unsub.component';
import { Account } from '../../models/account';
import { AccountsApiService } from '../../services/accounts-api.service';
import { AddAccountService } from '../../services/add-account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent extends UnsubComponent implements OnInit {
  accounts: Account[] = [];
  accountsLoaded = false;

  constructor(
    private accountApiService: AccountsApiService,
    private addAccountService: AddAccountService
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.accountsLoaded = false;
    this.accountApiService
      .getAccounts()
      .pipe(takeUntil(this.notifier))
      .subscribe((accounts: Account[]) => {
        this.accounts = accounts;
        this.accountsLoaded = true;
      });
  }

  addAccount(): void {
    this.addAccountService
      .run()
      .pipe(takeUntil(this.notifier))
      .subscribe(() => this.loadAccounts());
  }
}
