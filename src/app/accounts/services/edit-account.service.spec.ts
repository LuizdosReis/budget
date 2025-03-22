import { MatDialog } from '@angular/material/dialog';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { delay, Observable, of } from 'rxjs';
import { AccountFormModalComponent } from '../components/account-form-modal/account-form-modal.component';
import { Account } from '../models/account';
import { AccountData } from '../models/account-data';
import { AccountsApiService } from './accounts-api.service';
import { DeleteAccountService } from './delete-account.service';
import { EditAccountService } from './edit-account.service';

describe('EditAccountService', () => {
  let spectator: SpectatorService<EditAccountService>;
  const account: Account = {
    id: 'ecdfd059-c798-43f2-8daf-9e8692216632',
    name: 'Nubank',
    currency: 'BRL',
  };
  const createService = createServiceFactory<EditAccountService>({
    service: EditAccountService,
    mocks: [AccountsApiService, MatDialog, DeleteAccountService],
  });
  const createDialogRef = (overrides?: {
    submitAccountForm?: Observable<AccountData>;
    deleteClicked?: Observable<void>;
  }) => ({
    componentInstance: {
      submitAccountForm: of(),
      deleteClicked: of(),
      ...overrides,
    },
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should open dialog with account data', () => {
    spectator.inject(MatDialog).open.andReturn(createDialogRef());

    spectator.service.run(account);

    expect(spectator.inject(MatDialog).open).toHaveBeenCalledWith(
      AccountFormModalComponent,
      {
        data: { account },
      }
    );
  });

  it('should call api service with account when dialog is submitted', done => {
    const accountFormData = { name: account.name, currency: account.currency };
    const dialogRef = createDialogRef({
      submitAccountForm: of(accountFormData).pipe(delay(500)),
    });
    spectator.inject(MatDialog).open.andReturn(dialogRef);
    const accountsApiService = spectator.inject(AccountsApiService);
    accountsApiService.put.and.returnValue(of(undefined));

    spectator.service.run(account).subscribe(() => {
      expect(accountsApiService.put).toHaveBeenCalledWith(
        account.id,
        accountFormData
      );
      done();
    });
  });

  it('should call delete account service with account when dialog output deleteClicked event', done => {
    const dialogRef = createDialogRef({
      deleteClicked: of(undefined).pipe(delay(500)),
    });
    spectator.inject(MatDialog).open.andReturn(dialogRef);

    const deleteAccountService = spectator.inject(DeleteAccountService);
    deleteAccountService.delete.and.returnValue(of(undefined));

    spectator.service.run(account).subscribe(() => {
      expect(deleteAccountService.delete).toHaveBeenCalledWith(account);
      done();
    });
  });
});
