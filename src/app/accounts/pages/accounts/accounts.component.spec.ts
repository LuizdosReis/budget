import {
  createComponentFactory,
  Spectator,
  SpyObject,
} from '@ngneat/spectator';
import { of } from 'rxjs';
import { Account } from './../../models/account';
import { AccountsApiService } from './../../services/accounts-api.service';
import { AddAccountService } from './../../services/add-account.service';
import { AccountsComponent } from './accounts.component';

describe('AccountsComponent', () => {
  let spectator: Spectator<AccountsComponent>;
  let accountsApiService: SpyObject<AccountsApiService>;

  const accounts: Account[] = [
    {
      id: 'ecdfd059-c798-43f2-8daf-9e8692216632',
      name: 'Nubank',
      currency: 'BRL',
    },
    {
      id: 'ecdfd059-c798-43f2-8daf-9e8692216633',
      name: 'Nubank',
      currency: 'BRL',
    },
  ];

  const addAccountService = jasmine.createSpyObj<AddAccountService>(
    'addAccountService',
    ['run']
  );

  const createComponent = createComponentFactory<AccountsComponent>({
    component: AccountsComponent,
    providers: [{ provide: AddAccountService, useValue: addAccountService }],
    mocks: [AccountsApiService],
    shallow: true,
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
    accountsApiService = spectator.inject(AccountsApiService);
    accountsApiService.getAccounts.and.returnValue(of(accounts));
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should call add account service when click on add button', () => {
    addAccountService.run.and.returnValue(of(undefined));

    spectator.click('[ data-testid="add-button"]');

    expect(addAccountService.run).toHaveBeenCalled();
    expect(
      spectator.inject(AccountsApiService).getAccounts
    ).toHaveBeenCalledTimes(2);
  });

  it('should load accounts when account triggers edited event', () => {
    spectator.triggerEventHandler(
      '[ data-testid="account-card"]',
      'edited',
      null
    );

    expect(
      spectator.inject(AccountsApiService).getAccounts
    ).toHaveBeenCalledTimes(2);
  });
});
