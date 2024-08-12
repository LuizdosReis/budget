import { DeleteAccountService } from './delete-account.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MatDialog } from '@angular/material/dialog';
import { delay, Observable, of } from 'rxjs';
import { Account } from '@app/accounts/models/account';
import { AccountsApiService } from '@app/accounts/services/accounts-api.service';

describe('DeleteAccountService', () => {
  let spectator: SpectatorService<DeleteAccountService>;

  const createService = createServiceFactory<DeleteAccountService>({
    service: DeleteAccountService,
    mocks: [MatDialog, AccountsApiService],
  });
  const createDialogRef = (overrides?: { confirmed?: Observable<void> }) => ({
    componentInstance: {
      confirmed: of(),
      ...overrides,
    },
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should call api service with account when dialog is confirmed', done => {
    const account: Account = {
      id: 'ecdfd059-c798-43f2-8daf-9e8692216632',
      name: 'Nubank',
      currency: 'BRL',
    };
    const dialogRef = createDialogRef({
      confirmed: of(undefined).pipe(delay(500)),
    });
    spectator.inject(MatDialog).open.andReturn(dialogRef);
    const accountsApiService = spectator.inject(AccountsApiService);
    accountsApiService.delete.and.returnValue(of(undefined));

    spectator.service.delete(account).subscribe(() => {
      expect(accountsApiService.delete).toHaveBeenCalledWith(account.id);
      done();
    });
  });
});
