import { of } from 'rxjs';
import { Account } from './../../models/account';
import { AccountsApiService } from './../../services/accounts-api.service';
import { AddAccountService } from './../../services/add-account.service';
import { AccountsComponent } from './accounts.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

describe('AccountsComponent', () => {
  let spectator: Spectator<AccountsComponent>;

  const accounts: Account[] = [
    {
      name: 'Nubank',
      currency: 'BRL',
    },
    {
      name: 'Nubank',
      currency: 'BRL',
    },
  ];

  const accountsApiService = jasmine.createSpyObj<AccountsApiService>(
    'accountsApiService',
    ['getAccounts']
  );

  const addAccountService = jasmine.createSpyObj<AddAccountService>(
    'addAccountService',
    ['run']
  );

  const createComponent = createComponentFactory<AccountsComponent>({
    component: AccountsComponent,
    providers: [
      { provide: AccountsApiService, useValue: accountsApiService },
      { provide: AddAccountService, useValue: addAccountService },
    ],
    shallow: true,
  });

  accountsApiService.getAccounts.and.returnValue(of(accounts));

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should call add account service when click on add button', () => {
    addAccountService.run.and.returnValue(of(undefined));

    spectator.click('[ data-testid="add-button"]');

    expect(addAccountService.run).toHaveBeenCalled();
    expect(accountsApiService.getAccounts).toHaveBeenCalledTimes(2);
  });
});
