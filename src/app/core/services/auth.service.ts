import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthenticationResponse } from '@shared/models/authentication-response.model';
import * as jose from 'jose';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly URL = '/api/login';
  readonly ACCESS_TOKEN = 'accessToken';

  constructor(private httpClient: HttpClient, private router: Router) {}

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

  logout(): void {
    localStorage.removeItem(this.ACCESS_TOKEN);
    this.router.navigateByUrl('/login').catch(error => {
      console.error('Navigation failed:', error);
    });
  }

  private storeAuthentication(
    authenticationResponse: AuthenticationResponse
  ): void {
    localStorage.setItem(this.ACCESS_TOKEN, authenticationResponse.accessToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  isAccessTokenValid(): boolean {
    const accessToken = this.getAccessToken();
    if (!accessToken) return false;
    const { exp } = jose.decodeJwt(accessToken);
    return exp ? exp > this.currentTimestampInSeconds() : false;
  }

  private currentTimestampInSeconds(): number {
    return Date.now() / 1000;
  }
}
