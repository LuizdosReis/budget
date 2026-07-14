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

  getTransactions({
    searchTerm,
    page,
  }: {
    searchTerm?: string;
    page: number;
  }): Observable<Page<Transaction>> {
    let params = new HttpParams()
      .append('nonDeleted', true)
      .append('page', page);

    params = searchTerm ? params.append('searchTerm', searchTerm) : params;

    return this.http.get<Page<Transaction>>(this.URL, { params });
  }
}
