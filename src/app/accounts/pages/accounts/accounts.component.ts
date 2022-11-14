import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { UnsubComponent } from '@shared/components/unsub.component';
import { Account } from '../../models/account';
import { AccountsApiService } from '../../services/accounts-api.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent extends UnsubComponent implements OnInit {
  accounts: Account[] = [];
  accountsLoaded = false;

  constructor(private accountApiService: AccountsApiService) {
    super();
  }

  ngOnInit(): void {
    this.accountApiService
      .getAccounts()
      .pipe(takeUntil(this.notifier))
      .subscribe((accounts: Account[]) => {
        this.accounts = accounts;
        this.accountsLoaded = true;
      });
  }
}
