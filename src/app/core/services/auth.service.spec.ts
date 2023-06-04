import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationResponse } from '@shared/models/authentication-response.model';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({ template: '' })
class MockComponent {}

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: MockComponent },
        ]),
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
});
