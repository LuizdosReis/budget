import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthenticationResponse } from '../models/authentication-response.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
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
});
