import { EditAccountService } from './edit-account.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { AccountsApiService } from '@app/accounts/services/accounts-api.service';
import { MatDialog } from '@angular/material/dialog';
import { delay, of } from 'rxjs';
import { Account } from '@app/accounts/models/account';
import { AccountFormModalComponent } from '@app/accounts/components/account-form-modal/account-form-modal.component';

describe('EditAccountService', () => {
  let spectator: SpectatorService<EditAccountService>;

  const createService = createServiceFactory<EditAccountService>({
    service: EditAccountService,
    mocks: [AccountsApiService, MatDialog],
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should call api service with account when dialog is submitted', done => {
    const accountFormData = {};

    const dialogRef = {
      componentInstance: {
        submitAccountForm: of(accountFormData).pipe(delay(500)),
      },
      close: () => {},
    };

    const matDialog = spectator.inject(MatDialog);

    spectator.inject(MatDialog).open.andReturn(dialogRef);

    const accountsApiService = spectator.inject(AccountsApiService);

    accountsApiService.put.and.returnValue(of(undefined));

    const account: Account = {
      id: 'ecdfd059-c798-43f2-8daf-9e8692216632',
      name: 'Nubank',
      currency: 'BRL',
    };

    spectator.service.run(account).subscribe(() => {
      expect(accountsApiService.put).toHaveBeenCalledWith(
        account.id,
        accountFormData
      );
      done();
    });

    expect(matDialog.open).toHaveBeenCalledWith(AccountFormModalComponent, {
      data: { account },
    });
  });
});
