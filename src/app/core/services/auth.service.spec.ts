import { Location } from '@angular/common';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationResponse } from '@shared/models/authentication-response.model';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-mock',
  template: '',
})
class MockComponent {}

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  const EXPY_JWT =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  const VALID_JWT =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjMzMjYwOTc2MDAwfQ.Ok2GSD6gZhjkEoa2cdCUN9En_yUUIYh3Cg2p2s9P5vY';
  const INVALID_JWT =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjMzMjYwOTc2MDAQfQ.Ok2GSD6gZhjkEoa2cdCUN9En_yUUIYh3Cg2p2s9P5vZ';

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: MockComponent },
        ]),
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login and set access Token', done => {
    const response: AuthenticationResponse = {
      accessToken: 'accessToken',
    };

    const username = 'usernanme';
    const password = 'password';

    service.login(username, password).subscribe(() => {
      expect(service.getAccessToken()).toBe(response.accessToken);
      done();
    });

    const expectedUrl = `${service.URL}?username=${username}&password=${password}`;

    const req = httpController.expectOne({
      method: 'POST',
      url: expectedUrl,
    });

    req.flush(response);
  });

  it('should call logout and remove access Token', fakeAsync(() => {
    service.logout();
    expect(service.getAccessToken()).toBeNull();
    tick();
    expect(TestBed.inject(Location).path()).toBe('/login');
  }));

  it('should return false when there is no accessToken set', () => {
    expect(service.isAccessTokenValid()).toBeFalsy();
  });

  it('should return false when accessToken expired', () => {
    spyOn(localStorage, 'getItem').and.returnValue(EXPY_JWT);

    expect(service.isAccessTokenValid()).toBeFalsy();
  });

  it('should return true when accessToken is valid', () => {
    spyOn(localStorage, 'getItem').and.returnValue(VALID_JWT);

    expect(service.isAccessTokenValid()).toBeTrue();
  });

  it('should return false when accessToken is not valid', () => {
    spyOn(localStorage, 'getItem').and.returnValue(INVALID_JWT);

    expect(service.isAccessTokenValid()).toBeFalsy();
  });

  it('should return false when accessToken is null', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    expect(service.isAccessTokenValid()).toBeFalsy();
  });
});
