import { TestBed } from '@angular/core/testing';

import { AddAccountService } from './add-account.service';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { AccountsApiService } from '@app/accounts/services/accounts-api.service';

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
