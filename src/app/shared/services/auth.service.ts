import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthenticationResponse } from '../models/authentication-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly URL = '/api/login';
  readonly ACCESS_TOKEN = 'accessToken';

  constructor(private httpClient: HttpClient) {}

  login(
    username: string,
    password: string
  ): Observable<AuthenticationResponse> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.httpClient
      .post<AuthenticationResponse>(this.URL, {}, { params })
      .pipe(
        tap((authenticationResponse: AuthenticationResponse) =>
          this.storeAuthentication(authenticationResponse)
        )
      );
  }

  private storeAuthentication(
    authenticationResponse: AuthenticationResponse
  ): void {
    localStorage.setItem(this.ACCESS_TOKEN, authenticationResponse.accessToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }
}
