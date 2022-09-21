import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Account } from '../models/accounts';
import { MonthYear } from '../models/monthYear';

@Injectable({
  providedIn: 'root',
})
export class DashboardApiService {
  readonly URL = '/mock/dashboard';

  constructor(private http: HttpClient) {}

  getAccounts(monthYear: MonthYear): Observable<Account[]> {
    const params = new HttpParams()
      .set('year', monthYear.year)
      .set('month', monthYear.month);

    return this.http
      .get<Account[]>(`${this.URL}/accounts`, { params })
      .pipe(
        map((accounts: Account[]) =>
          accounts.map(account => new Account(account))
        )
      );
  }

  getMonthsYears(): Observable<MonthYear[]> {
    return this.http.get<MonthYear[]>(`${this.URL}/months-years`);
  }
}
