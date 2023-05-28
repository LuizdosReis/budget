import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { Account } from './../../models/account';
import { AccountsApiService } from './../../services/accounts-api.service';
import { AddAccountService } from './../../services/add-account.service';
import { AccountsComponent } from './accounts.component';

describe('AccountsComponent', () => {
  let component: AccountsComponent;
  let fixture: ComponentFixture<AccountsComponent>;

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

  accountsApiService.getAccounts.and.returnValue(of(accounts));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountsComponent],
      providers: [
        { provide: AccountsApiService, useValue: accountsApiService },
        { provide: AddAccountService, useValue: addAccountService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
