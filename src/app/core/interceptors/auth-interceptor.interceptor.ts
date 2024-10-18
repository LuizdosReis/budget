import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { Observable } from 'rxjs';

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
