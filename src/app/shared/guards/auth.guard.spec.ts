import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthInterceptorInterceptor } from '@shared/interceptors/auth-interceptor.interceptor';
import { AuthService } from '@shared/services/auth.service';
import { AuthGuard } from './auth.guard';

@Component({ template: '' })
class MockComponent {}

describe('AuthGuard', () => {
  const authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', [
    'getAccessToken',
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
    authServiceSpy.getAccessToken.and.returnValue('token');
    expect(guard.canActivate()).toBeTruthy();
  });

  it('should not allow to continue', fakeAsync(() => {
    authServiceSpy.getAccessToken.and.returnValue('');

    expect(guard.canActivate()).toBeFalsy();
    tick();
    expect(TestBed.inject(Location).path()).toBe('/login');
  }));
});
