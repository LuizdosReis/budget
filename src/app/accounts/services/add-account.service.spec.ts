import { AccountsApiService } from '@app/accounts/services/accounts-api.service';
import {
  createServiceFactory,
  SpectatorService,
  SpyObject,
} from '@ngneat/spectator';
import { of } from 'rxjs';
import { AddAccountService } from './add-account.service';
import { MatDialog } from '@angular/material/dialog';

describe('AddAccountService', () => {
  let spectator: SpectatorService<AddAccountService>;
  let accountsApi: SpyObject<AccountsApiService>;

  const createService = createServiceFactory({
    service: AddAccountService,
    mocks: [AccountsApiService, MatDialog],
  });

  beforeEach(() => {
    spectator = createService();
    accountsApi = spectator.inject(AccountsApiService);
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should return when submmited', () => {
    const accountFormData = {};

    const dialogRef = {
      componentInstance: {
        submitAccountForm: of(accountFormData),
      },
      close: () => {},
    };

    spectator.inject(MatDialog).open.andReturn(dialogRef);

    accountsApi.post.and.returnValue(of({}));

    spectator.service.run();

    expect(accountsApi.post).toHaveBeenCalledWith(accountFormData);
  });
});
