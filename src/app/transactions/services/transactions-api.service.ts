import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '@shared/models/page';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionsApiService {
  private readonly http = inject(HttpClient);
  readonly URL = '/api/transactions';

  getTransactions(): Observable<Page<Transaction>> {
    const params = new HttpParams().append('nonDeleted', true);
    return this.http.get<Page<Transaction>>(this.URL, { params });
  }
}
