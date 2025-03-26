import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { CategoryRequest } from '../models/category-request';

@Injectable({
  providedIn: 'root',
})
export class CategoriesApiService {
  readonly URL = '/api/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.URL);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }

  post(category: CategoryRequest): Observable<void> {
    return this.http.post<void>(this.URL, category);
  }
}
