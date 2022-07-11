import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import Account from '../models/accounts';

@Injectable({
  providedIn: 'root',
})
export class DashboardApiService {
  constructor(private http: HttpClient) {}

  getAccounts(): Observable<Account[]> {
    return this.http
      .get<Account[]>('/mock/accounts')
      .pipe(
        map((accounts: Account[]) =>
          accounts.map(account => new Account(account))
        )
      );
  }
}
