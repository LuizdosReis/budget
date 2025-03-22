import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthInterceptorInterceptor } from '@core/interceptors/auth-interceptor.interceptor';
import { AuthService } from '@core/services/auth.service';
import { AuthGuard } from './auth.guard';

@Component({ template: '' })
class MockComponent {}

describe('AuthGuard', () => {
  const authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', [
    'isAccessTokenValid',
  ]);

  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: MockComponent },
        ]),
      ],
      providers: [
        AuthInterceptorInterceptor,
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow to continue', () => {
    authServiceSpy.isAccessTokenValid.and.returnValue(true);
    expect(guard.canActivate()).toBeTruthy();
  });

  it('should not allow to continue', fakeAsync(() => {
    authServiceSpy.isAccessTokenValid.and.returnValue(false);

    expect(guard.canActivate()).toBeFalsy();
    tick();
    expect(TestBed.inject(Location).path()).toBe('/login');
  }));
});
