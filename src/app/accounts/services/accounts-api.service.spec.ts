import { TestBed } from '@angular/core/testing';

import { AccountsApiService } from './accounts-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AccountsApiService', () => {
  let service: AccountsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(AccountsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
