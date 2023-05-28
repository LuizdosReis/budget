import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root',
})
export class AccountsApiService {
  readonly URL = '/api/accounts';

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.URL).pipe(first());
  }

  post(account: any): Observable<any> {
    return this.http.post<any>(this.URL, account);
  }
}
