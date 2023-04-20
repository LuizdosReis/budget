import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsComponent } from './accounts.component';
import { AccountsApiService } from './../../services/accounts-api.service';
import { Account } from './../../models/account';
import { of } from 'rxjs';

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

  accountsApiService.getAccounts.and.returnValue(of(accounts));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountsComponent],
      providers: [
        { provide: AccountsApiService, useValue: accountsApiService },
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
