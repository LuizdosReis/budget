import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@shared/services/auth.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  static readonly AUTHORIZATION_HEADER = 'Authorization';

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token: string | null = this.authService.getAccessToken();

    if (!token) {
      return next.handle(request);
    }

    return next.handle(this.addToken(request, token));
  }

  private addToken(
    req: HttpRequest<unknown>,
    token: string
  ): HttpRequest<unknown> {
    return req.clone({
      headers: req.headers.set(
        AuthInterceptorInterceptor.AUTHORIZATION_HEADER,
        `Bearer ${token}`
      ),
    });
  }
}
