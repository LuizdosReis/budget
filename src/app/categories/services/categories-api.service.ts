import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesApiService {
  readonly URL = '/api/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.URL);
  }
}
