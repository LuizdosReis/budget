import { TestBed } from '@angular/core/testing';

import { MatDialogModule } from '@angular/material/dialog';
import { AccountsApiService } from '@app/accounts/services/accounts-api.service';
import { AddAccountService } from './add-account.service';

describe('AddAccountService', () => {
  let service: AddAccountService;

  const accountsApiService = jasmine.createSpyObj<AccountsApiService>(
    'accountsApiService',
    ['getAccounts']
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [
        { provide: AccountsApiService, useValue: accountsApiService },
      ],
    });
    service = TestBed.inject(AddAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
