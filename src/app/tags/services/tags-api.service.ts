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

  post(category: TagRequest): Observable<void> {
    return this.http.post<void>(this.URL, category);
  }
}
