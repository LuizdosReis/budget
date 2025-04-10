import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/account';
import { AccountData } from '../models/account-data';

@Injectable({
  providedIn: 'root',
})
export class AccountsApiService {
  readonly URL = '/api/accounts';

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.URL);
  }

  post(account: AccountData): Observable<Account> {
    return this.http.post<Account>(this.URL, account);
  }

  put(id: string, account: AccountData): Observable<Account> {
    return this.http.put<Account>(`${this.URL}/${id}`, account);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
}
