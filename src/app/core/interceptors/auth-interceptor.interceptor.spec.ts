import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpRequest,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '@app/core/services/auth.service';
import { AuthInterceptorInterceptor } from './auth-interceptor.interceptor';

describe('AuthInterceptorInterceptor', () => {
  let httpController: HttpTestingController;
  let http: HttpClient;
  const accessToken = 'accessToken';
  const authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', [
    'getAccessToken',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthInterceptorInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorInterceptor,
          multi: true,
        },
        { provide: AuthService, useValue: authServiceSpy },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    httpController = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    const interceptor: AuthInterceptorInterceptor = TestBed.inject(
      AuthInterceptorInterceptor
    );
    expect(interceptor).toBeTruthy();
  });

  it('should add bearer token in the header when auth service returns token', done => {
    authServiceSpy.getAccessToken.and.returnValue(accessToken);
    http.get('/').subscribe(data => {
      expect(data).toEqual({ data: 'sample' });
      done();
    });
    const req = httpController.expectOne((request: HttpRequest<unknown>) => {
      return (
        request.headers.get(AuthInterceptorInterceptor.AUTHORIZATION_HEADER) ===
        `Bearer ${accessToken}`
      );
    }, 'authorization header must match');
    req.flush({ data: 'sample' });
  });

  it('should not add bearer token in the header when auth service returns null', done => {
    authServiceSpy.getAccessToken.and.returnValue(null);
    http.get('/').subscribe(data => {
      expect(data).toEqual({ data: 'sample' });
      done();
    });
    const req = httpController.expectOne((request: HttpRequest<unknown>) => {
      return (
        request.headers.get(AuthInterceptorInterceptor.AUTHORIZATION_HEADER) ===
        null
      );
    }, 'authorization header must be null');
    req.flush({ data: 'sample' });
  });
});
