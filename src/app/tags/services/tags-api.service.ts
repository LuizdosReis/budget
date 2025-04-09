import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag';
import { TagRequest } from '../models/tag-request';

@Injectable({
  providedIn: 'root',
})
export class TagsApiService {
  private readonly http = inject(HttpClient);
  readonly URL = '/api/tags';

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.URL);
  }

  post(tag: TagRequest): Observable<void> {
    return this.http.post<void>(this.URL, tag);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }

  put(id: string, tag: TagRequest): Observable<void> {
    return this.http.put<void>(`${this.URL}/${id}`, tag);
  }
}
